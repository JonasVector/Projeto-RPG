import { getAllCharacters, getSystemList } from "@/lib/characters";
import { getAllPlayers } from "@/lib/players";
import { getSystem } from "@/lib/systems";
import DashboardClient from "@/components/home/DashboardClient";

export default function Home() {
  const characters = getAllCharacters();
  const systemIds = getSystemList();
  const players = getAllPlayers();

  // Summary stats
  const stats = {
    totalSheets: characters.length,
    totalPlayers: players.length,
    totalSystems: systemIds.length,
    activeSystems: systemIds.filter((s) =>
      characters.some((c) => c.system === s)
    ).length,
  };

  // Recent sheets: last 6 from all characters (preserving order)
  const recentSheets = [...characters].slice(-6).reverse().map((c) => ({
    id: c.id,
    name: c.name,
    system: c.system,
    systemLabel: getSystem(c.system).label,
    systemAccent: getSystem(c.system).accent,
    class: c.class,
    race: c.race,
    level: c.level,
    href: `/sistemas-de-rpg/${c.system}/personagens/${c.id}`,
  }));

  // Systems with counts
  const systemsData = systemIds.map((s) => {
    const meta = getSystem(s);
    const count = characters.filter((c) => c.system === s).length;
    return { ...meta, count };
  });

  // Players with character counts per system
  const playersData = players.map((p) => ({
    id: p.id,
    displayName: p.displayName,
    role: p.role,
    totalCharacters: p.stats.totalCharacters,
    primarySystem: p.stats.primarySystem,
    activeSince: p.activeSince,
  }));

  return (
    <DashboardClient
      stats={stats}
      recentSheets={recentSheets}
      systems={systemsData}
      players={playersData}
    />
  );
}
