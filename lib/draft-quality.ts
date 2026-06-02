const MIN_PUBLISH_SCORE = 90;
const QUALITY_VERSION = "due-draft-quality-v1";
const VALID_TAGS = new Set(["E", "I", "S", "N", "T", "F", "J", "P"]);
const AXIS_BY_TAG: Record<string, string> = {
  E: "EI",
  I: "EI",
  S: "SN",
  N: "SN",
  T: "TF",
  F: "TF",
  J: "JP",
  P: "JP",
};

type AnyRecord = Record<string, unknown>;

type ScoreState = {
  score: number;
  issues: Set<string>;
};

export type DraftQuality = {
  score: number;
  version: string;
  checkedAt: string;
  requiredScore: number;
  issues: string[];
};

function parseJson(value: unknown, fallback: unknown) {
  if (!value) return fallback;
  if (typeof value === "object") return value;

  try {
    return JSON.parse(String(value));
  } catch {
    return fallback;
  }
}

function compact(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function deduct(state: ScoreState, amount: number, issue: string) {
  state.score -= amount;
  state.issues.add(issue);
}

function getNumber(record: AnyRecord, snakeKey: string, camelKey: string) {
  const value = record[snakeKey] ?? record[camelKey];
  return typeof value === "number" ? value : Number(value);
}

function getString(record: AnyRecord, snakeKey: string, camelKey: string = snakeKey) {
  return compact(record[snakeKey] ?? record[camelKey]);
}

function scoreMetadata(state: ScoreState, test: AnyRecord, metadata: AnyRecord) {
  const title = compact(test.title);
  const description = compact(test.description);
  const keywords = Array.isArray(metadata.expandedKeywords)
    ? metadata.expandedKeywords
    : Array.isArray(metadata.keywords)
      ? metadata.keywords
      : [];

  if (title.length < 8 || title.length > 45) deduct(state, 4, "title_length");
  if (description.length < 120 || description.length > 320) {
    deduct(state, 8, "description_length");
  }
  if (!metadata.mainKeyword) deduct(state, 5, "main_keyword_missing");
  if (keywords.length < 3) deduct(state, 4, "expanded_keywords_missing");
  if (!metadata.copyQuality) deduct(state, 3, "copy_quality_missing");
  if (!metadata.resultCopyQuality) deduct(state, 3, "result_copy_quality_missing");
  if (getNumber(test, "question_count", "questionCount") !== 12) {
    deduct(state, 10, "declared_question_count");
  }
  if (getNumber(test, "result_type_count", "resultTypeCount") !== 16) {
    deduct(state, 10, "declared_result_count");
  }
}

function scoreQuestions(state: ScoreState, questions: AnyRecord[]) {
  if (questions.length !== 12) deduct(state, 20, "question_count");

  const axisCounts: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  questions.forEach((question, index) => {
    const text = getString(question, "question_text", "questionText");
    const choice1 = getString(question, "choice_1_text", "choice1Text");
    const choice2 = getString(question, "choice_2_text", "choice2Text");
    const tags = [
      ...(parseJson(question.choice_1_tags ?? question.choice1Tags, []) as unknown[]),
      ...(parseJson(question.choice_2_tags ?? question.choice2Tags, []) as unknown[]),
    ];
    const axes = new Set(
      tags.map((tag) => AXIS_BY_TAG[String(tag)]).filter(Boolean),
    );

    if (text.length < 15 || text.length > 90) deduct(state, 1, `question_length_${index + 1}`);
    if (!choice1 || !choice2) deduct(state, 2, `choice_missing_${index + 1}`);
    if (tags.some((tag) => !VALID_TAGS.has(String(tag)))) {
      deduct(state, 4, `invalid_tag_${index + 1}`);
    }
    if (axes.size !== 1) deduct(state, 4, `mixed_axis_${index + 1}`);

    const axis = [...axes][0];
    if (axis) axisCounts[axis] += 1;
  });

  Object.entries(axisCounts).forEach(([axis, count]) => {
    if (count !== 3) deduct(state, 8, `axis_${axis}_${count}`);
  });
}

function scoreResults(state: ScoreState, results: AnyRecord[]) {
  if (results.length !== 16) deduct(state, 20, "result_count");

  const typeCodes = new Set<string>();
  const labels = new Set<string>();

  results.forEach((result) => {
    const typeCode = getString(result, "type_code", "typeCode");
    const label = compact(result.label);
    const summary = compact(result.summary);
    const traits = parseJson(result.traits, []);

    if (typeCodes.has(typeCode)) deduct(state, 8, `duplicate_type_${typeCode}`);
    typeCodes.add(typeCode);
    if (labels.has(label)) deduct(state, 5, "duplicate_result_label");
    labels.add(label);
    if (summary.length < 80) deduct(state, 1, `short_summary_${typeCode}`);
    if (!Array.isArray(traits) || traits.length < 3) deduct(state, 1, `trait_count_${typeCode}`);
  });
}

export function buildDraftQuality(
  test: AnyRecord,
  metadata: AnyRecord,
  questions: AnyRecord[],
  results: AnyRecord[],
): DraftQuality {
  const state: ScoreState = { score: 100, issues: new Set() };

  scoreMetadata(state, test, metadata);
  scoreQuestions(state, questions);
  scoreResults(state, results);

  return {
    score: Math.max(0, state.score),
    version: QUALITY_VERSION,
    checkedAt: new Date().toISOString(),
    requiredScore: MIN_PUBLISH_SCORE,
    issues: [...state.issues],
  };
}

export function isPublishableQuality(quality: unknown) {
  if (!quality || typeof quality !== "object") return false;
  const score = (quality as { score?: unknown }).score;
  return typeof score === "number" && score >= MIN_PUBLISH_SCORE;
}
