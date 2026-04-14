"use client";

import Image from "next/image";
import { getSystem } from "@/lib/systems";

interface SystemIconProps {
  systemId: string;
  size?: number;
  className?: string;
  fallbackToEmoji?: boolean;
}

export default function SystemIcon({
  systemId,
  size = 24,
  className,
  fallbackToEmoji = true
}: SystemIconProps) {
  // Define the mapping of system IDs to PNG icon paths
  const iconMap: Record<string, string> = {
    dnd: "/icons/D&DIcon.png",
    daggerheart: "/icons/Daggerheart_logo_2024.png",
    vampiro: "/icons/VampiroIcon.png",
    candela: "/icons/CandelaIcon.png",
    sacramento: "/icons/SacramentoIcon.png",
    avatar: "/icons/AvatarIcon.png",
  };

  const iconPath = iconMap[systemId];

  if (iconPath) {
    // Special handling for dark-themed icons that need brightness enhancement
    const isDarkThemedIcon = systemId === 'vampiro' || systemId === 'sacramento';

    return (
      <Image
        src={iconPath}
        alt={`${getSystem(systemId).label} icon`}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          filter: isDarkThemedIcon ? 'brightness(1.3) contrast(1.2)' : 'none',
        }}
      />
    );
  }

  // Fallback to emoji icon if no PNG is available
  if (fallbackToEmoji) {
    const system = getSystem(systemId);
    return <span className={className}>{system.icon}</span>;
  }

  return null;
}