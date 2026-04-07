import type { SystemTheme } from "./ThemeProvider";

interface SystemWatermarkProps {
  theme: SystemTheme;
}

export default function SystemWatermark({ theme }: SystemWatermarkProps) {
  if (theme === "dnd") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Medieval cross with ornate ends */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="#8b0000" strokeWidth="2"/>
          <line x1="20" y1="100" x2="180" y2="100" stroke="#8b0000" strokeWidth="2"/>
          <rect x="90" y="10" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="90" y="170" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="10" y="90" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <rect x="170" y="90" width="20" height="20" fill="#8b0000" opacity="0.5"/>
          <circle cx="100" cy="100" r="20" stroke="#8b0000" strokeWidth="1.5" fill="none"/>
          <circle cx="100" cy="100" r="35" stroke="#8b0000" strokeWidth="0.8" fill="none"/>
          {/* Corner flourishes */}
          <line x1="55" y1="55" x2="70" y2="70" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="145" y1="55" x2="130" y2="70" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="55" y1="145" x2="70" y2="130" stroke="#8b0000" strokeWidth="0.8"/>
          <line x1="145" y1="145" x2="130" y2="130" stroke="#8b0000" strokeWidth="0.8"/>
        </svg>
      </div>
    );
  }

  if (theme === "daggerheart") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Geometric diamond chain */}
          <rect x="75" y="20" width="30" height="30" transform="rotate(45 90 35)" stroke="#c24d2c" strokeWidth="1.5" fill="none"/>
          <rect x="75" y="75" width="30" height="30" transform="rotate(45 90 90)" stroke="#c24d2c" strokeWidth="2" fill="none"/>
          <rect x="75" y="130" width="30" height="30" transform="rotate(45 90 145)" stroke="#c24d2c" strokeWidth="1.5" fill="none"/>
          <line x1="90" y1="50" x2="90" y2="70" stroke="#c24d2c" strokeWidth="1"/>
          <line x1="90" y1="110" x2="90" y2="125" stroke="#c24d2c" strokeWidth="1"/>
          {/* Side diamonds */}
          <rect x="20" y="75" width="20" height="20" transform="rotate(45 30 85)" stroke="#c24d2c" strokeWidth="1" fill="none"/>
          <rect x="140" y="75" width="20" height="20" transform="rotate(45 150 85)" stroke="#c24d2c" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    );
  }

  if (theme === "vampiro") {
    return (
      <div className="system-watermark" aria-hidden="true">
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gothic rose — 5 angular petals */}
          <polygon points="90,20 105,60 145,55 115,80 125,120 90,95 55,120 65,80 35,55 75,60" stroke="#8b0000" strokeWidth="1.5" fill="none"/>
          {/* Inner star */}
          <polygon points="90,45 98,70 125,68 103,84 111,110 90,94 69,110 77,84 55,68 82,70" stroke="#8b0000" strokeWidth="0.8" fill="none"/>
          <circle cx="90" cy="82" r="10" stroke="#8b0000" strokeWidth="1" fill="none"/>
          {/* Stem with thorns */}
          <line x1="90" y1="120" x2="90" y2="180" stroke="#8b0000" strokeWidth="1.5"/>
          <line x1="90" y1="145" x2="75" y2="135" stroke="#8b0000" strokeWidth="1"/>
          <line x1="90" y1="160" x2="105" y2="150" stroke="#8b0000" strokeWidth="1"/>
        </svg>
      </div>
    );
  }

  return null;
}
