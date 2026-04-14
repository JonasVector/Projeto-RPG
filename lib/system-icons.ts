import Image from "next/image";

// Mapping of system IDs to their corresponding PNG icon files
export const SYSTEM_PNG_ICONS: Record<string, string> = {
  dnd: "/icons/D&DIcon.png",
  daggerheart: "/icons/Daggerheart_logo_2024.png",
  vampiro: "/icons/VampiroIcon.png",
  candela: "/icons/CandelaIcon.png",
  sacramento: "/icons/SacramentoIcon.png",
  avatar: "/icons/AvatarIcon.png",
};

// Function to get the icon component for a system
export function getSystemIcon(systemId: string, size: number = 24, className?: string) {
  const iconPath = SYSTEM_PNG_ICONS[systemId];

  if (iconPath) {
    return (
      <Image
        src={iconPath}
        alt={`${systemId} icon`}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
      />
    );
  }

  // Fallback to the existing system icon if no PNG is available
  const { getSystem } = require("@/lib/systems");
  const system = getSystem(systemId);
  return <span className={className}>{system.icon}</span>;
}

// Function to check if a system has a PNG icon available
export function hasPngIcon(systemId: string): boolean {
  return systemId in SYSTEM_PNG_ICONS;
}