// result-hero.jsx — Result Hero + Shareable Result Card

const themePillStyle = {
  background: 'var(--theme-50)',
  color: 'var(--theme-ink)',
  border: '1px solid color-mix(in oklab, var(--theme-200) 60%, white)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  height: 30,
  padding: '0 12px',
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 600,
};

function ResultHero({ data, theme, onShare, onRetake }) {
  const { test, result } = data;
  return (
    <section className="hero" aria-labelledby="result-name">
      <div className="container">
        <div className="hero-grid">
          {/* 좌측: 결과 정보 */}
          <div className="hero-left">
            <div className="crumbs" style={{ marginBottom: 14 }}>
              <span>테스트</span>
              <span className="sep">/</span>
              <span>{test.category}</span>
              <span className="sep">/</span>
              <span className="here">{test.name}</span>
            </div>

            <div className="hero-eyebrow">당신의 결과는</div>

            <div className="hero-badges">
              <span className="code-badge">
                <span className="dot" />
                {result.code}
              </span>
              <span style={themePillStyle}>
                <Icon name="people" size={14} /> {result.rarity}
              </span>
            </div>

            <h1 id="result-name" className="hero-title">{result.name}</h1>

            <p className="hero-summary">{result.summary}</p>

            <div className="kw-pills">
              {result.keywords.map((k, i) => (
                <span key={i} className="kw-pill">{k}</span>
              ))}
            </div>

            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={onShare}>
                <Icon name="share" size={18} />
                친구에게 결과 공유하기
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onRetake}>
                <Icon name="refresh" size={18} />
                다시 테스트하기
              </button>
            </div>

            <div className="hero-meta">
              <span><Icon name="check" size={14} /> 결과 저장 완료</span>
              <span className="dot-sep">·</span>
              <span>{test.questions}문항 · {test.duration}</span>
            </div>
          </div>

          {/* 우측: 공유용 결과 카드 */}
          <div className="hero-right">
            <ShareableResultCard data={data} theme={theme} />
            <div className="card-actions">
              <button className="btn btn-ghost btn-sm" onClick={onShare}>
                <Icon name="image" size={16} /> 이미지로 저장
              </button>
              <button className="btn btn-ghost btn-sm" onClick={onShare}>
                <Icon name="link" size={16} /> 링크 복사
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero { padding-top: 24px; }
        @media (min-width: 768px) { .hero { padding-top: 40px; } }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 48px;
            align-items: start;
          }
        }

        .hero-eyebrow {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-3);
          margin-bottom: 10px;
        }
        .hero-badges {
          display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
          margin-bottom: 14px;
        }
        .hero-title {
          font-size: clamp(28px, 6vw, 44px);
          line-height: 1.2;
          letter-spacing: -0.028em;
          font-weight: 800;
          color: var(--ink-1);
          margin: 0 0 14px;
          text-wrap: balance;
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 50px; }
        }
        .hero-summary {
          font-size: 17px;
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0 0 22px;
          max-width: 540px;
          text-wrap: pretty;
        }
        @media (min-width: 768px) {
          .hero-summary { font-size: 19px; line-height: 1.6; }
        }
        .kw-pills {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 26px;
        }
        .kw-pill {
          height: 34px; padding: 0 14px;
          display: inline-flex; align-items: center;
          border-radius: 999px;
          background: #fff;
          border: 1px solid var(--line);
          color: var(--ink-2);
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
        }
        .hero-actions {
          display: grid; grid-template-columns: 1fr; gap: 10px;
          margin-bottom: 18px;
        }
        @media (min-width: 480px) {
          .hero-actions { grid-template-columns: 1fr auto; }
        }
        .hero-meta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--ink-4);
        }
        .hero-meta .dot-sep { color: var(--ink-5); }

        .hero-right {
          display: flex; flex-direction: column; gap: 12px;
          align-items: stretch;
        }
        @media (min-width: 960px) {
          .hero-right { position: sticky; top: 72px; }
        }
        .card-actions {
          display: flex; gap: 6px; justify-content: center;
        }
      `}</style>
    </section>
  );
}

/* ── 공유용 결과 카드 (옵션 3: 상단 컬러 밴드) ─────────── */
function ShareableResultCard({ data, theme }) {
  const { test, result } = data;
  const cardStyle = {
    background: '#fff',
    borderRadius: 18,
    border: '1px solid var(--line)',
    boxShadow: '0 1px 0 rgba(11,18,32,0.04), 0 20px 40px -28px rgba(11,18,32,0.18)',
    overflow: 'hidden',
    position: 'relative',
  };
  const bandStyle = {
    height: 88,
    background: `linear-gradient(135deg, var(--theme-600), var(--theme-500))`,
    position: 'relative',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    padding: '0 22px 14px',
    color: '#fff',
  };
  return (
    <div className="share-card" style={cardStyle} role="figure" aria-label="공유용 결과 카드">
      <div style={bandStyle}>
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, letterSpacing: '0.02em' }}>
          temon.kr · {test.category}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
          background: 'rgba(255,255,255,0.18)',
          padding: '4px 10px', borderRadius: 999,
          backdropFilter: 'blur(6px)',
        }}>
          {result.code}
        </div>
        {/* 미세한 장식 도트 */}
        <svg style={{ position: 'absolute', right: 16, top: 14, opacity: 0.35 }}
             width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="1.4" fill="#fff" />
          <circle cx="18" cy="6" r="1.4" fill="#fff" />
          <circle cx="30" cy="6" r="1.4" fill="#fff" />
          <circle cx="6" cy="18" r="1.4" fill="#fff" />
          <circle cx="18" cy="18" r="1.4" fill="#fff" />
          <circle cx="6" cy="30" r="1.4" fill="#fff" />
        </svg>
      </div>

      <div style={{ padding: '22px 22px 24px' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-4)', marginBottom: 8 }}>
          {test.name}
        </div>
        <div style={{
          fontSize: 22, fontWeight: 800, color: 'var(--ink-1)',
          letterSpacing: '-0.025em', lineHeight: 1.3,
          textWrap: 'balance',
        }}>
          {result.name}
        </div>
        <div style={{
          marginTop: 12,
          fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-3)',
          textWrap: 'pretty',
        }}>
          {result.summary}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18 }}>
          {result.keywords.map((k, i) => (
            <span key={i} style={{
              fontSize: 12, fontWeight: 600,
              padding: '5px 10px',
              borderRadius: 999,
              background: 'var(--theme-50)',
              color: 'var(--theme-ink)',
              border: '1px solid color-mix(in oklab, var(--theme-200) 60%, white)',
            }}>{k}</span>
          ))}
        </div>

        <div style={{
          marginTop: 22, paddingTop: 16,
          borderTop: '1px dashed var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--ink-4)',
        }}>
          <span>나의 결과 보러가기 →</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontWeight: 600, color: 'var(--ink-3)',
          }}>
            <span style={{
              width: 14, height: 14, borderRadius: 4,
              background: 'var(--theme-600)', display: 'inline-block',
              marginRight: 2,
            }} />
            temon.kr
          </span>
        </div>
      </div>
    </div>
  );
}

window.ResultHero = ResultHero;
window.ShareableResultCard = ShareableResultCard;
