/**
 * @deprecated Import from @/lib/systems instead.
 * Kept for backwards compatibility with existing components that haven't been migrated.
 */
import { SYSTEMS } from "@/lib/systems";

export const SYSTEM_LABELS: Record<string, string> = Object.fromEntries(
  Object.values(SYSTEMS).map((s) => [s.id, s.label])
);

export const SYSTEM_ICONS: Record<string, string> = Object.fromEntries(
  Object.values(SYSTEMS).map((s) => [s.id, s.icon])
);
