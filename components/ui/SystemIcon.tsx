import Image from "next/image";
import { getSystem } from "@/lib/systems";

interface SystemIconProps {
  systemId: string;
  size?: number;
  className?: string;
  fallbackToEmoji?: boolean;
}

/**
 * Single source for rendering a system's logo.
 * Reads asset + boost flag from lib/systems.ts.
 */
export default function SystemIcon({
  systemId,
  size = 24,
  className,
  fallbackToEmoji = true,
}: SystemIconProps) {
  const system = getSystem(systemId);

  if (system.pngIcon) {
    return (
      <Image
        src={system.pngIcon}
        alt={`${system.label} icon`}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: system.iconNeedsBoost
            ? "brightness(1.55) contrast(1.25) saturate(1.1)"
            : undefined,
        }}
      />
    );
  }

  if (fallbackToEmoji) {
    return <span className={className}>{system.icon}</span>;
  }

  return null;
}
