import type { SystemTheme } from "./ThemeProvider";

interface SystemSeparatorProps {
  theme: SystemTheme;
}

export default function SystemSeparator({ theme }: SystemSeparatorProps) {
  if (theme === "dnd") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
          <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="22" y="3" width="6" height="6" transform="rotate(45 25 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="30" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="52" y="3" width="6" height="6" transform="rotate(45 55 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="60" y1="6" x2="80" y2="6" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
      </div>
    );
  }

  if (theme === "daggerheart") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
          <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          <line x1="14" y1="6" x2="46" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="50" y="2" width="8" height="8" transform="rotate(45 54 6)" stroke="currentColor" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>
    );
  }

  if (theme === "vampiro") {
    return (
      <div className="separator-rune my-8" aria-hidden="true">
        <svg width="100" height="16" viewBox="0 0 100 16" fill="none">
          <line x1="0" y1="6" x2="30" y2="6" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 1 */}
          <ellipse cx="38" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="38" y1="14" x2="38" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 2 */}
          <ellipse cx="50" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="50" y1="14" x2="50" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          {/* Drop 3 */}
          <ellipse cx="62" cy="8" rx="4" ry="6" stroke="currentColor" strokeWidth="0.7" fill="none"/>
          <line x1="62" y1="14" x2="62" y2="16" stroke="currentColor" strokeWidth="0.7"/>
          <line x1="70" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.7"/>
        </svg>
      </div>
    );
  }

  return null;
}
