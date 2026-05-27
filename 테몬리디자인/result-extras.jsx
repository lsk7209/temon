// result-extras.jsx — FAQ, Related Tests, Bottom CTA, Ad Slot, Share Sheet, Fallback

/* ─── FAQ (아코디언) ─── */
function ResultFAQ({ items }) {
  const [open, setOpen] = React.useState(0);

  // v0.6 B5: schema.org FAQPage JSON-LD 자동 주입
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'result-faq-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': items.map((it) => ({
        '@type': 'Question',
        'name': it.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': it.a,
        },
      })),
    });
    // 기존 스크립트 제거
    const ex = document.getElementById('result-faq-schema');
    if (ex) ex.remove();
    document.head.appendChild(script);
    return () => {
      const e = document.getElementById('result-faq-schema');
      if (e) e.remove();
    };
  }, [items]);

  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="reading">
        <div className="section-eyebrow"><Icon name="message" size={14} /> 자주 묻는 질문</div>
        <h2 id="faq-title" className="section-title">결과를 어떻게 해석하면 좋을까?</h2>
        <div className="faq">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">Q. {it.q}</span>
                  <span className="faq-q-icon"><Icon name="chevron" size={20} /></span>
                </button>
                <div className="faq-a" aria-hidden={!isOpen}>
                  <div className="faq-a-inner">
                    <span className="faq-a-mark">A.</span>
                    <p>{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .faq-item + .faq-item { border-top: 1px solid var(--line-soft); }
        .faq-q {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
          padding: 20px 22px;
          text-align: left;
          font-size: 16px; font-weight: 600;
          color: var(--ink-1);
          letter-spacing: -0.012em;
          line-height: 1.5;
          transition: background .15s ease;
        }
        @media (min-width: 768px) {
          .faq-q { padding: 22px 28px; font-size: 17px; }
        }
        .faq-q:hover { background: #FAFBFC; }
        .faq-q-icon {
          flex: 0 0 20px;
          color: var(--ink-4);
          transition: transform .25s ease, color .15s ease;
        }
        .faq-item.open .faq-q-icon {
          transform: rotate(180deg);
          color: var(--theme-700);
        }
        .faq-a {
          max-height: 0; overflow: hidden;
          transition: max-height .3s ease;
        }
        .faq-item.open .faq-a { max-height: 400px; }
        .faq-a-inner {
          display: flex; gap: 10px;
          padding: 0 22px 22px;
          color: var(--ink-2);
        }
        @media (min-width: 768px) { .faq-a-inner { padding: 0 28px 26px; } }
        .faq-a-mark {
          flex: 0 0 18px;
          font-weight: 700; color: var(--theme-700);
          font-size: 15px;
          line-height: 1.7;
        }
        .faq-a p {
          margin: 0;
          font-size: 15px; line-height: 1.75;
          color: var(--ink-2);
          text-wrap: pretty;
        }
        @media (min-width: 768px) { .faq-a p { font-size: 16px; } }
      `}</style>
    </section>
  );
}
window.ResultFAQ = ResultFAQ;

/* ─── Related Tests ─── */
function RelatedTests({ items, themes, onPick }) {
  return (
    <section className="section" aria-labelledby="related-title">
      <div className="container">
        <div className="section-eyebrow"><Icon name="spark-small" size={13} /> 다음에 해볼 만한</div>
        <div className="related-head">
          <h2 id="related-title" className="section-title" style={{ margin: 0 }}>관련 테스트</h2>
          <a href="#" className="related-more" onClick={(e) => e.preventDefault()}>
            전체 보기 <Icon name="arrow-right" size={14} />
          </a>
        </div>

        <div className="related-grid">
          {items.map((it, i) => {
            const t = themes[it.theme] || themes.stable;
            return (
              <button
                key={i}
                type="button"
                className="related-card"
                onClick={() => onPick?.(it)}
                style={{
                  '--rt-50': t[50],
                  '--rt-100': t[100],
                  '--rt-600': t[600],
                  '--rt-700': t[700],
                  '--rt-ink': t.ink,
                }}
              >
                <div className="related-emoji" aria-hidden="true">{it.emoji}</div>
                <div className="related-cat">{it.cat}</div>
                <div className="related-title">{it.title}</div>
                <div className="related-desc">{it.desc}</div>
                <div className="related-foot">
                  <span className="related-participants">
                    <Icon name="people" size={13} /> {it.participants}명 참여
                  </span>
                  <span className="related-go">
                    시작하기 <Icon name="arrow-right" size={13} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .related-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 8px; margin-bottom: 22px;
        }
        .related-more {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 13.5px; font-weight: 600; color: var(--ink-3);
        }
        .related-more:hover { color: var(--ink-1); }

        .related-grid {
          display: grid; grid-template-columns: 1fr; gap: 14px;
        }
        @media (min-width: 560px) { .related-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 960px) { .related-grid { grid-template-columns: 1fr 1fr 1fr; gap: 18px; } }

        .related-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 22px 20px 18px;
          text-align: left;
          display: flex; flex-direction: column; gap: 6px;
          box-shadow: var(--shadow-sm);
          transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
          position: relative;
          overflow: hidden;
        }
        .related-card::before {
          content: '';
          position: absolute; left: 0; right: 0; top: 0;
          height: 4px;
          background: var(--rt-600);
          opacity: 0.9;
        }
        .related-card:hover {
          border-color: var(--rt-600);
          box-shadow: 0 12px 30px -16px color-mix(in oklab, var(--rt-600) 35%, transparent);
          transform: translateY(-2px);
        }
        .related-emoji {
          width: 44px; height: 44px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 24px;
          background: var(--rt-50);
          border-radius: 12px;
          margin-bottom: 6px;
        }
        .related-cat {
          font-size: 11.5px; font-weight: 700;
          color: var(--rt-700);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .related-title {
          font-size: 17px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.022em;
          line-height: 1.35;
        }
        .related-desc {
          font-size: 13.5px; color: var(--ink-3); line-height: 1.55;
          flex: 1;
        }
        .related-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 14px; padding-top: 12px;
          border-top: 1px solid var(--line-soft);
          font-size: 12.5px;
        }
        .related-participants {
          display: inline-flex; align-items: center; gap: 4px;
          color: var(--ink-4); font-weight: 500;
        }
        .related-go {
          display: inline-flex; align-items: center; gap: 4px;
          color: var(--rt-700); font-weight: 700;
        }
      `}</style>
    </section>
  );
}
window.RelatedTests = RelatedTests;

/* ─── Bottom CTA ─── */
function BottomResultCTA({ onShare, onRetake, onExplore }) {
  return (
    <section className="section bottom-cta" aria-label="다음 액션">
      <div className="container">
        <div className="bcta">
          <div className="bcta-head">
            <Icon name="sparkle" size={16} />
            <span className="bcta-eyebrow">결과를 다 읽으셨다면</span>
          </div>
          <h2 className="bcta-title">친구에게도 보여주고 싶다면, 지금이 좋은 타이밍이에요</h2>
          <p className="bcta-desc">
            결과 카드를 캡처해서 보내거나, 링크 그대로 공유할 수도 있어요.
          </p>
          <div className="bcta-actions">
            <button className="btn btn-primary btn-lg" onClick={onShare}>
              <Icon name="share" size={18} /> 결과 공유하기
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onRetake}>
              <Icon name="refresh" size={18} /> 다시 테스트하기
            </button>
            <button className="btn btn-ghost btn-lg" onClick={onExplore}>
              <Icon name="arrow-right" size={18} /> 다른 테스트 보기
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .bcta {
          background: linear-gradient(180deg, #fff, var(--theme-50));
          border: 1px solid color-mix(in oklab, var(--theme-200) 50%, var(--line));
          border-radius: 20px;
          padding: 28px 22px;
          text-align: center;
        }
        @media (min-width: 768px) { .bcta { padding: 48px 32px; } }
        .bcta-head {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--theme-700);
          margin-bottom: 12px;
        }
        .bcta-eyebrow {
          font-size: 12.5px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .bcta-title {
          font-size: 22px; font-weight: 800; letter-spacing: -0.022em;
          color: var(--ink-1); margin: 0 0 10px; line-height: 1.35;
          text-wrap: balance;
        }
        @media (min-width: 768px) { .bcta-title { font-size: 28px; } }
        .bcta-desc {
          font-size: 15px; color: var(--ink-3); margin: 0 0 22px; line-height: 1.6;
        }
        @media (min-width: 768px) { .bcta-desc { font-size: 16px; } }
        .bcta-actions {
          display: grid; grid-template-columns: 1fr; gap: 10px;
          max-width: 540px; margin: 0 auto;
        }
        @media (min-width: 560px) {
          .bcta-actions { grid-template-columns: 1fr 1fr; }
          .bcta-actions .btn-ghost { grid-column: 1 / -1; }
        }
        @media (min-width: 768px) {
          .bcta-actions {
            grid-template-columns: auto auto auto;
            justify-content: center;
            max-width: none;
          }
          .bcta-actions .btn-ghost { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
window.BottomResultCTA = BottomResultCTA;

/* ─── Ad Slot (reserved) ─── */
function ResultAdSlot({ slot, demo }) {
  // demo=true 일 경우 채워진 시각, false면 빈 reserved slot
  const size = slot === 'horizontal' ? 'ad-1' : 'ad-2';
  return (
    <div className="section ad-section" aria-label="광고">
      <div className="container">
        <div className={`ad-slot ${size}`} data-loaded={demo ? 'true' : 'false'}>
          {demo ? (
            <div className="ad-display">
              <span style={{ opacity: 0.6 }}>광고 영역 (Google AdSense 자동광고)</span>
            </div>
          ) : (
            <div className="ad-slot-inner">
              <span className="ad-label">광고 영역 · 광고가 표시되지 않으면 자동으로 숨겨져요</span>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .ad-section { margin-top: 40px; }
        @media (min-width: 768px) { .ad-section { margin-top: 56px; } }
      `}</style>
    </div>
  );
}
window.ResultAdSlot = ResultAdSlot;

/* ─── Share Sheet (바텀시트 + 데스크톱 모달) ─── */
function ShareSheet({ open, onClose, data }) {
  const [copied, setCopied] = React.useState(false);
  const [ratio, setRatio] = React.useState('1:1'); // v0.6 B4: 캡처 비율
  const url = `https://temon.kr/result/${data.result.code.toLowerCase()}`;
  const text = `[${data.test.name}] 나의 결과: ${data.result.name}`;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const channels = [
    { id: 'kakao',   label: '카카오톡',   icon: 'message',  bg: '#FEE500', color: '#181600' },
    { id: 'sns',     label: 'X / Threads', icon: 'twitter',  bg: '#0F1419', color: '#fff' },
    { id: 'image',   label: '이미지 저장', icon: 'download', bg: '#F1F3F7', color: '#0B1220' },
    { id: 'link',    label: copied ? '복사됨' : '링크 복사', icon: 'link',  bg: '#F1F3F7', color: '#0B1220', action: copy },
  ];

  return (
    <>
      <div className={`scrim ${open ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div className={`sheet ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="결과 공유">
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <div className="sheet-eyebrow">결과 공유</div>
            <div className="sheet-title">친구에게 보여주기</div>
          </div>
          <button className="sheet-close" onClick={onClose} aria-label="닫기">
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* v0.6 B4: 비율 선택 + 비율에 맞춰 변하는 미리보기 */}
        <div className="ratio-row">
          <div className="ratio-label">캡처 비율</div>
          <div className="ratio-seg" role="radiogroup" aria-label="공유 카드 비율">
            {[
              { id: '1:1',    label: '1:1',    sub: '인스타 피드 / 트위터' },
              { id: '9:16',   label: '9:16',   sub: '인스타 스토리' },
              { id: '1.91:1', label: '1.91:1', sub: '카카오톡 미리보기' },
            ].map(opt => (
              <button
                key={opt.id}
                className={`ratio-btn ${ratio === opt.id ? 'on' : ''}`}
                onClick={() => setRatio(opt.id)}
                role="radio"
                aria-checked={ratio === opt.id}
                title={opt.sub}
              >
                <span className="ratio-btn-shape" data-r={opt.id} />
                <span className="ratio-btn-label">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="ratio-sub">
            {ratio === '1:1' && '인스타 피드 / 트위터 / 일반 SNS'}
            {ratio === '9:16' && '인스타 스토리 / 릴스 커버용 세로 카드'}
            {ratio === '1.91:1' && '카카오톡 / 페이스북 미리보기용 가로 카드'}
          </div>
        </div>

        {/* mini preview */}
        <div className={`sheet-preview r-${ratio.replace(':', '-').replace('.', '_')}`}>
          <div className="sheet-preview-band" />
          <div className="sheet-preview-body">
            <div className="sheet-preview-code">{data.result.code} · {data.test.category}</div>
            {data.result.nickname && (
              <div className="sheet-preview-nick">{data.result.nickname}</div>
            )}
            <div className="sheet-preview-name">{data.result.name}</div>
            <div className="sheet-preview-summary">{data.result.summary}</div>
            <div className="sheet-preview-url">{data.result.shareUrl || 'temon.kr'}</div>
          </div>
        </div>

        <div className="sheet-section-label">공유 방법</div>
        <div className="sheet-grid">
          {channels.map((c) => (
            <button
              key={c.id}
              className="sheet-channel"
              onClick={c.action || onClose}
            >
              <span
                className="sheet-channel-icon"
                style={{ background: c.bg, color: c.color }}
              >
                <Icon name={c.icon} size={20} />
              </span>
              <span className="sheet-channel-label">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="sheet-link">
          <span className="sheet-link-url" title={url}>{url}</span>
          <button className="btn btn-secondary btn-sm" onClick={copy}>
            {copied ? <><Icon name="check" size={14} /> 복사됨</> : <><Icon name="link" size={14} /> 복사</>}
          </button>
        </div>
      </div>

      <style>{`
        .sheet-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; margin-bottom: 18px;
        }
        .sheet-eyebrow { font-size: 12px; color: var(--theme-700); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
        .sheet-title { font-size: 19px; font-weight: 800; color: var(--ink-1); margin-top: 4px; letter-spacing: -0.02em; }
        .sheet-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #F1F3F7; color: var(--ink-2);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .sheet-close:hover { background: #E6E8EC; }

        /* v0.6 B4: 비율 선택 row */
        .ratio-row {
          margin-bottom: 14px;
        }
        .ratio-label {
          font-size: 11.5px; font-weight: 700;
          color: var(--ink-4); margin-bottom: 8px;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .ratio-seg {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: var(--bg);
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 6px;
        }
        .ratio-btn {
          display: flex; flex-direction: row; align-items: center; gap: 8px;
          padding: 8px 6px;
          background: transparent;
          border-radius: 7px;
          font-size: 12px; font-weight: 700;
          color: var(--ink-3);
          transition: all .15s ease;
          justify-content: center;
        }
        .ratio-btn.on {
          background: #fff;
          color: var(--ink-1);
          box-shadow: 0 1px 3px rgba(11,18,32,0.08);
        }
        .ratio-btn-shape {
          display: inline-block;
          border: 1.5px solid currentColor;
          border-radius: 2px;
          flex: 0 0 auto;
        }
        .ratio-btn-shape[data-r="1:1"] { width: 12px; height: 12px; }
        .ratio-btn-shape[data-r="9:16"] { width: 8px; height: 14px; }
        .ratio-btn-shape[data-r="1.91:1"] { width: 16px; height: 9px; }
        .ratio-sub {
          font-size: 11.5px; color: var(--ink-4);
          text-align: center;
        }

        /* preview — aspect-ratio aware */
        .sheet-preview {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
          transition: aspect-ratio .25s ease;
        }
        .sheet-preview.r-1-1 { aspect-ratio: 1 / 1; }
        .sheet-preview.r-9-16 { aspect-ratio: 9 / 16; max-height: 380px; }
        .sheet-preview.r-1_91-1 { aspect-ratio: 1.91 / 1; }
        .sheet-preview {
          display: flex; flex-direction: column;
        }
        .sheet-preview .sheet-preview-band {
          flex: 0 0 auto;
        }
        .sheet-preview-band {
          height: 38px;
          background: linear-gradient(135deg, var(--theme-600), var(--theme-500));
        }
        .sheet-preview.r-9-16 .sheet-preview-band { height: 56px; }
        .sheet-preview.r-1_91-1 .sheet-preview-band { height: 24px; }

        .sheet-preview-body {
          flex: 1;
          padding: 14px 16px 16px;
          display: flex; flex-direction: column;
        }
        .sheet-preview.r-1_91-1 .sheet-preview-body { padding: 10px 14px 12px; }
        .sheet-preview-code {
          font-size: 11.5px; font-weight: 700; color: var(--ink-4);
          letter-spacing: 0.05em; margin-bottom: 4px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .sheet-preview-nick {
          font-size: 20px; font-weight: 900;
          color: var(--theme-700); letter-spacing: -0.025em;
          line-height: 1.1; margin-bottom: 4px;
        }
        .sheet-preview.r-9-16 .sheet-preview-nick { font-size: 28px; margin-top: 6px; }
        .sheet-preview.r-1_91-1 .sheet-preview-nick { font-size: 17px; }
        .sheet-preview-name { font-size: 13px; font-weight: 700; color: var(--ink-2); letter-spacing: -0.012em; line-height: 1.35; }
        .sheet-preview.r-1_91-1 .sheet-preview-name { font-size: 11.5px; }
        .sheet-preview-summary { font-size: 12px; color: var(--ink-3); line-height: 1.55; margin-top: 6px; }
        .sheet-preview.r-1_91-1 .sheet-preview-summary { display: none; }
        .sheet-preview-url {
          margin-top: auto;
          padding-top: 8px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          color: var(--theme-700);
          letter-spacing: 0.04em;
        }

        .sheet-section-label {
          font-size: 12px; font-weight: 700;
          color: var(--ink-4); margin-bottom: 12px;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .sheet-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 12px; margin-bottom: 18px;
        }
        .sheet-channel {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .sheet-channel-icon {
          width: 52px; height: 52px;
          border-radius: 16px;
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform .1s ease;
        }
        .sheet-channel:hover .sheet-channel-icon { transform: translateY(-2px); }
        .sheet-channel-label { font-size: 12px; font-weight: 600; color: var(--ink-2); }

        .sheet-link {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px;
          background: var(--bg);
          border-radius: 10px;
          font-size: 12.5px;
          color: var(--ink-3);
        }
        .sheet-link-url {
          flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
      `}</style>
    </>
  );
}
window.ShareSheet = ShareSheet;

/* ─── Fallback (데이터 부족시) ─── */
function FallbackInterpretation() {
  return (
    <section className="section" aria-label="결과 본문 fallback">
      <div className="reading">
        <div className="section-eyebrow"><Icon name="alert" size={14} /> 자세히 보기</div>
        <h2 className="section-title">이 결과는 아직 자세한 해석이 준비 중이에요</h2>
        <div className="fb-card">
          <div className="fb-illust" aria-hidden="true">
            <div className="fb-skel s1" />
            <div className="fb-skel s2" />
            <div className="fb-skel s3" />
          </div>
          <h3 className="fb-h">곧 더 깊은 해석이 추가될 예정이에요</h3>
          <p className="fb-p">
            지금은 위의 요약 카드와 키워드만으로 가볍게 봐 주세요.
            준비가 되면 같은 결과를 받은 분들께 알림으로 알려드릴게요.
          </p>
          <div className="fb-actions">
            <button className="btn btn-secondary btn-sm"><Icon name="message" size={14} /> 업데이트 알림 받기</button>
            <button className="btn btn-ghost btn-sm"><Icon name="share" size={14} /> 그래도 공유하기</button>
          </div>
        </div>
      </div>
      <style>{`
        .fb-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 22px;
          text-align: center;
        }
        @media (min-width: 768px) { .fb-card { padding: 40px 32px; } }
        .fb-illust {
          width: 220px; margin: 0 auto 22px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .fb-skel {
          height: 12px; border-radius: 6px;
          background: linear-gradient(90deg, var(--line-soft), #fff, var(--line-soft));
          background-size: 200% 100%;
          animation: fbshim 1.6s ease-in-out infinite;
        }
        .fb-skel.s1 { width: 100%; }
        .fb-skel.s2 { width: 80%; margin: 0 auto; }
        .fb-skel.s3 { width: 60%; margin: 0 auto; }
        @keyframes fbshim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .fb-h { font-size: 18px; font-weight: 800; color: var(--ink-1); letter-spacing: -0.02em; margin: 0 0 8px; }
        .fb-p { font-size: 14.5px; color: var(--ink-3); line-height: 1.7; margin: 0 0 18px; max-width: 420px; margin-left: auto; margin-right: auto; }
        .fb-actions { display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
      `}</style>
    </section>
  );
}
window.FallbackInterpretation = FallbackInterpretation;
