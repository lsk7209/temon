// flow-intro.jsx — 인트로 페이지

function IntroScreen({ data, themes, themeId, onStart, onResume, onClose, onPickRelated, referral, savedProgress }) {
  const [showCodeModal, setShowCodeModal] = React.useState(false);
  // v0.6 C1: 실시간 카운터 미세 변동 (±3-8 random walk, 4-7초 간격)
  const [liveCount, setLiveCount] = React.useState(data.test.liveCount);
  const [bump, setBump] = React.useState(null); // '+N' 플래시용
  React.useEffect(() => {
    let id;
    const tick = () => {
      const delta = Math.floor(Math.random() * 16) - 7; // -7 ~ +8
      setLiveCount((prev) => Math.max(800, prev + delta));
      if (delta !== 0) {
        setBump({ value: delta, key: Date.now() });
      }
      id = setTimeout(tick, 3500 + Math.random() * 2500);
    };
    id = setTimeout(tick, 2500);
    return () => clearTimeout(id);
  }, []);
  const t = themes[themeId];

  return (
    <div className="intro-page">
      {/* sticky top */}
      <header className="intro-top">
        <div className="intro-top-inner">
          <span className="intro-cat-pill" style={{ background: t[50], color: t.ink, borderColor: `color-mix(in oklab, ${t[200]} 60%, white)` }}>
            <span className="intro-cat-dot" style={{ background: t[600] }} />
            {data.test.category} 테스트
          </span>
          <button className="intro-close" onClick={onClose} aria-label="닫기">
            <Icon name="x" size={18} />
          </button>
        </div>
      </header>

      <main className="intro-main">
        <div className="intro-inner">

          {/* Hero */}
          <h1 className="intro-title">
            나의 <span className="intro-title-em">선택 패턴</span>,<br />
            2분 만에 확인하기
          </h1>
          <p className="intro-sub">
            결정할 때 나도 모르게 자주 쓰는 방식이 있어요.<br />
            12개의 가벼운 질문으로 한 번 들여다봐요.
          </p>

          {/* Meta */}
          <div className="intro-meta">
            <div className="meta-cell">
              <div className="meta-num">{data.test.questions}</div>
              <div className="meta-lbl">문항</div>
            </div>
            <div className="meta-divider" />
            <div className="meta-cell">
              <div className="meta-num">{data.test.duration.replace('약 ', '')}</div>
              <div className="meta-lbl">예상 시간</div>
            </div>
            <div className="meta-divider" />
            <div className="meta-cell">
              <div className="meta-num">16<span className="meta-num-unit">가지</span></div>
              <div className="meta-lbl">결과 유형</div>
            </div>
          </div>

          {/* Referral card (있을 때만) — v0.6 A2: 친구 키워드 1줄 노출 */}
          {referral && (
            <div className="referral">
              <div className="referral-av" />
              <div className="referral-body">
                <div className="referral-text">
                  <b>{referral.name}</b>님이 받은 결과
                </div>
                <div className="referral-card">
                  <div className="referral-card-band" />
                  <div className="referral-card-body">
                    <div className="referral-card-code">{referral.code}</div>
                    <div className="referral-card-name">
                      {referral.nickname && <span className="referral-card-nick">{referral.nickname}</span>}
                      <span className="referral-card-full">{referral.resultName || referral.nickname}</span>
                    </div>
                    {referral.keywords && referral.keywords.length > 0 && (
                      <div className="referral-card-kw">
                        {referral.keywords.map((k, i) => <span key={i}>{k}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="referral-cta">본인은 어떤 유형일까?</div>
            </div>
          )}

          {/* v0.6 B2: 이어서 하기 — 저장된 답이 있을 때만 */}
          {savedProgress && (
            <div className="resume-card" role="region" aria-label="이어서 하기">
              <div className="resume-card-body">
                <div className="resume-card-label">이어서 하기</div>
                <div className="resume-card-text">
                  <b>{savedProgress.answered}/{savedProgress.total}문항</b>에서 멈추셨어요
                </div>
                <div className="resume-card-bar">
                  <span style={{ width: `${(savedProgress.answered / savedProgress.total) * 100}%` }} />
                </div>
              </div>
              <button className="resume-card-cta" onClick={onResume}>
                이어서
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          )}

          {/* Primary CTA */}
          <button className="intro-cta" onClick={onStart}>
            <span>{savedProgress ? '처음부터 다시 시작' : '시작하기'}</span>
            <Icon name="arrow-right" size={18} />
          </button>

          {/* Live counter — C1 미세 변동 */}
          <div className="intro-live">
            <span className="live-dot" />
            지금 <b className="live-num">{liveCount.toLocaleString()}명</b>이 함께 하고 있어요
            {bump && bump.value !== 0 && (
              <span key={bump.key} className={`live-bump ${bump.value > 0 ? 'up' : 'down'}`}>
                {bump.value > 0 ? '+' : ''}{bump.value}
              </span>
            )}
            <span className="live-sep">·</span>
            <span className="live-total">누적 {(data.test.totalCount / 10000).toFixed(1)}만명 참여</span>
          </div>

          {/* v0.6 A3: 의 코드 입력을 1줄 링크로 축소 */}
          <button className="code-link" onClick={() => setShowCodeModal(true)}>
            <Icon name="link" size={13} />
            받은 결과 코드가 있으세요?
            <span className="code-link-arrow">→</span>
          </button>

          {/* Preview */}
          <div className="intro-preview">
            <div className="intro-preview-label">
              <Icon name="sparkle" size={13} /> 이런 식으로 답해요
            </div>
            <div className="intro-preview-body">
              <div className="intro-preview-axis">Q1 · 선택 패턴</div>
              <div className="intro-preview-q">새로운 식당과 단골집, 더 끌리는 쪽은?</div>
              <div className="intro-preview-opts">
                <div className="prev-opt">새로운 식당이 더 끌려요</div>
                <div className="prev-opt prev-opt-on">단골집이 마음 편해요</div>
                <div className="prev-opt">그때그때 다른 것 같아요</div>
              </div>
            </div>
          </div>

          {/* Friend code input — v0.6 A3으로 제거 (1줄 링크로 대체) */}

          {/* v0.6 B1: SEO 본문 — “이 테스트는 누구에게 좋을까요?” */}
          <section className="intro-seo" aria-labelledby="intro-seo-title">
            <div className="intro-seo-eyebrow">
              <Icon name="message" size={13} /> 시작 전에 알아두면 좋은 것
            </div>
            <h2 id="intro-seo-title" className="intro-seo-title">이 테스트는 누구에게 좋을까요?</h2>

            <div className="intro-seo-list">
              <div className="intro-seo-item">
                <h3>요즘 결정이 자주 흔들리는 분</h3>
                <p>
                  큰 결정을 앞두고 “내가 뭘 기준으로 고르고 있지?” 싶을 때, 평소 내 선택 패턴을 한 번 정리해보는 거울이 돼요.
                  성격 진단이 아니라, 지금의 결정 방식을 비춰주는 가벼운 도구로 봐 주세요.
                </p>
              </div>
              <div className="intro-seo-item">
                <h3>친구·연인과 결이 다른 게 느껴지는 분</h3>
                <p>
                  같은 상황에서 서로 다르게 움직이는 이유를 “맞다/틀리다”가 아니라 “결이 다르다”로 보면 부딪힘이 줄어요.
                  결과 페이지의 호환성 카드를 같이 보면서 가볍게 이야기해 보세요.
                </p>
              </div>
              <div className="intro-seo-item">
                <h3>매번 같은 식당·같은 길만 가는 게 신경 쓰이는 분</h3>
                <p>
                  안정형이라고 해서 답이 아니에요. 결과가 어떻게 나오든 “지금의 나에게 잘 맞는 방식”을 확인하는 게 핵심이에요.
                  결과지에는 그 안에서 살짝 바꿔보면 좋을 한두 가지 팁도 같이 나와요.
                </p>
              </div>
            </div>

            <details className="intro-seo-more">
              <summary>
                <span>이 테스트는 어떻게 만들어졌나요?</span>
                <Icon name="chevron" size={16} />
              </summary>
              <p>
                테몬의 “선택 패턴” 시리즈는 한국 사용자 약 1,200명의 사전 응답을 기반으로 12개의 핵심 질문을 추렸어요.
                MBTI 같은 성격 분류가 아니라 “선택할 때의 행동 축”에만 집중하기 때문에, 같은 사람이 1~2년 단위로 결과가 바뀌어도 자연스러워요.
                전문 임상 도구가 아니므로, 결과는 일상 속 가벼운 참고용으로 사용해 주세요.
              </p>
            </details>
          </section>

          {/* Related tests (3개만) */}
          <div className="intro-related">
            <div className="intro-related-head">
              <span className="intro-related-title">다른 사람들은 이 테스트도 해요</span>
              <a href="#" className="intro-related-more" onClick={(e) => e.preventDefault()}>전체 보기 →</a>
            </div>
            <div className="intro-related-grid">
              {data.related.slice(0, 3).map((it, i) => {
                const rt = themes[it.theme] || themes.stable;
                return (
                  <button key={i} className="intro-related-card" onClick={() => onPickRelated?.(it)}
                          style={{ '--rt-50': rt[50], '--rt-600': rt[600], '--rt-700': rt[700] }}>
                    <div className="rel-emoji">{it.emoji}</div>
                    <div className="rel-body">
                      <div className="rel-cat">{it.cat}</div>
                      <div className="rel-title">{it.title}</div>
                      <div className="rel-meta"><Icon name="people" size={11} /> {it.participants}명</div>
                    </div>
                    <Icon name="arrow-right" size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="intro-footnote">
            © 테몬 · 결과는 가벼운 참고용으로 봐주세요
          </div>
        </div>
      </main>

      {/* v0.6 A3: 코드 입력 모달 */}
      <CodeModal open={showCodeModal} onClose={() => setShowCodeModal(false)} />

      <style>{`
        .intro-page {
          min-height: 100dvh;
          background:
            radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--theme-50) 80%, white) 0%, transparent 70%),
            var(--bg);
          display: flex; flex-direction: column;
        }
        .intro-top {
          position: sticky; top: 0; z-index: 10;
          background: rgba(246, 247, 249, 0.85);
          backdrop-filter: saturate(160%) blur(10px);
          -webkit-backdrop-filter: saturate(160%) blur(10px);
        }
        .intro-top-inner {
          max-width: 720px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
        }
        .intro-cat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          height: 30px; padding: 0 12px;
          border-radius: 999px;
          font-size: 12.5px; font-weight: 700;
          border: 1px solid;
        }
        .intro-cat-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .intro-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #fff; color: var(--ink-2);
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--line);
        }
        .intro-close:hover { background: #FAFBFC; }

        .intro-main { flex: 1; padding: 24px 20px 56px; }
        .intro-inner {
          max-width: 560px; margin: 0 auto;
          display: flex; flex-direction: column;
        }

        .intro-title {
          font-size: clamp(30px, 7vw, 44px);
          line-height: 1.2;
          font-weight: 800;
          color: var(--ink-1);
          letter-spacing: -0.028em;
          margin: 12px 0 12px;
          text-wrap: balance;
        }
        .intro-title-em {
          background: linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--theme-200) 70%, white) 60%);
          padding: 0 4px;
        }
        .intro-sub {
          font-size: 16px; line-height: 1.65; color: var(--ink-3);
          margin: 0 0 26px;
        }
        @media (min-width: 640px) { .intro-sub { font-size: 17px; } }

        .intro-meta {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 10px 8px;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 4px;
          margin-bottom: 18px;
        }
        .meta-cell { text-align: center; padding: 0 8px; }
        /* v0.6 A3: 메타 숫자 압축 — 18px ink-1로 다운 (테마 컬러→잉크) */
        .meta-num {
          font-size: 17px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.018em; line-height: 1.1;
        }
        .meta-num-unit { font-size: 12px; font-weight: 700; margin-left: 2px; color: var(--ink-3); }
        .meta-lbl { font-size: 11px; color: var(--ink-4); margin-top: 3px; font-weight: 500; }
        .meta-divider { width: 1px; height: 20px; background: var(--line-soft); }

        /* referral */
        .referral {
          background: #fff;
          border: 1px solid color-mix(in oklab, var(--theme-200) 70%, var(--line));
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }
        .referral::before {
          content: '';
          position: absolute; left: 0; right: 0; top: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--theme-500), var(--theme-700));
        }
        .referral-av {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #5B21B6);
        }
        .referral-body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .referral-text { font-size: 13px; color: var(--ink-3); }
        .referral-text b { color: var(--ink-1); font-weight: 700; }
        .referral-card {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
        }
        .referral-card-band {
          height: 6px;
          background: linear-gradient(135deg, var(--theme-600), var(--theme-500));
        }
        .referral-card-body { padding: 12px 14px 14px; }
        .referral-card-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          color: var(--ink-4); letter-spacing: 0.06em;
          margin-bottom: 4px;
        }
        .referral-card-name {
          display: flex; flex-direction: column; gap: 2px;
        }
        .referral-card-nick {
          font-size: 18px; font-weight: 900;
          color: var(--theme-700);
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        .referral-card-full {
          font-size: 12.5px; color: var(--ink-3); line-height: 1.4;
          margin-top: 2px;
        }
        .referral-card-kw {
          display: flex; gap: 4px; flex-wrap: wrap;
          margin-top: 10px;
        }
        .referral-card-kw span {
          font-size: 10px; font-weight: 600;
          padding: 2px 6px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 4px;
          color: var(--ink-3);
        }
        .referral-cta {
          grid-column: 1 / -1;
          padding-top: 12px;
          border-top: 1px dashed var(--line);
          font-size: 13px; font-weight: 700; color: var(--theme-700);
          text-align: center;
        }

        /* primary cta */
        .intro-cta {
          height: 60px;
          background: var(--theme-600); color: #fff;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-size: 17px; font-weight: 700; letter-spacing: -0.012em;
          box-shadow: 0 10px 24px -10px color-mix(in oklab, var(--theme-600) 60%, transparent);
          transition: transform .08s ease, background .15s ease;
          margin-bottom: 14px;
          width: 100%;
        }
        .intro-cta:hover { background: var(--theme-700); }
        .intro-cta:active { transform: translateY(1px); }

        .intro-live {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; flex-wrap: wrap;
          font-size: 12.5px; color: var(--ink-3);
          margin-bottom: 14px;
        }

        /* v0.6 A3: 의 코드 링크 */
        .code-link {
          display: inline-flex; align-items: center; gap: 6px;
          align-self: center;
          padding: 8px 14px;
          border-radius: 999px;
          background: transparent;
          color: var(--ink-3);
          font-size: 12.5px; font-weight: 600;
          border: 1px dashed var(--line);
          margin-bottom: 32px;
          transition: border-color .15s ease, color .15s ease, background .15s ease;
        }
        .code-link:hover {
          border-color: var(--theme-300);
          color: var(--theme-700);
          background: var(--theme-50);
        }
        .code-link svg { opacity: 0.7; }
        .code-link-arrow { color: var(--ink-5); font-weight: 700; }
        .intro-live b { color: var(--ink-1); font-weight: 700; }
        .intro-live .live-sep { color: var(--ink-5); }
        .intro-live .live-total { color: var(--ink-4); }

        /* v0.6 C1: 카운터 변화 뜰 */
        .live-num {
          font-variant-numeric: tabular-nums;
          transition: color .25s ease;
        }
        .live-bump {
          display: inline-flex; align-items: center;
          font-size: 11px; font-weight: 800;
          padding: 1px 5px; border-radius: 4px;
          font-variant-numeric: tabular-nums;
          animation: liveBumpFade 2.6s ease forwards;
        }
        .live-bump.up { color: #047857; background: #D1FAE5; }
        .live-bump.down { color: #B91C1C; background: #FEE2E2; }
        @keyframes liveBumpFade {
          0% { opacity: 0; transform: translateY(4px); }
          14% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #10B981;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.45);
          animation: livePulse 1.8s infinite;
        }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        /* preview */
        .intro-preview {
          background: #fff;
          border: 1px dashed color-mix(in oklab, var(--theme-200) 80%, var(--line));
          border-radius: 14px;
          padding: 18px 18px 16px;
          margin-bottom: 22px;
        }
        .intro-preview-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--theme-700);
          margin-bottom: 12px;
        }
        .intro-preview-axis {
          font-size: 11.5px; font-weight: 700; color: var(--ink-4);
          letter-spacing: 0.04em; text-transform: uppercase;
          margin-bottom: 8px;
        }
        .intro-preview-q {
          font-size: 15px; font-weight: 700; color: var(--ink-1);
          letter-spacing: -0.015em;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .intro-preview-opts { display: flex; flex-direction: column; gap: 6px; }
        .prev-opt {
          padding: 10px 12px;
          background: var(--bg);
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--ink-2);
        }
        .prev-opt-on {
          background: var(--theme-50);
          color: var(--theme-ink);
          font-weight: 600;
          border-left: 3px solid var(--theme-600);
        }

        /* code input */
        .code-input {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 16px 18px;
          margin-bottom: 28px;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .code-input.focus {
          border-color: var(--theme-600);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--theme-200) 50%, transparent);
        }
        .code-input-label {
          font-size: 13px; font-weight: 700; color: var(--ink-2);
          margin-bottom: 10px;
        }
        .code-input-row {
          display: flex; align-items: center; gap: 6px;
          background: var(--bg);
          border-radius: 10px;
          padding: 6px;
        }
        .code-input-prefix {
          padding: 0 8px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px; color: var(--ink-4);
          white-space: nowrap;
        }
        .code-input-field {
          flex: 1; min-width: 0;
          background: transparent;
          border: 0; outline: 0;
          height: 36px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 14px; font-weight: 700;
          color: var(--ink-1);
          letter-spacing: 0.05em;
        }
        .code-input-field::placeholder { color: var(--ink-5); }
        .code-input-go {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--theme-600); color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          transition: opacity .15s ease;
        }
        .code-input-go:disabled { opacity: 0.4; cursor: not-allowed; }
        .code-input-hint { font-size: 11.5px; color: var(--ink-4); margin-top: 8px; }

        /* v0.6 B2: 이어서 하기 카드 */
        .resume-card {
          background: #fff;
          border: 1px solid color-mix(in oklab, var(--theme-200) 50%, var(--line));
          border-radius: 14px;
          padding: 12px 12px 12px 16px;
          margin-bottom: 12px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .resume-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--theme-600);
        }
        .resume-card-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .resume-card-label {
          font-size: 10.5px; font-weight: 700;
          color: var(--theme-700); letter-spacing: 0.06em; text-transform: uppercase;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .resume-card-text { font-size: 13.5px; color: var(--ink-2); line-height: 1.35; }
        .resume-card-text b { color: var(--ink-1); font-weight: 800; }
        .resume-card-bar {
          height: 4px; background: var(--line-soft); border-radius: 99px;
          overflow: hidden; margin-top: 4px;
        }
        .resume-card-bar > span {
          display: block; height: 100%;
          background: linear-gradient(90deg, var(--theme-500), var(--theme-700));
          border-radius: 99px;
          transition: width .3s ease;
        }
        .resume-card-cta {
          height: 40px; padding: 0 16px;
          background: var(--theme-600); color: #fff;
          border-radius: 10px;
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13.5px; font-weight: 700;
          letter-spacing: -0.01em;
        }
        .resume-card-cta:hover { background: var(--theme-700); }

        /* v0.6 B1: SEO 본문 섹션 */
        .intro-seo {
          margin: 32px 0 24px;
          padding: 24px 0 4px;
          border-top: 1px solid var(--line-soft);
        }
        .intro-seo-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; font-weight: 700;
          color: var(--theme-700);
          letter-spacing: 0.04em; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .intro-seo-title {
          font-size: 22px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.024em; margin: 0 0 18px;
          line-height: 1.3;
          text-wrap: balance;
        }
        @media (min-width: 640px) {
          .intro-seo-title { font-size: 26px; }
        }
        .intro-seo-list {
          display: flex; flex-direction: column;
          gap: 16px;
        }
        .intro-seo-item {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 16px 18px 18px;
        }
        .intro-seo-item h3 {
          font-size: 15.5px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.018em;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .intro-seo-item p {
          font-size: 14px; line-height: 1.75; color: var(--ink-2);
          margin: 0;
          text-wrap: pretty;
        }
        .intro-seo-more {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          margin-top: 14px;
          overflow: hidden;
        }
        .intro-seo-more summary {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          font-size: 14px; font-weight: 700; color: var(--ink-1);
          letter-spacing: -0.012em;
          list-style: none;
          cursor: pointer;
        }
        .intro-seo-more summary::-webkit-details-marker { display: none; }
        .intro-seo-more summary svg {
          color: var(--ink-4);
          transition: transform .25s ease;
        }
        .intro-seo-more[open] summary svg { transform: rotate(180deg); }
        .intro-seo-more p {
          padding: 0 18px 18px;
          margin: 0;
          font-size: 13.5px; line-height: 1.75; color: var(--ink-3);
          text-wrap: pretty;
        }

        /* related */
        .intro-related { margin-bottom: 32px; }
        .intro-related-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .intro-related-title {
          font-size: 13px; font-weight: 700; color: var(--ink-2);
        }
        .intro-related-more {
          font-size: 12.5px; color: var(--ink-4); font-weight: 600;
        }
        .intro-related-more:hover { color: var(--ink-2); }
        .intro-related-grid {
          display: flex; flex-direction: column; gap: 8px;
        }
        .intro-related-card {
          width: 100%;
          display: grid; grid-template-columns: auto 1fr auto;
          align-items: center; gap: 12px;
          padding: 12px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          text-align: left;
          transition: border-color .15s ease, transform .1s ease;
        }
        .intro-related-card:hover {
          border-color: var(--rt-600);
          transform: translateY(-1px);
        }
        .rel-emoji {
          width: 38px; height: 38px;
          background: var(--rt-50);
          border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .rel-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .rel-cat {
          font-size: 10.5px; font-weight: 700; color: var(--rt-700);
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .rel-title { font-size: 14px; font-weight: 700; color: var(--ink-1); letter-spacing: -0.012em; }
        .rel-meta {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11.5px; color: var(--ink-4); margin-top: 2px;
        }
        .intro-related-card svg { color: var(--ink-5); }

        .intro-footnote {
          text-align: center;
          font-size: 11.5px; color: var(--ink-5);
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
}

window.IntroScreen = IntroScreen;

/* ─── v0.6 A3: 결과 코드 입력 모달 ──────────────────── */
function CodeModal({ open, onClose }) {
  const [code, setCode] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`scrim ${open ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div className={`sheet ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="결과 코드 입력">
        <div className="sheet-handle" />
        <div className="cm-head">
          <div>
            <div className="cm-eyebrow">RESULT CODE</div>
            <div className="cm-title">친구 결과를 바로 보기</div>
          </div>
          <button className="cm-close" onClick={onClose} aria-label="닫기">
            <Icon name="x" size={18} />
          </button>
        </div>

        <p className="cm-desc">
          캡처나 공유로 받은 코드를 입력하면, 친구가 받은 결과 페이지로 바로 이동해요.
          코드는 결과 카드 하단에 적혀 있어요.
        </p>

        <div className="cm-input-row">
          <span className="cm-input-prefix">temon.kr/r/</span>
          <input
            ref={inputRef}
            className="cm-input"
            placeholder="STB-04"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 8))}
          />
        </div>
        <div className="cm-actions">
          <button className="btn btn-secondary btn-lg" onClick={onClose}>취소</button>
          <button
            className="btn btn-primary btn-lg"
            disabled={code.length < 5}
            onClick={() => {
              alert(`데모: ${code}로 이동`);
              onClose();
            }}
          >
            <Icon name="arrow-right" size={16} /> 결과 보러가기
          </button>
        </div>

        <div className="cm-example">
          <span className="cm-example-label">예시</span>
          <span className="cm-example-code">STB-04</span>
          <span className="cm-example-arrow">→</span>
          <span className="cm-example-desc">기준러 · 안정형 결과</span>
        </div>
      </div>

      <style>{`
        .cm-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; margin-bottom: 6px;
        }
        .cm-eyebrow {
          font-size: 11px; font-weight: 800; color: var(--theme-700);
          letter-spacing: 0.06em; text-transform: uppercase;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .cm-title {
          font-size: 19px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.02em; margin-top: 4px;
        }
        .cm-close {
          width: 36px; height: 36px; border-radius: 50%;
          background: #F1F3F7; color: var(--ink-2);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .cm-desc {
          font-size: 13.5px; line-height: 1.65; color: var(--ink-3);
          margin: 6px 0 18px;
        }
        .cm-input-row {
          display: flex; align-items: center; gap: 6px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 6px 6px 6px 12px;
          margin-bottom: 14px;
        }
        .cm-input-row:focus-within {
          border-color: var(--theme-600);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--theme-200) 50%, transparent);
        }
        .cm-input-prefix {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 14px; color: var(--ink-4);
          white-space: nowrap;
        }
        .cm-input {
          flex: 1; min-width: 0;
          background: transparent; border: 0; outline: 0;
          height: 40px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 17px; font-weight: 800;
          color: var(--ink-1);
          letter-spacing: 0.06em;
        }
        .cm-input::placeholder { color: var(--ink-5); letter-spacing: 0.06em; }
        .cm-actions {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 8px;
          margin-bottom: 18px;
        }
        .cm-example {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px;
          background: var(--theme-50);
          border-radius: 10px;
          font-size: 12.5px; color: var(--ink-3);
        }
        .cm-example-label {
          font-size: 10.5px; font-weight: 800;
          color: var(--theme-700); letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cm-example-code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 800; color: var(--ink-1);
          letter-spacing: 0.05em;
        }
        .cm-example-arrow { color: var(--ink-5); }
        .cm-example-desc { color: var(--ink-2); }
      `}</style>
    </>
  );
}

window.CodeModal = CodeModal;
