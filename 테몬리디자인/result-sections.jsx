// result-sections.jsx — Quick Summary, Interpretation, Action Guide, Compatibility

/* ─── 1. Quick Summary (4-up) ─── */
function ResultSummaryGrid({ traits }) {
  return (
    <section className="section" aria-labelledby="summary-title">
      <div className="container">
        <div className="section-eyebrow">
          <Icon name="sparkle" size={14} /> 10초 요약
        </div>
        <h2 id="summary-title" className="section-title">한눈에 보는 나의 패턴</h2>
        <p className="section-desc">결과를 단정 짓는 라벨이 아니라, 평소 선택에서 자주 나타나는 모습이에요.</p>

        <div className="summary-grid">
          {traits.map((t, i) => (
            <div key={i} className="summary-card">
              <div className="summary-icon"><Icon name={t.icon} size={20} /></div>
              <div className="summary-label">{t.label}</div>
              <div className="summary-text">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 560px) { .summary-grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
        @media (min-width: 960px) { .summary-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

        .summary-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px 18px 20px;
          display: flex; flex-direction: column; gap: 8px;
          box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) {
          .summary-card { padding: 22px 20px 24px; }
        }
        .summary-icon {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 10px;
          background: var(--theme-50);
          color: var(--theme-700);
          margin-bottom: 4px;
        }
        .summary-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-4);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .summary-text {
          font-size: 15.5px;
          line-height: 1.5;
          color: var(--ink-1);
          font-weight: 600;
          letter-spacing: -0.012em;
        }
      `}</style>
    </section>
  );
}
window.ResultSummaryGrid = ResultSummaryGrid;

/* ─── 2. Detailed Interpretation (본문) ─── */
function ResultInterpretation({ data }) {
  const { interpretation, name } = data.result;
  return (
    <section className="section" aria-labelledby="interp-title">
      <div className="reading">
        <div className="section-eyebrow"><Icon name="message" size={14} /> 자세히 보기</div>
        <h2 id="interp-title" className="section-title">{name}, 어떤 의미일까요?</h2>
        <p className="section-desc">결과를 “성격 단정”이 아니라 “지금의 선택 패턴”으로 풀어 적었어요.</p>

        {/*
          v0.6 C5: 광고 island — 본문 단락 사이로 자동광고가 끼어드는 것을 방지.
          AdSense 자동광고는 data-no-ad="true" 요소 내부를 무시하도록 운영 단계에서 설정.
          참고: 페이지 로딩 후 window.adsbygoogle.pauseAdRequests = 1 처리도 옵션.
        */}
        <article className="interp" data-no-ad="true" data-ad-region="body">
          {interpretation.map((block, i) => (
            <div key={i} className="interp-block">
              <div className="interp-h">
                <span className="interp-num">0{i + 1}</span>
                <h3>{block.h}</h3>
              </div>
              {block.p.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          ))}
        </article>
      </div>
      <style>{`
        .interp {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 8px 22px 6px;
          box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) {
          .interp { padding: 12px 36px 16px; }
        }
        .interp-block {
          padding: 22px 0 24px;
          border-bottom: 1px solid var(--line-soft);
        }
        .interp-block:last-child { border-bottom: 0; }

        .interp-h {
          display: flex; align-items: baseline; gap: 12px;
          margin-bottom: 12px;
        }
        .interp-num {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--theme-700);
          letter-spacing: 0.06em;
        }
        .interp-h h3 {
          font-size: 19px;
          font-weight: 800;
          color: var(--ink-1);
          letter-spacing: -0.022em;
          margin: 0;
          line-height: 1.4;
        }
        @media (min-width: 768px) {
          .interp-h h3 { font-size: 22px; }
        }
        .interp p {
          font-size: 16px;
          line-height: 1.78;
          color: var(--ink-2);
          margin: 0 0 14px;
          text-wrap: pretty;
        }
        @media (min-width: 768px) {
          .interp p { font-size: 17px; line-height: 1.8; }
        }
        .interp p:last-child { margin-bottom: 0; }
      `}</style>
    </section>
  );
}
window.ResultInterpretation = ResultInterpretation;

/* ─── 3. Practical Guide (체크리스트) ─── */
function ResultActionGuide({ tips }) {
  const [checked, setChecked] = React.useState(() => new Set());
  const toggle = (i) => setChecked((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });
  const done = checked.size;

  return (
    <section className="section" aria-labelledby="action-title">
      <div className="reading">
        <div className="section-eyebrow"><Icon name="spark" size={14} /> 오늘 바로</div>
        <h2 id="action-title" className="section-title">바로 써먹는 활용법</h2>
        <p className="section-desc">
          한 번에 다 바꾸려 하지 말고, 가장 끌리는 한 가지만 2주 정도 해보세요.
        </p>

        <div className="action-card">
          <ul className="action-list">
            {tips.map((tip, i) => {
              const on = checked.has(i);
              return (
                <li key={i} className={`action-item ${on ? 'on' : ''}`}>
                  <button
                    type="button"
                    className="action-check"
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                    aria-label={on ? '체크 해제' : '체크'}
                  >
                    {on && <Icon name="check" size={14} />}
                  </button>
                  <span className="action-text">{tip}</span>
                </li>
              );
            })}
          </ul>
          <div className="action-foot">
            <span className="action-progress">
              {done > 0 ? `${done}개 체크` : '하나 골라서 시작해 볼까요?'}
            </span>
            <span className="action-hint">체크해두면 친구에게 공유할 때 함께 보여요</span>
          </div>
        </div>
      </div>

      <style>{`
        .action-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 8px 18px 16px;
          box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) {
          .action-card { padding: 12px 28px 20px; }
        }
        .action-list { list-style: none; margin: 0; padding: 0; }
        .action-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .action-item:last-child { border-bottom: 0; }
        .action-check {
          width: 26px; height: 26px;
          border-radius: 8px;
          border: 1.5px solid var(--line);
          background: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background .15s ease, border-color .15s ease, transform .1s ease;
          flex: 0 0 26px;
          margin-top: 2px;
        }
        .action-check:hover { border-color: var(--theme-300); }
        .action-item.on .action-check {
          background: var(--theme-600);
          border-color: var(--theme-600);
        }
        .action-text {
          font-size: 16px;
          line-height: 1.55;
          color: var(--ink-1);
          font-weight: 500;
          letter-spacing: -0.012em;
          transition: color .15s ease;
        }
        .action-item.on .action-text {
          color: var(--ink-3);
          text-decoration: line-through;
          text-decoration-color: var(--ink-5);
          text-decoration-thickness: 1px;
        }
        .action-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          padding-top: 14px;
          margin-top: 6px;
          border-top: 1px dashed var(--line);
        }
        .action-progress { font-size: 13px; font-weight: 600; color: var(--theme-700); }
        .action-hint { font-size: 12px; color: var(--ink-4); }
      `}</style>
    </section>
  );
}
window.ResultActionGuide = ResultActionGuide;

/* ─── 4. Compatibility & Comparison ─── */
function ResultCompatibility({ data }) {
  const { compatibleTypes, contrastTypes, similarComparison } = data.result;

  return (
    <section className="section" aria-labelledby="compat-title">
      <div className="container">
        <div className="section-eyebrow"><Icon name="people" size={14} /> 함께 보면 재미있는</div>
        <h2 id="compat-title" className="section-title">잘 맞는 유형 · 부딪히기 쉬운 유형</h2>
        <p className="section-desc">정답이 아니라 가벼운 참고용으로 봐 주세요.</p>

        <div className="compat-grid">
          <div className="compat-col compat-col--good">
            <div className="compat-head">
              <span className="compat-tag good">잘 맞아요</span>
              <span className="compat-count">{compatibleTypes.length}유형</span>
            </div>
            {compatibleTypes.map((t, i) => (
              <div key={i} className="compat-item">
                <div className="compat-top">
                  <span className="compat-code">{t.code}</span>
                  <span className="compat-name">{t.name}</span>
                </div>
                <p className="compat-reason">{t.reason}</p>
              </div>
            ))}
          </div>

          <div className="compat-col compat-col--bad">
            <div className="compat-head">
              <span className="compat-tag bad">조심해요</span>
              <span className="compat-count">{contrastTypes.length}유형</span>
            </div>
            {contrastTypes.map((t, i) => (
              <div key={i} className="compat-item">
                <div className="compat-top">
                  <span className="compat-code">{t.code}</span>
                  <span className="compat-name">{t.name}</span>
                </div>
                <p className="compat-reason">{t.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 비슷하지만 다른 유형 비교 박스 */}
        <SimilarCompare data={similarComparison} />
      </div>

      <style>{`
        .compat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 768px) {
          .compat-grid { grid-template-columns: 1fr 1fr; gap: 18px; }
        }
        .compat-col {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 18px 20px 8px;
          box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) { .compat-col { padding: 22px 24px 10px; } }
        .compat-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .compat-tag {
          font-size: 12px; font-weight: 700;
          padding: 5px 10px; border-radius: 999px;
          letter-spacing: 0.02em;
        }
        .compat-tag.good {
          background: var(--theme-50);
          color: var(--theme-ink);
        }
        .compat-tag.bad {
          background: #FFF7ED;
          color: #9A3412;
        }
        .compat-count { font-size: 12px; color: var(--ink-4); }
        .compat-item {
          padding: 14px 0;
          border-top: 1px solid var(--line-soft);
        }
        .compat-item:first-of-type { border-top: 0; padding-top: 0; }
        .compat-top {
          display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
        }
        .compat-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 700;
          padding: 3px 8px; border-radius: 6px;
          background: #F1F3F7; color: var(--ink-3);
          letter-spacing: 0.05em;
        }
        .compat-name {
          font-size: 15.5px; font-weight: 700; color: var(--ink-1);
          letter-spacing: -0.015em;
        }
        .compat-reason {
          font-size: 14.5px; line-height: 1.65; color: var(--ink-3); margin: 0;
        }
      `}</style>
    </section>
  );
}

function SimilarCompare({ data }) {
  return (
    <div className="similar">
      <div className="similar-eyebrow">
        <Icon name="spark" size={13} /> 비슷하지만 다른 유형
      </div>
      <div className="similar-head">
        <div className="similar-col">
          <span className="similar-code">{data.self.code}</span>
          <div className="similar-name self">{data.self.name}</div>
          <div className="similar-tag">{data.self.tag}</div>
        </div>
        <div className="similar-vs">vs</div>
        <div className="similar-col">
          <span className="similar-code">{data.other.code}</span>
          <div className="similar-name other">{data.other.name}</div>
          <div className="similar-tag">{data.other.tag}</div>
        </div>
      </div>
      <div className="similar-rows">
        {data.diff.map((row, i) => (
          <div key={i} className="similar-row">
            <div className="similar-axis">{row.axis}</div>
            <div className="similar-val self">{row.self}</div>
            <div className="similar-val other">{row.other}</div>
          </div>
        ))}
      </div>

      <style>{`
        .similar {
          margin-top: 18px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) { .similar { padding: 26px 28px; } }
        .similar-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 700;
          color: var(--theme-700);
          letter-spacing: 0.04em;
          margin-bottom: 14px;
        }
        .similar-head {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 10px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--line-soft);
        }
        .similar-col { display: flex; flex-direction: column; gap: 4px; }
        .similar-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          color: var(--ink-4);
          letter-spacing: 0.06em;
        }
        .similar-name {
          font-size: 17px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--ink-1);
        }
        .similar-name.self { color: var(--theme-700); }
        .similar-tag { font-size: 12.5px; color: var(--ink-4); }
        .similar-vs {
          width: 34px; height: 34px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: var(--bg);
          color: var(--ink-4);
          font-size: 12px; font-weight: 700;
        }
        .similar-rows { margin-top: 8px; }
        .similar-row {
          display: grid;
          grid-template-columns: 110px 1fr 1fr;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid var(--line-soft);
          font-size: 14px;
          align-items: baseline;
        }
        @media (min-width: 768px) {
          .similar-row { grid-template-columns: 160px 1fr 1fr; gap: 12px; font-size: 15px; }
        }
        .similar-row:last-child { border-bottom: 0; }
        .similar-axis { color: var(--ink-4); font-weight: 600; font-size: 12.5px; letter-spacing: 0.01em; text-transform: uppercase; }
        @media (min-width: 768px) { .similar-axis { font-size: 13px; } }
        .similar-val { color: var(--ink-2); }
        .similar-val.self { color: var(--theme-700); font-weight: 600; }
        .similar-val.other { color: var(--ink-2); }
      `}</style>
    </div>
  );
}
window.ResultCompatibility = ResultCompatibility;
