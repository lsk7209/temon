// flow-app.jsx — 전체 플로우 SPA

const FLOW_TWEAKS = /*EDITMODE-BEGIN*/{
  "theme": "stable",
  "showAd": "reserved",
  "skipQuestions": false,
  "showReferral": true
}/*EDITMODE-END*/;

const STORAGE_KEY = 'temon_flow_demo';

function useThemeVars(themeId) {
  const themes = window.RESULT_THEMES;
  const t = themes[themeId] || themes.stable;
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-50',  t[50]);
    root.style.setProperty('--theme-100', t[100]);
    root.style.setProperty('--theme-200', t[200]);
    root.style.setProperty('--theme-300', t[300]);
    root.style.setProperty('--theme-500', t[500]);
    root.style.setProperty('--theme-600', t[600]);
    root.style.setProperty('--theme-700', t[700]);
    root.style.setProperty('--theme-800', t[800]);
    root.style.setProperty('--theme-ink', t.ink);
  }, [themeId]);
}

function FlowApp() {
  const [tweaks, setTweak] = useTweaks(FLOW_TWEAKS);
  useThemeVars(tweaks.theme);

  const data = window.RESULT_DATA;
  const themes = window.RESULT_THEMES;
  const questions = window.QUIZ_QUESTIONS;

  // 플로우 상태 (localStorage 복원)
  const [screen, setScreen] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.screen || 'intro';
    } catch { return 'intro'; }
  });
  const [currentQ, setCurrentQ] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.currentQ || 0;
    } catch { return 0; }
  });
  const [answers, setAnswers] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.answers || new Array(questions.length).fill(null);
    } catch { return new Array(questions.length).fill(null); }
  });
  const [shareOpen, setShareOpen] = React.useState(false);

  // 저장
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, currentQ, answers }));
  }, [screen, currentQ, answers]);

  // 핸들러
  const handleStart = () => {
    // 진행 중이었으면 그대로, 아니면 처음부터
    if (answers.every(a => a == null)) setCurrentQ(0);
    setScreen('question');
    window.scrollTo(0, 0);
  };
  const handleAnswer = (idx, val) => {
    const next = [...answers];
    next[idx] = val;
    setAnswers(next);
  };
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo(0, 0);
    }
  };
  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleComplete = () => {
    setScreen('loading');
  };
  const handleCalcDone = () => {
    setScreen('result');
    window.scrollTo(0, 0);
  };
  const handleCloseQuiz = () => {
    setScreen('intro');
    window.scrollTo(0, 0);
  };
  const handleRetake = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQ(0);
    setScreen('intro');
    window.scrollTo(0, 0);
  };
  const handleResetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQ(0);
    setScreen('intro');
    setShareOpen(false);
    window.scrollTo(0, 0);
  };
  const handleExploreResults = () => {
    document.getElementById('related-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 데모 referral — v0.6 ②: 친구의 키워드까지 노출
  const referral = tweaks.showReferral
    ? {
        name: '지수',
        code: 'IMP-02',
        nickname: '분위기러',
        resultName: '즉흥적으로 분위기를 여는 유형',
        keywords: ['#분위기메이커', '#즉흥', '#순발력'],
        // 본인이 받은 STB-04(안정형)와의 호환성 정보 — A5에서 활용
        compatibility: 'good',
        compatibilityNote: '당신의 안정감과 지수님의 추진력이 균형을 만들어요.',
      }
    : null;

  const themeData = themes[tweaks.theme];

  return (
    <>
      {/* 상단 디버그 바 (각 화면에서 빠르게 이동) */}
      <DevSwitcher screen={screen} onJump={(s) => {
        if (s === 'question' && answers.every(a => a == null)) {
          // 빈 상태로 질문 점프시 첫 문항부터
          setCurrentQ(0);
        }
        if (s === 'result') {
          // 결과로 점프 시 답변 채워두기 (데모)
          if (answers.some(a => a == null)) {
            setAnswers(questions.map(() => 1));
          }
        }
        setScreen(s);
        window.scrollTo(0, 0);
      }} />

      {screen === 'intro' && (
        <IntroScreen
          data={data}
          themes={themes}
          themeId={tweaks.theme}
          referral={referral}
          savedProgress={
            answers.some(a => a != null) && answers.some(a => a == null)
              ? { current: answers.findIndex(a => a == null), total: questions.length, answered: answers.filter(a => a != null).length }
              : null
          }
          onStart={handleStart}
          onResume={() => {
            const next = answers.findIndex(a => a == null);
            setCurrentQ(next >= 0 ? next : 0);
            setScreen('question');
            window.scrollTo(0, 0);
          }}
          onClose={handleResetAll}
          onPickRelated={() => alert('데모 — 다른 테스트로 이동')}
        />
      )}

      {screen === 'question' && (
        <QuestionScreen
          questions={questions}
          current={currentQ}
          answers={answers}
          onAnswer={handleAnswer}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={handleCloseQuiz}
          onComplete={handleComplete}
        />
      )}

      {screen === 'loading' && (
        <CalculatingScreen onDone={handleCalcDone} />
      )}

      {screen === 'result' && (
        <ResultPageV2
          data={data}
          themes={themes}
          themeId={tweaks.theme}
          showAdDemo={tweaks.showAd === 'demo'}
          referral={referral}
          onShare={() => setShareOpen(true)}
          onRetake={handleRetake}
          onExplore={handleExploreResults}
        />
      )}

      <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} data={data} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="테마 컬러" />
        <TweakSelect
          label="테스트 카테고리"
          value={tweaks.theme}
          options={[
            { value: 'stable',  label: '성향 (안정형) · teal' },
            { value: 'food',    label: '음식 · coral' },
            { value: 'love',    label: '연애 · rose' },
            { value: 'habit',   label: '생활습관 · blue' },
            { value: 'fitness', label: '운동/건강 · green' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />

        <TweakSection label="인트로" />
        <TweakToggle
          label="친구 referral 카드"
          value={tweaks.showReferral}
          onChange={(v) => setTweak('showReferral', v)}
        />

        <TweakSection label="결과 페이지" />
        <TweakRadio
          label="광고 슬롯"
          value={tweaks.showAd}
          options={[
            { value: 'reserved', label: '예약' },
            { value: 'demo',     label: '데모' },
          ]}
          onChange={(v) => setTweak('showAd', v)}
        />

        <TweakSection label="플로우" />
        <TweakButton label="처음부터 다시 (모든 답 초기화)" onClick={handleResetAll} />
        <TweakButton label="공유 시트 열기" onClick={() => setShareOpen(true)} secondary />
      </TweaksPanel>
    </>
  );
}

/* ─── 결과 페이지 v2 (조합) ──────────────────────────── */
function ResultPageV2({ data, themes, themeId, showAdDemo, referral, onShare, onRetake, onExplore }) {
  return (
    <div className="page">
      {/* 상단 바 */}
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#">
            <span className="brand-mark">T</span>
            테몬
          </a>
          <div className="crumbs">
            <span>테스트 결과</span>
            <span className="sep">·</span>
            <span className="here">{data.test.category}</span>
          </div>
        </div>
      </header>

      <ResultHeroV2
        data={data}
        theme={themes[themeId]}
        onShare={onShare}
        onRetake={onRetake}
      />

      {/* v0.6 A5: referral 진입 시 친구 비교 모듈 */}
      {referral && <FriendCompare referral={referral} data={data} />}

      <ResultAdSlot slot="horizontal" demo={showAdDemo} />

      <ResultSummaryGrid traits={data.result.traits} />

      <ResultInterpretation data={data} />

      <ResultAdSlot slot="rectangle" demo={showAdDemo} />

      <ResultActionGuideV2 tips={data.result.actionTips} />

      <ResultCompatibility data={data} />

      {/* v0.6 C6: 같은 유형 익명 한 줄 코멘트 */}
      <SameTypeComments
        resultName={data.result.nickname || data.result.name}
        code={data.result.code}
      />

      <ResultFAQ items={data.result.faq} />

      <ResultAdSlot slot="horizontal" demo={showAdDemo} />

      <RelatedTests items={data.related} themes={themes} onPick={onShare} />

      <BottomResultCTA onShare={onShare} onRetake={onRetake} onExplore={onExplore} />

      <FlowFooter />
    </div>
  );
}

function FlowFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <a className="brand" href="#">
            <span className="brand-mark">T</span>
            테몬
          </a>
          <div className="footer-meta">
            <span>한국 사람이 좋아하는 가벼운 심리테스트 · temon.kr</span>
          </div>
          <div className="footer-links">
            <a href="#">테스트 전체</a>
            <a href="#">결과 보관함</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
          </div>
        </div>
      </div>
      <style>{`
        .footer {
          margin-top: 72px;
          border-top: 1px solid var(--line-soft);
          padding: 32px 0 24px;
          color: var(--ink-4);
        }
        .footer-inner {
          display: flex; flex-direction: column; gap: 12px;
          font-size: 12.5px;
        }
        .footer-links { display: flex; gap: 16px; flex-wrap: wrap; }
        .footer-links a:hover { color: var(--ink-2); }
        @media (min-width: 768px) {
          .footer-inner { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; }
        }
      `}</style>
    </footer>
  );
}

/* ─── Dev / 데모 플로우 스위처 (상단 fixed) ──────────────── */
function DevSwitcher({ screen, onJump }) {
  const screens = [
    { id: 'intro',    label: '① 인트로' },
    { id: 'question', label: '② 질문' },
    { id: 'loading',  label: '③ 계산' },
    { id: 'result',   label: '④ 결과 v2' },
  ];
  return (
    <div className="dev-switcher" data-omelette-chrome="">
      <div className="dev-switcher-label">FLOW</div>
      <div className="dev-switcher-tabs">
        {screens.map((s) => (
          <button
            key={s.id}
            className={`dev-tab ${screen === s.id ? 'on' : ''}`}
            onClick={() => onJump(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <style>{`
        .dev-switcher {
          position: fixed;
          top: 12px; left: 12px;
          z-index: 2147483645;
          background: rgba(11, 18, 32, 0.92);
          backdrop-filter: blur(8px);
          color: #fff;
          border-radius: 10px;
          padding: 4px;
          display: flex; align-items: center; gap: 2px;
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.4);
          font-size: 11px;
        }
        .dev-switcher-label {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.5);
          padding: 0 6px 0 8px;
        }
        .dev-switcher-tabs { display: flex; gap: 2px; }
        .dev-tab {
          padding: 6px 9px;
          border-radius: 7px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.65);
          transition: background .15s ease, color .15s ease;
          white-space: nowrap;
        }
        .dev-tab:hover { color: #fff; }
        .dev-tab.on {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        @media (max-width: 640px) {
          .dev-switcher-label { display: none; }
          .dev-tab { padding: 6px 8px; font-size: 10.5px; }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FlowApp />);
