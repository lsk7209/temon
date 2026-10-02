"""Offline tests for the handoff validator; no application/network execution."""
from __future__ import annotations
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from validate_package import validate

BASE = Path(__file__).resolve().parents[1]

class PackageValidatorTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name) / 'bundle'
        shutil.copytree(BASE, self.root, ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))

    def tearDown(self):
        self.tmp.cleanup()

    def mutate(self, path, fn):
        p = self.root / path
        data = json.loads(p.read_text(encoding='utf-8'))
        fn(data)
        p.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

    def errors(self):
        return '\n'.join(validate(self.root, verify_hashes=False))

    def test_baseline(self):
        self.assertEqual(validate(self.root), [])

    def test_duplicate_task(self):
        self.mutate('specs/backlog.json', lambda d: d['tasks'].append(dict(d['tasks'][0])))
        self.assertIn('duplicate task', self.errors())

    def test_missing_dependency(self):
        self.mutate('specs/backlog.json', lambda d: d['tasks'][0]['depends_on'].append('T999'))
        self.assertIn('unknown dependency', self.errors())

    def test_dependency_cycle(self):
        self.mutate('specs/backlog.json', lambda d: d['tasks'][0]['depends_on'].append('T002'))
        self.assertIn('dependency cycle', self.errors())

    def test_missing_acceptance(self):
        self.mutate('specs/backlog.json', lambda d: d['tasks'][0]['acceptance_ids'].append('AC999'))
        self.assertIn('unknown acceptance', self.errors())

    def test_reverse_mapping(self):
        self.mutate('specs/acceptance-cases.json', lambda d: d['cases'][0].update(task_ids=[]))
        self.assertIn('missing reverse mapping', self.errors())

    def test_unknown_source(self):
        self.mutate('evidence/observations.json', lambda d: d['observations'][0]['source_ids'].append('W99'))
        self.assertIn('unknown source', self.errors())

    def test_missing_file(self):
        (self.root / '02_MASTER_SPEC.md').unlink()
        self.assertIn('missing required file', self.errors())

    def test_forbidden_analytics_parameter(self):
        self.mutate('specs/analytics-contract.json', lambda d: d['events'][0]['allowed_parameters'].append('answer_text'))
        self.assertIn('prohibited parameters', self.errors())

    def test_noindex_robots_conflict(self):
        def change(d):
            for r in d['routes']:
                if r['kind']=='personal_share': r['robots_disallow']=True
        self.mutate('specs/route-matrix.example.json', change)
        self.assertIn('conflicting noindex', self.errors())

    def test_unapproved_deployment(self):
        self.mutate('specs/approval-policy.json', lambda d: d.update(default_production_deploy_allowed=True))
        self.assertIn('unsafe approval policy', self.errors())

    def test_checksum_tampering(self):
        p=self.root / '00_README.md'
        p.write_text(p.read_text(encoding='utf-8')+'\nchanged\n',encoding='utf-8')
        self.assertIn('checksum mismatch', '\n'.join(validate(self.root)))

    def test_manifest_path_traversal(self):
        self.mutate('specs/package-manifest.json', lambda d: d['files'][0].update(path='../outside'))
        self.assertIn('unsafe bundle path', '\n'.join(validate(self.root)))

    def test_default_collection_flag(self):
        self.mutate('specs/analytics-contract.json', lambda d: d.update(default_collection_enabled=True))
        self.assertIn('new collection must default off', self.errors())

if __name__ == '__main__':
    unittest.main()
