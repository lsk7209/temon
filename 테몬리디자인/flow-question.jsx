// flow-question.jsx — 질문 페이지 + 결과 계산 중 인터스티셜

function QuestionScreen({ questions, current, answers, onAnswer, onPrev, onNext, onClose, onComplete }) {
  const q = questions[current];
  const total = questions.length;
  const progress = ((current + (answers[current] != null ? 1 : 0)) / total) * 100;
  const [autoAdvance, setAutoAdvance] = React.useState(true);
  const [closing, setClosing] = React.useState(false);
  const [transition, setTransition] = React.useState('in'); // 'in' | 'out-left' | 'out-right' | 'in-right'
  const isLast = current === total - 1;

  // v0.6 C3: 키보드 단축키 onboarding — Q1에서만, 한 번 본 사용자에게는 안 띄움
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
  const [showShortcutHint, setShowShortcutHint] = React.useState(false);
  React.useEffect(() => {
    if (current !== 0 || !isDesktop) return;
    try {
      if (localStorage.getItem('temon_seen_q_hint')) return;
    } catch {}
    const t = setTimeout(() => setShowShortcutHint(true), 600);
    const dismiss = setTimeout(() => {
      setShowShortcutHint(false);
      try { localStorage.setItem('temon_seen_q_hint', '1'); } catch {}
    }, 5500);
    return () => { clearTimeout(t); clearTimeout(dismiss); };
  }, [current, isDesktop]);

  const pickAnswer = (idx) => {
    onAnswer(current, idx);
    if (autoAdvance) {
      setTimeout(() => {
        if (isLast) onComplete();
        else animateNext();
      }, 220);
    }
  };

  const animateNext = () => {
    setTransition('out-left');
    setTimeout(() => {
      onNext();
      setTransition('in-right');
      requestAnimationFrame(() => setTransition('in'));
    }, 180);
  };

  const animatePrev = () => {
    if (current === 0) return;
    setTransition('out-right');
    setTimeout(() => {
      onPrev();
      setTransition('in');
    }, 180);
  };

  return (
    <div className="q-page">
      {/* Sticky top */}
      <header className="q-top">
        <div className="q-top-inner">
          <button className="q-top-back" onClick={animatePrev} disabled={current === 0}>
            <Icon name="chevron" size={20} className="q-chev-left" />
          </button>
          <div className="q-progress">
            <div className="q-progress-row">
              <span className="q-progress-count">
                <b>{current + 1}</b>
                <span className="q-progress-sep">/</span>
                <span className="q-progress-total">{total}</span>
              </span>
              <span className="q-progress-axis">{q.axis}</span>
            </div>
            <div className="q-progress-bar">
              <span style={{ width: `${progress}%` }} />
            </div>
            {/* v0.6 B3: 마지막 3문항 마이크로카피 */}
            {total - current <= 3 && answers[current] == null && (
              <div className="q-progress-micro">
                <span className="q-progress-micro-dot" />
                {total - current === 1
                  ? '마지막 문항이에요 · 잘하고 계세요'
                  : `${total - current}문항 남았어요 · 거의 다 왔어요`}
              </div>
            )}
          </div>
          <button className="q-top-close" onClick={() => setClosing(true)} aria-label="닫기">
            <Icon name="x" size={18} />
          </button>
        </div>
      </header>

      <main className={`q-main q-trans-${transition}`}>
        <div className="q-inner">
          {/* v0.6 C4: axis 라벨 — 모바일 숨김 / 데스크톱 툴팁 */}
          <div className="q-axis-label">
            <span className="q-axis-prefix">Q{current + 1}</span>
            <span className="q-axis-sep">·</span>
            <span className="q-axis-name">{q.axis}</span>
            {window.AXIS_DESC && window.AXIS_DESC[q.axis] && (
              <span
                className="q-axis-info"
                tabIndex="0"
                aria-label={`이 질문은 ${q.axis}을 봅니다`}
                data-tip={window.AXIS_DESC[q.axis]}
              >ⓘ</span>
            )}
          </div>
          <h2 className="q-text">
            {q.q.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < q.q.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </h2>
          {q.hint && <p className="q-hint">{q.hint}</p>}

          <div className="q-options">
            {q.options.map((opt, i) => {
              const isSelected = answers[current] === i;
              return (
                <button
                  key={i}
                  className={`q-option ${isSelected ? 'on' : ''}`}
                  onClick={() => pickAnswer(i)}
                >
                  <span className="q-option-dot" />
                  <span className="q-option-body">
                    <span className="q-option-label">{opt.label}</span>
                    {opt.sub && <span className="q-option-sub">{opt.sub}</span>}
                  </span>
                  <span className="q-option-key">{i + 1}</span>
                </button>
              );
            })}
          </div>

          {/* helper: auto-advance toggle */}
          <label className="q-auto">
            <input type="checkbox" checked={autoAdvance} onChange={(e) => setAutoAdvance(e.target.checked)} />
            <span className="q-auto-box"><Icon name="check" size={11} /></span>
            <span className="q-auto-label">선택하면 자동으로 다음 질문</span>
          </label>

          {/* v0.6 C3: 키보드 단축키 onboarding (Q1·데스크톱만) */}
          {showShortcutHint && (
            <div className="q-hint-toast" role="status">
              <span className="q-hint-kbds">
                <kbd>1</kbd>
                <kbd>2</kbd>
                <kbd>3</kbd>
              </span>
              <span className="q-hint-text">숫자 키로 빠르게 답할 수 있어요</span>
              <button className="q-hint-close" onClick={() => {
                setShowShortcutHint(false);
                try { localStorage.setItem('temon_seen_q_hint', '1'); } catch {}
              }} aria-label="닫기">
                <Icon name="x" size={14} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Sticky bottom */}
      <footer className="q-bottom">
        <div className="q-bottom-inner">
          <button
            className="q-btn q-btn-secondary"
            onClick={animatePrev}
            disabled={current === 0}
          >
            <Icon name="chevron" size={18} className="q-chev-left" />
            이전
          </button>
          <button
            className="q-btn q-btn-primary"
            onClick={() => {
              if (answers[current] == null) return;
              if (isLast) onComplete();
              else animateNext();
            }}
            disabled={answers[current] == null}
          >
            {isLast ? '결과 보기' : '다음'}
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </footer>

      {/* close confirm sheet */}
      {closing && (
        <CloseConfirm onCancel={() => setClosing(false)} onConfirm={onClose} progress={current + 1} total={total} />
      )}

      <style>{`
        .q-page {
          min-height: 100dvh;
          background: var(--bg);
          display: flex; flex-direction: column;
        }
        .q-top {
          position: sticky; top: 0; z-index: 10;
          background: rgba(246, 247, 249, 0.92);
          backdrop-filter: saturate(160%) blur(10px);
          -webkit-backdrop-filter: saturate(160%) blur(10px);
          border-bottom: 1px solid var(--line-soft);
        }
        .q-top-inner {
          max-width: 720px; margin: 0 auto;
          padding: 12px 12px;
          display: grid; grid-template-columns: 36px 1fr 36px;
          align-items: center; gap: 12px;
        }
        @media (min-width: 640px) { .q-top-inner { padding: 14px 20px; } }
        .q-top-back, .q-top-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #fff; color: var(--ink-2);
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--line);
          transition: opacity .15s ease;
        }
        .q-top-back:disabled { opacity: 0; pointer-events: none; }
        .q-chev-left { transform: rotate(90deg); }

        .q-progress { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .q-progress-row {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 11.5px;
        }
        .q-progress-count { display: inline-flex; align-items: baseline; gap: 2px; }
        .q-progress-count b {
          font-size: 14px; font-weight: 800; color: var(--ink-1);
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .q-progress-sep { color: var(--ink-5); margin: 0 2px; }
        .q-progress-total {
          color: var(--ink-4); font-weight: 600;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        .q-progress-axis {
          font-size: 11px; font-weight: 700;
          color: var(--theme-700);
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .q-progress-bar {
          height: 8px;
          background: var(--line-soft);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .q-progress-bar > span {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, var(--theme-500), var(--theme-700));
          border-radius: 999px;
          transition: width .35s cubic-bezier(.2,.8,.2,1);
        }
        /* v0.6 A4: 진행의 끝에 작은 광택 하이라이트 */
        .q-progress-bar > span::after {
          content: '';
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 12px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55));
          border-radius: 999px;
        }

        /* v0.6 B3: 마이크로카피 */
        .q-progress-micro {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--theme-700);
          letter-spacing: -0.005em;
          animation: microFadeIn .35s ease;
        }
        .q-progress-micro-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--theme-600);
          box-shadow: 0 0 0 0 color-mix(in oklab, var(--theme-300) 50%, transparent);
          animation: microPulse 1.6s infinite;
        }
        @keyframes microFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes microPulse {
          0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--theme-300) 50%, transparent); }
          70% { box-shadow: 0 0 0 6px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        .q-main {
          flex: 1; padding: 32px 20px 24px;
          display: flex; align-items: flex-start; justify-content: center;
          transition: transform .18s cubic-bezier(.4,.0,.2,1), opacity .18s ease;
        }
        @media (min-width: 768px) { .q-main { padding: 56px 32px 32px; } }
        .q-trans-in    { transform: translateX(0);     opacity: 1; }
        .q-trans-out-left  { transform: translateX(-30px); opacity: 0; }
        .q-trans-out-right { transform: translateX(30px);  opacity: 0; }
        .q-trans-in-right  { transform: translateX(30px);  opacity: 0; }

        .q-inner {
          width: 100%;
          max-width: 560px;
          display: flex; flex-direction: column;
        }

        .q-axis-label {
          font-size: 12px; font-weight: 800;
          color: var(--theme-700);
          letter-spacing: 0.05em; text-transform: uppercase;
          margin-bottom: 14px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .q-axis-prefix { color: var(--ink-3); }
        .q-axis-sep { color: var(--ink-5); }
        .q-axis-name { color: var(--theme-700); }

        /* v0.6 C4: 데스크톱에서만 info 툴팁 노출, 모바일은 axis 자체를 더 조용히 */
        .q-axis-info {
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px;
          font-family: 'Pretendard', sans-serif;
          font-size: 13px; font-weight: 500;
          color: var(--ink-5);
          cursor: help;
          position: relative;
        }
        .q-axis-info:hover, .q-axis-info:focus-visible {
          color: var(--theme-700);
          outline: none;
        }
        .q-axis-info::after {
          content: attr(data-tip);
          position: absolute; left: 50%; bottom: calc(100% + 8px);
          transform: translateX(-50%);
          background: var(--ink-1); color: #fff;
          padding: 7px 11px;
          border-radius: 8px;
          font-family: 'Pretendard', sans-serif;
          font-size: 12px; font-weight: 500;
          text-transform: none; letter-spacing: -0.01em;
          white-space: nowrap;
          opacity: 0; pointer-events: none;
          transition: opacity .15s ease, transform .15s ease;
          z-index: 5;
        }
        .q-axis-info::before {
          content: '';
          position: absolute; left: 50%; bottom: calc(100% + 3px);
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--ink-1);
          opacity: 0;
          transition: opacity .15s ease;
          z-index: 5;
        }
        .q-axis-info:hover::after,
        .q-axis-info:focus-visible::after,
        .q-axis-info:hover::before,
        .q-axis-info:focus-visible::before {
          opacity: 1;
        }
        @media (max-width: 640px) {
          /* 모바일: axis 자체를 더 작고 info 숨김 */
          .q-axis-label { font-size: 11px; opacity: 0.7; }
          .q-axis-info { display: none; }
        }
        .q-text {
          font-size: clamp(24px, 5.5vw, 30px);
          font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.024em;
          line-height: 1.3;
          margin: 0 0 10px;
          text-wrap: balance;
        }
        @media (min-width: 768px) { .q-text { font-size: 34px; } }
        .q-hint {
          font-size: 13.5px; color: var(--ink-4);
          margin: 0 0 28px;
        }

        .q-options {
          display: flex; flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }
        .q-option {
          width: 100%;
          min-height: 64px;
          padding: 14px 16px;
          background: #fff;
          border: 1.5px solid var(--line);
          border-radius: 14px;
          display: grid;
          grid-template-columns: 18px 1fr auto;
          align-items: center;
          gap: 12px;
          text-align: left;
          transition: border-color .15s ease, background .15s ease, transform .08s ease, box-shadow .15s ease;
          position: relative;
        }
        .q-option:hover {
          border-color: color-mix(in oklab, var(--theme-300) 70%, var(--line));
          background: #FCFDFE;
        }
        .q-option:active { transform: scale(0.99); }
        /* v0.6 A4: selected일 때 좌측 아이디어 라인 강조 */
        .q-option.on {
          border-color: var(--theme-600);
          background: var(--theme-50);
          box-shadow:
            inset 4px 0 0 0 var(--theme-600),
            0 0 0 3px color-mix(in oklab, var(--theme-200) 50%, transparent);
        }
        .q-option-dot {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 1.5px solid var(--line);
          background: #fff;
          position: relative;
          transition: background .15s ease, border-color .15s ease;
        }
        .q-option.on .q-option-dot {
          border-color: var(--theme-600);
          background: var(--theme-600);
          box-shadow: inset 0 0 0 3px #fff;
        }
        .q-option-body {
          display: flex; flex-direction: column; gap: 2px; min-width: 0;
        }
        .q-option-label {
          font-size: 15.5px; font-weight: 700;
          color: var(--ink-1);
          letter-spacing: -0.012em;
          line-height: 1.35;
        }
        .q-option.on .q-option-label { color: var(--theme-ink); }
        .q-option-sub {
          font-size: 12.5px; color: var(--ink-4);
          font-weight: 500;
        }
        .q-option.on .q-option-sub { color: var(--theme-700); }
        .q-option-key {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px;
          border-radius: 6px;
          background: var(--bg);
          color: var(--ink-5);
          font-size: 11px; font-weight: 700;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
        }
        @media (max-width: 640px) { .q-option-key { display: none; } }
        .q-option.on .q-option-key { background: rgba(255,255,255,0.6); color: var(--theme-700); }

        /* auto advance */
        .q-auto {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; color: var(--ink-3);
          cursor: pointer;
          align-self: center;
          user-select: none;
        }
        .q-auto input { display: none; }
        .q-auto-box {
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 1.5px solid var(--line);
          background: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          color: transparent;
          transition: all .15s ease;
        }
        .q-auto input:checked + .q-auto-box {
          background: var(--theme-600);
          border-color: var(--theme-600);
          color: #fff;
        }

        /* v0.6 C3: 키보드 힌트 토스트 */
        .q-hint-toast {
          margin-top: 14px;
          align-self: center;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 10px 8px 12px;
          background: var(--ink-1);
          color: #fff;
          border-radius: 99px;
          font-size: 12.5px;
          box-shadow: 0 12px 24px -10px rgba(11,18,32,0.4);
          animation: hintToastIn .35s cubic-bezier(.2,.8,.2,1);
        }
        @keyframes hintToastIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .q-hint-kbds { display: inline-flex; gap: 3px; }
        .q-hint-toast kbd {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          padding: 2px 6px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-bottom: 2px solid rgba(255,255,255,0.4);
          border-radius: 4px;
          line-height: 1;
        }
        .q-hint-text { font-weight: 500; letter-spacing: -0.005em; }
        .q-hint-close {
          width: 22px; height: 22px;
          display: inline-flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          border-radius: 50%;
        }
        .q-hint-close:hover { color: #fff; background: rgba(255,255,255,0.15); }

        .q-bottom {
          position: sticky; bottom: 0;
          background: rgba(246, 247, 249, 0.92);
          backdrop-filter: saturate(160%) blur(10px);
          -webkit-backdrop-filter: saturate(160%) blur(10px);
          border-top: 1px solid var(--line-soft);
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
        .q-bottom-inner {
          max-width: 720px; margin: 0 auto;
          padding: 12px 20px 14px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .q-bottom-inner { grid-template-columns: 1fr 2fr; }
        }
        .q-btn {
          height: 52px;
          border-radius: 14px;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 15.5px; font-weight: 700;
          letter-spacing: -0.012em;
          transition: background .15s ease, opacity .15s ease, transform .08s ease;
        }
        .q-btn:active { transform: translateY(1px); }
        .q-btn-secondary {
          background: #fff; color: var(--ink-2);
          border: 1px solid var(--line);
        }
        .q-btn-secondary:disabled { opacity: 0.45; cursor: not-allowed; }
        .q-btn-secondary:hover:not(:disabled) { background: #FAFBFC; }
        .q-btn-primary {
          background: var(--theme-600); color: #fff;
          box-shadow: 0 8px 20px -12px color-mix(in oklab, var(--theme-600) 70%, transparent);
        }
        .q-btn-primary:hover:not(:disabled) { background: var(--theme-700); }
        .q-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
      `}</style>
    </div>
  );
}

function CloseConfirm({ onCancel, onConfirm, progress, total }) {
  return (
    <>
      <div className="scrim open" onClick={onCancel} />
      <div className="sheet open" style={{ paddingBottom: 28 }}>
        <div className="sheet-handle" />
        <div style={{ padding: '4px 4px 0' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-1)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            지금 나가시면 진행을 잃어요
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: '0 0 18px' }}>
            지금까지 답한 <b style={{ color: 'var(--ink-1)' }}>{progress}/{total} 문항</b>은 잠시 저장되지만, 24시간 후 자동 삭제돼요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button className="btn btn-secondary btn-lg" onClick={onConfirm}>나가기</button>
            <button className="btn btn-primary btn-lg" onClick={onCancel}>계속하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 결과 계산 중 인터스티셜 ─────────────────────────────── */
function CalculatingScreen({ onDone }) {
  const [stage, setStage] = React.useState(0);
  // v0.6 C2: 4단계로 늘려 3.2초 — 광고 인터스티셜 로딩 시간 확보
  const stages = [
    '답변을 모으는 중',
    '12개 선택에서 패턴 추출 중',
    '16가지 유형과 매칭 중',
    '결과 페이지 만드는 중',
  ];

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2300);
    const t4 = setTimeout(() => onDone(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className="calc-page">
      <div className="calc-inner">
        <div className="calc-ring">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line-soft)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none"
              stroke="var(--theme-600)" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="55 200"
              transform="rotate(-90 40 40)">
              <animateTransform attributeName="transform" type="rotate"
                from="-90 40 40" to="270 40 40" dur="1.1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="calc-title">결과 계산 중…</div>
        <div className="calc-stages">
          {stages.map((s, i) => (
            <div key={i} className={`calc-stage ${i <= stage ? 'done' : ''} ${i === stage ? 'now' : ''}`}>
              <span className="calc-stage-dot">
                {i < stage ? <Icon name="check" size={11} /> : null}
              </span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="calc-foot">당신의 패턴을 정리하고 있어요</div>
      </div>

      <style>{`
        .calc-page {
          min-height: 100dvh;
          background:
            radial-gradient(50% 40% at 50% 40%, color-mix(in oklab, var(--theme-50) 80%, white) 0%, transparent 70%),
            var(--bg);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .calc-inner {
          display: flex; flex-direction: column; align-items: center;
          gap: 18px;
          max-width: 320px; text-align: center;
        }
        .calc-ring { color: var(--theme-600); }
        .calc-title {
          font-size: 22px; font-weight: 800; color: var(--ink-1);
          letter-spacing: -0.02em; margin-top: 4px;
        }
        .calc-stages {
          display: flex; flex-direction: column; gap: 10px;
          width: 100%; margin-top: 10px;
        }
        .calc-stage {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          font-size: 13.5px; color: var(--ink-4);
          transition: all .25s ease;
        }
        .calc-stage.done { color: var(--ink-2); }
        .calc-stage.now {
          border-color: var(--theme-600);
          color: var(--theme-ink);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--theme-200) 50%, transparent);
          font-weight: 600;
        }
        .calc-stage-dot {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--line-soft);
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff;
          flex: 0 0 18px;
          transition: background .2s ease;
        }
        .calc-stage.done .calc-stage-dot { background: var(--theme-600); }
        .calc-stage.now .calc-stage-dot {
          background: var(--theme-600);
          animation: calcPulse 1.1s infinite;
        }
        @keyframes calcPulse {
          0% { box-shadow: 0 0 0 0 rgba(8,145,178,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(8,145,178,0); }
          100% { box-shadow: 0 0 0 0 rgba(8,145,178,0); }
        }
        .calc-foot {
          font-size: 13px; color: var(--ink-4);
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}

window.QuestionScreen = QuestionScreen;
window.CalculatingScreen = CalculatingScreen;
