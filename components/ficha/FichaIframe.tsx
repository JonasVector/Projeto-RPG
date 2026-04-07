"use client";

import { useRef, useState } from "react";

interface FichaIframeProps {
  src: string;
}

export default function FichaIframe({ src }: FichaIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  function handleLoad() {
    const iframe = iframeRef.current;
    try {
      if (!iframe?.contentDocument?.body) return;
      setHeight(iframe.contentDocument.body.scrollHeight);
    } catch {
      // cross-origin: mantém altura default
    }
  }

  return (
    <iframe
      ref={iframeRef}
      src={src}
      onLoad={handleLoad}
      sandbox="allow-scripts allow-same-origin"
      style={{
        width: "100%",
        height: `${height}px`,
        border: "none",
        display: "block",
      }}
      title="Ficha de personagem"
    />
  );
}
