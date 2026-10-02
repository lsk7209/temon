#!/usr/bin/env python3
"""Validate this handoff bundle, not the temon application.

Python 3.10+, standard library only. Does not perform network requests, run
application commands, edit project files, or touch any production resource.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
import sys
from typing import Any

REQUIRED = [
    '00_README.md', '01_START_PROMPT.md', '02_MASTER_SPEC.md',
    'docs/03_EVIDENCE_AND_CORRECTIONS.md', 'docs/04_IMPLEMENTATION_PLAN.md',
    'docs/05_SEO_CONTENT_SPEC.md', 'docs/06_TEST_ENGINE_UX_SPEC.md',
    'docs/07_ANALYTICS_PRIVACY_ADS_SPEC.md', 'docs/08_QA_RELEASE_ACCEPTANCE.md',
    'docs/09_SOURCES.md', 'docs/10_OPTIONAL_GROWTH_SPEC.md',
    'specs/backlog.json', 'specs/acceptance-cases.json',
    'specs/analytics-contract.json', 'specs/approval-policy.json',
    'specs/route-matrix.example.json', 'evidence/observations.json',
    'evidence/sources.json', 'templates/CHANGE_PLAN.md',
    'templates/PROGRESS.md', 'templates/FINAL_REPORT.md',
]
PROHIBITED_EXTERNAL = {
    'answer_text', 'selected_answer', 'answers', 'raw_question',
    'raw_search_term', 'email', 'phone', 'real_name', 'share_token',
    'personal_result', 'result_probability', 'ip_address', 'auth_token',
}


def load_json(path: Path) -> Any:
    """Read UTF-8 JSON. Parsing and IO errors are reported by the caller."""
    return json.loads(path.read_text(encoding='utf-8'))


def local_path(root: Path, relative: str) -> Path:
    """Reject absolute paths, traversal, and symbolic links in bundle entries."""
    p = Path(relative)
    if p.is_absolute() or '..' in p.parts or '\\' in relative:
        raise ValueError(f'unsafe bundle path: {relative}')
    result = root / p
    if result.is_symlink() or not result.resolve().is_relative_to(root.resolve()):
        raise ValueError(f'unsafe bundle path: {relative}')
    return result


def validate(root: Path, verify_hashes: bool = True) -> list[str]:
    """Return an empty list for a valid package, otherwise human-readable errors."""
    root = root.resolve()
    errors: list[str] = []
    for name in REQUIRED:
        p = root / name
        if not p.is_file():
            errors.append(f'missing required file: {name}')
    if errors:
        return errors
    try:
        tasks = load_json(root / 'specs/backlog.json')['tasks']
        cases = load_json(root / 'specs/acceptance-cases.json')['cases']
        analytics = load_json(root / 'specs/analytics-contract.json')
        approval = load_json(root / 'specs/approval-policy.json')
        routes = load_json(root / 'specs/route-matrix.example.json')['routes']
        sources = load_json(root / 'evidence/sources.json')
        observations = load_json(root / 'evidence/observations.json')['observations']
        if not all(isinstance(x, list) for x in [tasks, cases, routes, sources, observations]):
            return ['invalid schema: required collections must be lists']
        if not all(isinstance(x, dict) for x in [analytics, approval]):
            return ['invalid schema: contracts must be objects']

        def indexed(rows: list[dict], label: str) -> dict[str, dict]:
            index: dict[str, dict] = {}
            for row in rows:
                if not isinstance(row, dict) or not isinstance(row.get('id'), str):
                    errors.append(f'invalid {label} record')
                    continue
                key = row['id']
                if key in index:
                    errors.append(f'duplicate {label} id: {key}')
                index[key] = row
            return index

        ti = indexed(tasks, 'task')
        ci = indexed(cases, 'acceptance')
        si = indexed(sources, 'source')
        indexed(observations, 'observation')
        milestone_order = {f'M{i}': i for i in range(5)}
        valid_statuses = {
            'pending', 'verified', 'in_progress', 'implemented', 'validated',
            'approval_required', 'blocked_external', 'not_applicable',
        }
        for tid, task in ti.items():
            if task.get('milestone') not in milestone_order:
                errors.append(f'{tid}: invalid milestone')
            if task.get('risk') not in {'R0', 'R1', 'R2', 'R3'}:
                errors.append(f'{tid}: invalid risk')
            if task.get('status') not in valid_statuses:
                errors.append(f'{tid}: invalid status')
            if task.get('deployment_status') not in {'not_deployed','approval_required','deployed','verified_production'}:
                errors.append(f'{tid}: invalid deployment status')
            if task.get('production_effects_require_approval') is not True:
                errors.append(f'{tid}: production approval guard missing')
            if not local_path(root, task['spec']).is_file():
                errors.append(f'{tid}: missing specification {task["spec"]}')
            for dep in task['depends_on']:
                if dep not in ti:
                    errors.append(f'{tid}: unknown dependency {dep}')
                elif milestone_order.get(ti[dep]['milestone'],99) > milestone_order.get(task['milestone'],-1):
                    errors.append(f'{tid}: dependency points to later milestone {dep}')
            if not task.get('acceptance_ids'):
                errors.append(f'{tid}: no acceptance cases')
            for aid in task['acceptance_ids']:
                if aid not in ci:
                    errors.append(f'{tid}: unknown acceptance {aid}')
                elif tid not in ci[aid]['task_ids']:
                    errors.append(f'{tid}/{aid}: missing reverse mapping')
        for aid, case in ci.items():
            for field in ['given', 'when', 'then', 'environment', 'evidence_required']:
                if not case.get(field):
                    errors.append(f'{aid}: missing {field}')
            for tid in case.get('task_ids', []):
                if tid not in ti or aid not in ti[tid]['acceptance_ids']:
                    errors.append(f'{aid}/{tid}: invalid task mapping')

        visiting: set[str] = set()
        visited: set[str] = set()
        def visit(tid: str) -> None:
            if tid in visiting:
                errors.append(f'dependency cycle at {tid}')
                return
            if tid in visited or tid not in ti:
                return
            visiting.add(tid)
            for dep in ti[tid]['depends_on']:
                visit(dep)
            visiting.remove(tid)
            visited.add(tid)
        for tid in ti:
            visit(tid)

        for row in observations:
            for sid in row['source_ids']:
                if sid not in si:
                    errors.append(f'{row["id"]}: unknown source {sid}')
        for row in sources:
            if not row['url'].startswith('https://'):
                errors.append(f'{row["id"]}: source is not HTTPS')
        for path in root.rglob('*.md'):
            text = path.read_text(encoding='utf-8')
            for sid in set(re.findall(r'\b[SW]\d{2}\b', text)):
                if sid not in si:
                    errors.append(f'{path.relative_to(root)}: unknown source {sid}')

        if analytics.get('default_collection_enabled') is not False:
            errors.append('new collection must default off')
        for flag in ['external_raw_answers_allowed','external_raw_search_terms_allowed',
                     'sensitive_result_tracking_enabled','raw_query_logging_enabled']:
            if analytics.get(flag) is not False:
                errors.append(f'unsafe analytics flag: {flag}')
        if analytics.get('metrics_unknown_value', 'not_null') is not None:
            errors.append('missing metrics must remain null')
        names: set[str] = set()
        for event in analytics['events']:
            if event['name'] in names:
                errors.append(f'duplicate event: {event["name"]}')
            names.add(event['name'])
            bad = PROHIBITED_EXTERNAL.intersection(event['allowed_parameters'])
            if bad:
                errors.append(f'{event["name"]}: prohibited parameters {sorted(bad)}')
            if event.get('enabled_by_default') is not False:
                errors.append(f'{event["name"]}: unapproved default enablement')
        for flag in [
            'default_production_write_allowed','default_production_deploy_allowed',
            'default_new_paid_service_allowed','default_external_model_calls_allowed',
            'automatic_content_deletion_allowed','automatic_noindex_by_score_allowed',
            'automatic_scoring_rebalance_allowed','real_ad_click_testing_allowed',
        ]:
            if approval.get(flag) is not False:
                errors.append(f'unsafe approval policy: {flag}')
        for route in routes:
            if route.get('noindex') is True and route.get('robots_disallow') is True:
                errors.append(f'{route["kind"]}: conflicting noindex and robots disallow')
            if route['kind'] == 'pagination' and route.get('canonical') != 'self_not_page_one':
                errors.append('pagination: unexpected canonical policy')

        if verify_hashes:
            manifest = load_json(root / 'specs/package-manifest.json')
            manifest_names: set[str] = set()
            for entry in manifest['files']:
                name = entry['path']
                if name in manifest_names:
                    errors.append(f'duplicate manifest path: {name}')
                manifest_names.add(name)
                file = local_path(root, name)
                if not file.is_file():
                    errors.append(f'manifest missing file: {name}')
                elif hashlib.sha256(file.read_bytes()).hexdigest() != entry['sha256']:
                    errors.append(f'checksum mismatch: {name}')
            expected = {
                p.relative_to(root).as_posix() for p in root.rglob('*')
                if p.is_file() and p.name != 'package-manifest.json'
                and '__pycache__' not in p.parts and p.suffix != '.pyc'
            }
            if expected != manifest_names:
                errors.append('manifest coverage does not match package files')
    except (OSError, ValueError, TypeError, KeyError, AttributeError, RecursionError) as exc:
        errors.append(f'invalid package schema or file: {type(exc).__name__}: {exc}')
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--skip-checksums', action='store_true',
                        help='For intentional bundle edits: validate contracts without original checksums.')
    args = parser.parse_args()
    errors = validate(args.root, verify_hashes=not args.skip_checksums)
    if errors:
        for error in errors:
            print(f'FAIL: {error}', file=sys.stderr)
        return 1
    print('PASS: handoff bundle structure, references, and safety contracts.')
    print('This is not a temon application, deployment, SEO, or security test result.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
