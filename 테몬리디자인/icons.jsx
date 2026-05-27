// icons.jsx — 가벼운 인라인 SVG 아이콘 세트 (이모지 회피)
const Icon = ({ name, size = 18, className = '', strokeWidth = 1.7 }) => {
  const s = { width: size, height: size, flex: `0 0 ${size}px` };
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'share':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 3v13M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5" />
        </svg>
      );
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <circle {...p} cx="12" cy="12" r="9" />
          <path {...p} d="m15.5 8.5-2 5-5 2 2-5 5-2z" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3z" />
          <path {...p} d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'alert':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 3 2 21h20L12 3z" />
          <path {...p} d="M12 10v5M12 18v.5" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M5 21c0-9 7-15 16-15 0 9-6 16-15 16h-1v-1z" />
          <path {...p} d="M5 21c4-6 8-9 14-12" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="m5 12 5 5L20 7" />
        </svg>
      );
    case 'chevron':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'link':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
          <path {...p} d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
        </svg>
      );
    case 'download':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 4v12M7 11l5 5 5-5M5 20h14" />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M21 12a8 8 0 1 1-3.3-6.5L21 4l-1.5 3.5A8 8 0 0 1 21 12z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 3v6M12 15v6M3 12h6M15 12h6" />
          <path {...p} d="M12 8.5 13 11l2.5 1L13 13l-1 2.5L11 13 8.5 12 11 11 12 8.5z" />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <circle {...p} cx="9" cy="9" r="3" />
          <circle {...p} cx="17" cy="10" r="2.5" />
          <path {...p} d="M3 19c0-3 3-5 6-5s6 2 6 5M14 19c0-2 2-4 4.5-4s2.5 1.5 2.5 4" />
        </svg>
      );
    case 'spark-small':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path d="M12 2 14 9 21 11 14 13 12 20 10 13 3 11 10 9 12 2Z" fill="currentColor" />
        </svg>
      );
    case 'kakao':
      // 단순화한 말풍선 (브랜드 로고 X)
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M12 4c5 0 9 3 9 7s-4 7-9 7c-1 0-2-.1-2.9-.4L5 19l1-3.2C4.1 14.5 3 13 3 11c0-4 4-7 9-7z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <path {...p} d="M4 4l7 9M20 4l-7 9M4 20l7-7M20 20l-7-7" />
        </svg>
      );
    case 'image':
      return (
        <svg viewBox="0 0 24 24" style={s} className={className}>
          <rect {...p} x="3" y="5" width="18" height="14" rx="2" />
          <circle {...p} cx="9" cy="10" r="1.5" />
          <path {...p} d="m4 18 5-5 4 4 3-3 4 4" />
        </svg>
      );
    default:
      return null;
  }
};

window.Icon = Icon;
