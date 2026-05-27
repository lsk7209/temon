// flow-result-v2.jsx — v2 결과 페이지 (Hero, ActionGuide, ShareCard만 fork)

/* ─── ResultHeroV2 — 5가지 합의점 ①②③ 반영 ───────────────── */
function ResultHeroV2({ data, theme, onShare, onRetake }) {
  const { test, result } = data;
  const cardRef = React.useRef(null);
  const [showMini, setShowMini] = React.useState(false);

  // ③ Shrinking share badge — share card가 viewport 밖으로 나가면 mini badge 활성
  React.useEffect(() => {
    if (!cardRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowMini(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero v2" aria-labelledby="result-name">
      <div className="container">
        <div className="hero-grid">
          {/* 좌측 */}
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
              {/* ① rarity 정성+숫자 병기 */}
              <span className="rarity-pill">
                <Icon name="sparkle" size={13} />
                <b>{result.rarityLabel}</b>
                <span className="rarity-sep">·</span>
                <span className="rarity-num">{result.rarity}</span>
              </span>
            </div>

            {/* v0.6 A1: Nickname-first 위계 — nickname을 H1, 풀네임은 보조 서브타이틀 */}
            {result.nickname ? (
              <h1 id="result-name" className="hero-title nick-first">
                <span className="hero-nickname">{result.nickname}</span>
                <span className="hero-fullname">{result.name}</span>
              </h1>
            ) : (
              <h1 id="result-name" className="hero-title">{result.name}</h1>
            )}

            <p className="hero-summary">{result.summary}</p>

            {/* v0.6 A6: MBTI disclaimer 톤다운 — 박스 제거, 회색 텍스트 한 줄 */}
            {result.disclaimer && (
              <p className="hero-disclaimer-soft">{result.disclaimer}</p>
            )}

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

          {/* 우측 share card */}
          <div className="hero-right" ref={cardRef}>
            <ShareableResultCardV2 data={data} theme={theme} />
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

      {/* ③ Mini sticky share badge — 본문 진입 시 */}
      <div className={`mini-share ${showMini ? 'on' : ''}`} aria-hidden={!showMini}>
        <button className="mini-share-btn" onClick={onShare}>
          <span className="mini-share-band" />
          <span className="mini-share-body">
            <span className="mini-share-code">{result.code}</span>
            <span className="mini-share-name">{result.nickname || result.name}</span>
          </span>
          <span className="mini-share-icon">
            <Icon name="share" size={16} />
          </span>
        </button>
      </div>

      <style>{`
        .hero.v2 { padding-top: 24px; }
        @media (min-width: 768px) { .hero.v2 { padding-top: 40px; } }

        .hero-grid {
          display: grid; grid-template-columns: 1fr; gap: 24px;
        }
        @media (min-width: 960px) {
          .hero-grid { grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: start; }
        }

        .hero-eyebrow {
          font-size: 14px; font-weight: 500; color: var(--ink-3);
          margin-bottom: 10px;
        }
        .hero-badges {
          display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
          margin-bottom: 14px;
        }
        .rarity-pill {
          display: inline-flex; align-items: center; gap: 6px;
          height: 30px; padding: 0 12px;
          border-radius: 999px;
          background: linear-gradient(180deg, #fff, var(--theme-50));
          color: var(--theme-ink);
          font-size: 12.5px; font-weight: 600;
          border: 1px solid color-mix(in oklab, var(--theme-200) 60%, white);
        }
        .rarity-pill b { font-weight: 800; }
        .rarity-pill .rarity-sep { color: var(--ink-5); }
        .rarity-pill .rarity-num { color: var(--ink-3); }

        .hero-title {
          font-size: clamp(28px, 6vw, 44px);
          line-height: 1.2;
          letter-spacing: -0.028em;
          font-weight: 800;
          color: var(--ink-1);
          margin: 0 0 14px;
          text-wrap: balance;
        }
        @media (min-width: 1024px) { .hero-title { font-size: 50px; } }

        /* v0.6 A1: nickname-first 위계 */
        .hero-title.nick-first {
          display: flex; flex-direction: column;
          gap: 4px;
          margin: 0 0 18px;
        }
        .hero-nickname {
          display: inline-block;
          font-size: clamp(40px, 8.5vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          font-weight: 900;
          color: var(--theme-700);
          background: linear-gradient(180deg, transparent 68%, color-mix(in oklab, var(--theme-200) 80%, white) 68%);
          padding: 0 6px;
          align-self: flex-start;
          text-wrap: balance;
        }
        @media (min-width: 1024px) {
          .hero-nickname { font-size: 68px; }
        }
        .hero-fullname {
          font-size: clamp(17px, 3.4vw, 22px);
          font-weight: 700;
          color: var(--ink-2);
          letter-spacing: -0.018em;
          line-height: 1.4;
          margin-top: 6px;
          text-wrap: balance;
        }

        .hero-summary {
          font-size: 17px;
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0 0 10px;
          max-width: 540px;
          text-wrap: pretty;
        }
        @media (min-width: 768px) {
          .hero-summary { font-size: 19px; line-height: 1.6; }
        }
        /* v0.6 A6: disclaimer 톤다운 — 박스 제거, 단순 회색 텍스트 */
        .hero-disclaimer-soft {
          font-size: 12.5px;
          color: var(--ink-4);
          line-height: 1.55;
          margin: 0 0 22px;
          max-width: 540px;
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
          font-size: 13.5px; font-weight: 600;
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
          display: flex; flex-direction: column; gap: 12px; align-items: stretch;
        }
        @media (min-width: 960px) {
          .hero-right { position: sticky; top: 72px; }
        }
        .card-actions { display: flex; gap: 6px; justify-content: center; }

        /* mini share badge */
        .mini-share {
          position: fixed;
          top: 16px; right: 16px;
          z-index: 50;
          transform: translateY(-100px);
          opacity: 0;
          transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .25s ease;
          pointer-events: none;
        }
        .mini-share.on {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 640px) {
          .mini-share {
            top: auto; bottom: 16px; right: 16px; left: 16px;
            transform: translateY(150%);
          }
          .mini-share.on { transform: translateY(0); }
        }
        .mini-share-btn {
          display: flex; align-items: stretch;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          box-shadow: 0 12px 28px -12px rgba(11,18,32,0.25);
          overflow: hidden;
          transition: transform .15s ease, box-shadow .2s ease;
          padding: 0;
          width: 100%;
        }
        @media (min-width: 641px) {
          .mini-share-btn { max-width: 280px; }
        }
        .mini-share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -14px rgba(11,18,32,0.3);
        }
        .mini-share-band {
          width: 6px;
          background: linear-gradient(180deg, var(--theme-500), var(--theme-700));
          flex: 0 0 6px;
        }
        .mini-share-body {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column;
          justify-content: center; gap: 2px;
          padding: 10px 14px;
          text-align: left;
        }
        .mini-share-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700; color: var(--ink-4);
          letter-spacing: 0.06em;
        }
        .mini-share-name {
          font-size: 14px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.018em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .mini-share-icon {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0 14px;
          background: var(--theme-600); color: #fff;
          border-left: 1px solid var(--line);
        }
      `}</style>
    </section>
  );
}

/* ─── ShareableResultCardV2 — ⑤ nickname + short URL ──────── */
function ShareableResultCardV2({ data, theme }) {
  const { test, result } = data;
  return (
    <div className="share-card v2" role="figure" aria-label="공유용 결과 카드">
      <div className="share-band">
        <div className="share-band-left">
          <span style={{
            width: 14, height: 14, borderRadius: 4, background: '#fff',
            display: 'inline-block', marginRight: 6, verticalAlign: 'middle',
          }} />
          temon.kr · {test.category}
        </div>
        <div className="share-band-right">{result.code}</div>
        <svg className="share-dots" width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="6" cy="6" r="1.4" fill="#fff" />
          <circle cx="18" cy="6" r="1.4" fill="#fff" />
          <circle cx="30" cy="6" r="1.4" fill="#fff" />
          <circle cx="6" cy="18" r="1.4" fill="#fff" />
          <circle cx="18" cy="18" r="1.4" fill="#fff" />
          <circle cx="6" cy="30" r="1.4" fill="#fff" />
        </svg>
      </div>

      <div className="share-body">
        <div className="share-test-name">{test.name}</div>

        {result.nickname && (
          <div className="share-nickname">
            <span className="share-nickname-label">한 마디로</span>
            <span className="share-nickname-pill">{result.nickname}</span>
          </div>
        )}

        <div className="share-result-name">{result.name}</div>
        <div className="share-summary">{result.summary}</div>

        <div className="share-keywords">
          {result.keywords.map((k, i) => (
            <span key={i} className="share-kw">{k}</span>
          ))}
        </div>

        <div className="share-foot">
          <span className="share-url">{result.shareUrl}</span>
          <span className="share-foot-cta">결과 보러가기 →</span>
        </div>
      </div>

      <style>{`
        .share-card.v2 {
          background: #fff;
          border-radius: 18px;
          border: 1px solid var(--line);
          box-shadow: 0 1px 0 rgba(11,18,32,0.04), 0 20px 40px -28px rgba(11,18,32,0.18);
          overflow: hidden;
          position: relative;
        }
        .share-band {
          height: 92px;
          background: linear-gradient(135deg, var(--theme-600), var(--theme-500));
          position: relative;
          display: flex; align-items: flex-end; justify-content: space-between;
          padding: 0 22px 14px;
          color: #fff;
        }
        .share-band-left { font-size: 12px; font-weight: 600; opacity: 0.95; letter-spacing: 0.02em; }
        .share-band-right {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
          background: rgba(255,255,255,0.18);
          padding: 4px 10px; border-radius: 999px;
          backdrop-filter: blur(6px);
        }
        .share-dots { position: absolute; right: 16px; top: 14px; opacity: 0.32; }

        .share-body { padding: 22px 22px 18px; }
        .share-test-name { font-size: 13px; color: var(--ink-4); margin-bottom: 10px; }
        .share-nickname { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .share-nickname-label { font-size: 11px; color: var(--ink-4); font-weight: 600; }
        .share-nickname-pill {
          display: inline-flex; align-items: center;
          padding: 4px 10px;
          background: var(--theme-600); color: #fff;
          border-radius: 7px;
          font-size: 13px; font-weight: 800; letter-spacing: -0.015em;
        }
        .share-result-name {
          font-size: 21px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.025em; line-height: 1.3;
          text-wrap: balance;
        }
        .share-summary {
          margin-top: 10px;
          font-size: 14px; line-height: 1.6; color: var(--ink-3);
          text-wrap: pretty;
        }
        .share-keywords {
          display: flex; gap: 6px; flex-wrap: wrap; margin-top: 16px;
        }
        .share-kw {
          font-size: 12px; font-weight: 600;
          padding: 5px 10px;
          border-radius: 999px;
          background: var(--theme-50);
          color: var(--theme-ink);
          border: 1px solid color-mix(in oklab, var(--theme-200) 60%, white);
        }
        .share-foot {
          margin-top: 18px; padding-top: 14px;
          border-top: 1px dashed var(--line);
          display: flex; align-items: center; justify-content: space-between;
          font-size: 12px; color: var(--ink-4);
        }
        .share-url {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 700; color: var(--theme-700);
          letter-spacing: 0.02em;
        }
        .share-foot-cta { color: var(--ink-3); font-weight: 600; }
      `}</style>
    </div>
  );
}

/* ─── ResultActionGuideV2 — ④ hit target + 라벨 ─────────── */
function ResultActionGuideV2({ tips }) {
  const [checked, setChecked] = React.useState(() => new Set());
  const toggle = (i) => setChecked((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });
  const done = checked.size;

  return (
    <section className="section" aria-labelledby="action-title-v2">
      <div className="reading">
        <div className="section-eyebrow"><Icon name="spark" size={14} /> 공감하면 체크</div>
        <h2 id="action-title-v2" className="section-title">나도 이렇다면 체크</h2>
        <p className="section-desc">
          “오늘 해야 할 일” 말고, 평소 내 모습이라고 느껴지는 것에만 표시해 주세요.
        </p>

        <div className="action-card-v2">
          <ul className="action-list-v2">
            {tips.map((tip, i) => {
              const on = checked.has(i);
              return (
                <li key={i}>
                  {/* 전체 영역 클릭 가능. 체크박스는 시각 단서. */}
                  <button
                    type="button"
                    className={`action-item-v2 ${on ? 'on' : ''}`}
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                  >
                    <span className="action-check-v2" aria-hidden="true">
                      {on && <Icon name="check" size={14} />}
                    </span>
                    <span className="action-text-v2">{tip}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="action-foot-v2">
            <span className="action-progress-v2">
              {done > 0 ? `${done}개 공감` : '내 얘기 같은 게 있다면 하나 골라보세요'}
            </span>
            {done > 0 && (
              <button className="btn btn-ghost btn-sm">
                <Icon name="share" size={14} /> 체크한 거 공유
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .action-card-v2 {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 8px 8px 12px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        @media (min-width: 768px) { .action-card-v2 { padding: 12px 12px 16px; } }
        .action-list-v2 { list-style: none; margin: 0; padding: 0; }
        .action-list-v2 li + li { border-top: 1px solid var(--line-soft); }

        .action-item-v2 {
          width: 100%;
          min-height: 60px;
          display: flex; align-items: center; gap: 14px;
          padding: 16px 12px;
          text-align: left;
          border-radius: 10px;
          transition: background .15s ease;
        }
        @media (min-width: 768px) { .action-item-v2 { padding: 18px 16px; } }
        .action-item-v2:hover { background: #FAFBFC; }
        .action-item-v2.on { background: var(--theme-50); }
        .action-check-v2 {
          width: 26px; height: 26px;
          border-radius: 8px;
          border: 1.5px solid var(--line);
          background: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff;
          transition: all .15s ease;
          flex: 0 0 26px;
        }
        .action-item-v2:hover .action-check-v2 { border-color: var(--theme-300); }
        .action-item-v2.on .action-check-v2 {
          background: var(--theme-600);
          border-color: var(--theme-600);
        }
        .action-text-v2 {
          font-size: 16px;
          line-height: 1.5;
          color: var(--ink-1);
          font-weight: 500;
          letter-spacing: -0.012em;
          flex: 1;
          transition: color .15s ease;
        }
        .action-item-v2.on .action-text-v2 {
          color: var(--theme-ink);
          font-weight: 600;
        }
        .action-foot-v2 {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          padding: 14px 16px 4px;
          margin-top: 6px;
          border-top: 1px dashed var(--line);
        }
        .action-progress-v2 { font-size: 13px; font-weight: 600; color: var(--theme-700); }
      `}</style>
    </section>
  );
}

window.ResultHeroV2 = ResultHeroV2;
window.ShareableResultCardV2 = ShareableResultCardV2;
window.ResultActionGuideV2 = ResultActionGuideV2;

/* ─── v0.6 A5: 친구 결과 비교 모듈 ─────────────────────
   referral로 들어온 사용자의 결과 페이지 hero 아래.
   호환성 데이터를 재사용해서 “지수님 X형 · 당신 Y형 · 잘 맞아요” 노출. */
function FriendCompare({ referral, data }) {
  const myCode = data.result.code;
  const myNickname = data.result.nickname;
  const myName = data.result.name;
  const myKeywords = data.result.keywords;
  const good = referral.compatibility === 'good';

  return (
    <section className="section friend-compare-section" aria-labelledby="fc-title">
      <div className="container">
        <div className="fc-card">
          <div className="fc-head">
            <span className="fc-tag" data-good={good}>
              {good ? '잘 맞는 조합' : '조심하면 좋은 조합'}
            </span>
            <h2 id="fc-title" className="fc-title">
              <b>{referral.name}</b>님과 결과 비교
            </h2>
          </div>

          <div className="fc-pair">
            {/* 친구 */}
            <div className="fc-person">
              <div className="fc-person-label">
                <span className="fc-av" aria-hidden="true" />
                {referral.name}님
              </div>
              <div className="fc-bubble friend">
                <div className="fc-code">{referral.code}</div>
                <div className="fc-nick">{referral.nickname}</div>
                <div className="fc-full">{referral.resultName}</div>
                <div className="fc-kw">
                  {referral.keywords.map((k, i) => <span key={i}>{k}</span>)}
                </div>
              </div>
            </div>

            {/* 연결 */}
            <div className="fc-link" aria-hidden="true">
              <div className={`fc-link-line ${good ? 'good' : 'bad'}`} />
              <div className={`fc-link-badge ${good ? 'good' : 'bad'}`}>
                {good ? (
                  <Icon name="check" size={14} />
                ) : (
                  <Icon name="alert" size={14} />
                )}
              </div>
              <div className={`fc-link-line ${good ? 'good' : 'bad'}`} />
            </div>

            {/* 본인 */}
            <div className="fc-person">
              <div className="fc-person-label">
                <span className="fc-av me" aria-hidden="true" />
                나
              </div>
              <div className="fc-bubble me">
                <div className="fc-code">{myCode}</div>
                <div className="fc-nick">{myNickname}</div>
                <div className="fc-full">{myName}</div>
                <div className="fc-kw">
                  {myKeywords.map((k, i) => <span key={i}>{k}</span>)}
                </div>
              </div>
            </div>
          </div>

          <p className="fc-note">{referral.compatibilityNote}</p>

          <div className="fc-actions">
            <button className="btn btn-secondary btn-sm">
              <Icon name="share" size={14} /> 비교 결과 같이 공유
            </button>
            <a href="#" className="fc-link-more" onClick={(e) => e.preventDefault()}>
              호환성 자세히 보기 <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .friend-compare-section { margin-top: 24px; }
        @media (min-width: 768px) { .friend-compare-section { margin-top: 32px; } }

        .fc-card {
          background: #fff;
          border: 1px solid color-mix(in oklab, var(--theme-200) 50%, var(--line));
          border-radius: 18px;
          padding: 22px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) { .fc-card { padding: 28px 32px; } }
        .fc-card::before {
          content: '';
          position: absolute; left: 0; right: 0; top: 0;
          height: 3px;
          background: linear-gradient(90deg, #7C3AED, var(--theme-600));
        }

        .fc-head {
          display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 18px;
        }
        .fc-tag {
          font-size: 11.5px; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 6px;
          background: var(--theme-50); color: var(--theme-ink);
          align-self: flex-start;
        }
        .fc-tag[data-good="false"] {
          background: #FFF7ED; color: #9A3412;
        }
        .fc-title {
          font-size: 19px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.02em; margin: 0; line-height: 1.3;
        }
        @media (min-width: 768px) { .fc-title { font-size: 22px; } }
        .fc-title b { color: var(--theme-700); font-weight: 800; }

        .fc-pair {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (min-width: 720px) {
          .fc-pair {
            grid-template-columns: 1fr auto 1fr;
            gap: 14px;
            align-items: stretch;
          }
        }

        .fc-person { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .fc-person-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; font-weight: 700; color: var(--ink-3);
          letter-spacing: -0.005em;
        }
        .fc-av {
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #5B21B6);
        }
        .fc-av.me { background: linear-gradient(135deg, var(--theme-500), var(--theme-700)); }

        .fc-bubble {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px 14px 12px;
          flex: 1;
          display: flex; flex-direction: column; gap: 4px;
          min-width: 0;
        }
        .fc-bubble.me {
          background: linear-gradient(180deg, #fff, var(--theme-50));
          border-color: color-mix(in oklab, var(--theme-200) 60%, var(--line));
        }
        .fc-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          color: var(--ink-4); letter-spacing: 0.06em;
        }
        .fc-nick {
          font-size: 18px; font-weight: 900;
          color: var(--ink-1); letter-spacing: -0.025em;
          line-height: 1.15;
        }
        .fc-bubble.me .fc-nick { color: var(--theme-700); }
        .fc-full {
          font-size: 13px; color: var(--ink-3);
          line-height: 1.45;
          margin-top: 2px;
        }
        .fc-kw {
          display: flex; gap: 4px; flex-wrap: wrap;
          margin-top: 8px;
        }
        .fc-kw span {
          font-size: 10.5px; font-weight: 600;
          padding: 2px 7px; border-radius: 4px;
          background: #fff;
          border: 1px solid var(--line);
          color: var(--ink-3);
        }
        .fc-bubble.me .fc-kw span {
          background: rgba(255,255,255,0.7);
          border-color: color-mix(in oklab, var(--theme-200) 60%, white);
          color: var(--theme-ink);
        }

        /* link */
        .fc-link {
          display: flex; flex-direction: row; align-items: center; justify-content: center;
          gap: 6px;
          padding: 4px 0;
        }
        @media (min-width: 720px) {
          .fc-link { flex-direction: column; padding: 0; }
        }
        .fc-link-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, color-mix(in oklab, var(--theme-300) 50%, var(--line)), color-mix(in oklab, var(--theme-300) 50%, var(--line)));
          border-radius: 99px;
        }
        @media (min-width: 720px) {
          .fc-link-line { width: 2px; height: auto; flex: 1; min-height: 24px; background: linear-gradient(180deg, color-mix(in oklab, var(--theme-300) 50%, var(--line)), color-mix(in oklab, var(--theme-300) 50%, var(--line))); }
        }
        .fc-link-line.bad {
          background: linear-gradient(90deg, #FED7AA, #FED7AA);
        }
        @media (min-width: 720px) {
          .fc-link-line.bad { background: linear-gradient(180deg, #FED7AA, #FED7AA); }
        }
        .fc-link-badge {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--theme-600);
          color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px -4px color-mix(in oklab, var(--theme-600) 60%, transparent);
          flex: 0 0 30px;
        }
        .fc-link-badge.bad {
          background: #EA580C;
          box-shadow: 0 4px 12px -4px rgba(234,88,12,0.5);
        }

        .fc-note {
          font-size: 14px; line-height: 1.65;
          color: var(--ink-2);
          background: var(--bg);
          border-radius: 10px;
          padding: 12px 14px;
          margin: 0 0 16px;
        }
        .fc-actions {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          padding-top: 4px;
        }
        .fc-link-more {
          font-size: 12.5px; font-weight: 600;
          color: var(--ink-3);
          display: inline-flex; align-items: center; gap: 4px;
        }
        .fc-link-more:hover { color: var(--theme-700); }
      `}</style>
    </section>
  );
}

window.FriendCompare = FriendCompare;

/* ─── v0.6 C6: 같은 유형 익명 한 줄 코멘트 ─────────────
   결과 페이지 하단. 같은 STB-04를 받은 사람들의 짧은 공감 한 줄.
   체류 시간 + 소속감 ↑. 자기도 한 줄 남기는 인풋 1개 (데모는 alert). */
function SameTypeComments({ resultName, code }) {
  const comments = window.SAME_TYPE_COMMENTS || [];
  const [draft, setDraft] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const submit = (e) => {
    e?.preventDefault?.();
    if (!draft.trim()) return;
    setSubmitted(true);
    setDraft('');
    setTimeout(() => setSubmitted(false), 2400);
  };

  return (
    <section className="section same-type" aria-labelledby="st-title">
      <div className="container">
        <div className="section-eyebrow"><Icon name="people" size={14} /> 같은 유형 사람들</div>
        <h2 id="st-title" className="section-title">{resultName} 받은 사람들의 한 줄</h2>
        <p className="section-desc">정답은 아니지만, 비슷한 결을 가진 사람들이 어떻게 보는지 가볍게 둘러봐요. 익명이에요.</p>

        <ul className="st-list">
          {comments.map((c) => (
            <li key={c.id} className="st-item">
              <span className={`st-av st-av-${c.tint}`}>{c.avatar}</span>
              <div className="st-body">
                <p className="st-text">{c.text}</p>
                <div className="st-meta">
                  <span className="st-time">{c.time}</span>
                  <button className="st-like" type="button" aria-label={`공감 ${c.likes}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{c.likes}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form className={`st-compose ${submitted ? 'submitted' : ''}`} onSubmit={submit}>
          <span className="st-av st-av-me">나</span>
          <input
            type="text"
            className="st-input"
            placeholder={`${code} 받은 분으로서, 한 줄 남겨보세요 (선택)`}
            value={draft}
            maxLength={80}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button className="st-submit" type="submit" disabled={!draft.trim() || submitted}>
            {submitted ? <Icon name="check" size={16} /> : <Icon name="arrow-right" size={16} />}
          </button>
        </form>
        <div className="st-foot">
          익명으로 등록돼요 · 비방·욕설은 자동 삭제됩니다
        </div>
      </div>

      <style>{`
        .same-type { margin-top: 24px; }
        @media (min-width: 768px) { .same-type { margin-top: 36px; } }

        .st-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .st-item {
          display: grid; grid-template-columns: auto 1fr;
          gap: 12px;
          padding: 14px 16px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          transition: border-color .15s ease, transform .08s ease;
        }
        .st-item:hover { border-color: var(--theme-300); }
        .st-av {
          width: 34px; height: 34px;
          border-radius: 50%;
          color: #fff;
          font-weight: 800; font-size: 13px;
          display: inline-flex; align-items: center; justify-content: center;
          flex: 0 0 34px;
          letter-spacing: -0.01em;
        }
        .st-av-a { background: linear-gradient(135deg, #0891B2, #0E7490); }
        .st-av-b { background: linear-gradient(135deg, #7C3AED, #5B21B6); }
        .st-av-c { background: linear-gradient(135deg, #EA580C, #C2410C); }
        .st-av-d { background: linear-gradient(135deg, #DB2777, #9D174D); }
        .st-av-e { background: linear-gradient(135deg, #059669, #047857); }
        .st-av-me { background: linear-gradient(135deg, var(--theme-500), var(--theme-700)); }

        .st-body { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .st-text {
          margin: 0;
          font-size: 14.5px; line-height: 1.55;
          color: var(--ink-1);
          letter-spacing: -0.005em;
          word-break: break-word;
        }
        .st-meta {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          font-size: 11.5px; color: var(--ink-4);
        }
        .st-like {
          display: inline-flex; align-items: center; gap: 4px;
          color: var(--ink-4);
          padding: 4px 8px;
          border-radius: 99px;
          transition: color .15s ease, background .15s ease;
        }
        .st-like:hover {
          color: #DB2777;
          background: #FCE7F3;
        }
        .st-like svg { width: 12px; height: 12px; }

        /* compose */
        .st-compose {
          margin-top: 14px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 99px;
          padding: 6px 6px 6px 16px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 10px;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .st-compose:focus-within {
          border-color: var(--theme-600);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--theme-200) 50%, transparent);
        }
        .st-compose .st-av { width: 28px; height: 28px; font-size: 11.5px; flex: 0 0 28px; }
        .st-input {
          background: transparent; border: 0; outline: 0;
          height: 36px;
          font-size: 14px;
          color: var(--ink-1);
        }
        .st-input::placeholder { color: var(--ink-5); }
        .st-submit {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--theme-600);
          color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          transition: background .15s ease, transform .1s ease;
        }
        .st-submit:hover:not(:disabled) { background: var(--theme-700); }
        .st-submit:disabled { background: var(--line); cursor: not-allowed; }
        .st-compose.submitted .st-submit {
          background: #10B981;
        }
        .st-foot {
          text-align: center;
          font-size: 11.5px; color: var(--ink-4);
          margin-top: 10px;
        }
      `}</style>
    </section>
  );
}

window.SameTypeComments = SameTypeComments;
