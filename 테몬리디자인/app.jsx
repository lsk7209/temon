// app.jsx — 메인 App, Tweaks, 테마 주입

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "stable",
  "showAd": "reserved",
  "showFallbackDemo": false,
  "stickyHeader": true,
  "showCompactHero": false
}/*EDITMODE-END*/;

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

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useThemeVars(tweaks.theme);

  const [shareOpen, setShareOpen] = React.useState(false);
  const data = window.RESULT_DATA;
  const themes = window.RESULT_THEMES;

  const onShare = () => setShareOpen(true);
  const onRetake = () => {
    // 데모: 살짝 흔들기
    document.querySelector('.hero-title')?.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }, { transform: 'translateY(0)' }],
      { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );
  };
  const onExplore = () => {
    document.getElementById('related-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page">
      {/* 상단바 */}
      <header className="topbar" style={{ position: tweaks.stickyHeader ? 'sticky' : 'static' }}>
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

      <ResultHero
        data={data}
        theme={themes[tweaks.theme]}
        onShare={onShare}
        onRetake={onRetake}
      />

      {/* 광고 슬롯 1 — Hero 아래 */}
      <ResultAdSlot slot="horizontal" demo={tweaks.showAd === 'demo'} />

      <ResultSummaryGrid traits={data.result.traits} />

      {tweaks.showFallbackDemo
        ? <FallbackInterpretation />
        : <ResultInterpretation data={data} />}

      {/* 광고 슬롯 2 — 본문 / 가이드 사이 */}
      <ResultAdSlot slot="rectangle" demo={tweaks.showAd === 'demo'} />

      <ResultActionGuide tips={data.result.actionTips} />

      <ResultCompatibility data={data} />

      <ResultFAQ items={data.result.faq} />

      {/* 광고 슬롯 3 — Related 위 */}
      <ResultAdSlot slot="horizontal" demo={tweaks.showAd === 'demo'} />

      <RelatedTests items={data.related} themes={themes} onPick={onShare} />

      <BottomResultCTA onShare={onShare} onRetake={onRetake} onExplore={onExplore} />

      <Footer />

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

        <TweakSection label="광고 슬롯" />
        <TweakRadio
          label="표시 방식"
          value={tweaks.showAd}
          options={[
            { value: 'reserved', label: '예약' },
            { value: 'demo',     label: '데모' },
          ]}
          onChange={(v) => setTweak('showAd', v)}
        />

        <TweakSection label="결과 본문" />
        <TweakToggle
          label="Fallback (데이터 부족)"
          value={tweaks.showFallbackDemo}
          onChange={(v) => setTweak('showFallbackDemo', v)}
        />

        <TweakSection label="기타" />
        <TweakToggle
          label="상단 바 고정"
          value={tweaks.stickyHeader}
          onChange={(v) => setTweak('stickyHeader', v)}
        />

        <TweakSection label="액션" />
        <TweakButton label="공유 시트 열기" onClick={() => setShareOpen(true)} />
      </TweaksPanel>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <a className="brand" href="#" aria-label="테몬 홈">
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
        .footer-meta { color: var(--ink-4); }
        .footer-links { display: flex; gap: 16px; flex-wrap: wrap; }
        .footer-links a:hover { color: var(--ink-2); }
        @media (min-width: 768px) {
          .footer-inner {
            flex-direction: row; align-items: center; justify-content: space-between;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
