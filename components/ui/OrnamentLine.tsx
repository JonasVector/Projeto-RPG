interface OrnamentLineProps {
  color?: string;
  opacity?: number;
  width?: number;
}

export default function OrnamentLine({
  color = "#c9a227",
  opacity = 0.35,
  width = 220,
}: OrnamentLineProps) {
  const half = width / 2 - 12;
  return (
    <div className="flex items-center justify-center w-full my-3" style={{ opacity }}>
      <svg
        width={width}
        height={14}
        viewBox={`0 0 ${width} 14`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="7" x2={half} y2="7" stroke={color} strokeWidth="0.6" />
        <rect
          x={width / 2 - 5}
          y="2"
          width="10"
          height="10"
          transform={`rotate(45 ${width / 2} 7)`}
          stroke={color}
          strokeWidth="0.6"
          fill="none"
        />
        <line x1={width / 2 + 12} y1="7" x2={width} y2="7" stroke={color} strokeWidth="0.6" />
      </svg>
    </div>
  );
}
