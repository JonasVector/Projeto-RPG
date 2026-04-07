import fs from "node:fs";
import path from "node:path";
import type { CharacterMetadata, SystemId, DnDCharacter } from "@/types/character";

const CONTENT_DIR = path.join(process.cwd(), "content", "sistemas-de-rpg");

export function getSystemList(): SystemId[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((d) =>
    fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()
  ) as SystemId[];
}

function getCharacterDir(system: string): string {
  return path.join(CONTENT_DIR, system, "characters");
}

export function getAllCharacters(system?: string): CharacterMetadata[] {
  const systems = system ? [system] : getSystemList();
  const characters: CharacterMetadata[] = [];

  for (const sys of systems) {
    const dir = getCharacterDir(sys);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);
        const ficha = data.ficha?.personagem || {};
        characters.push({
          id: file.replace(".json", ""),
          system: sys as SystemId,
          name: ficha.nome || file.replace(".json", ""),
          race: ficha.raca || "Desconhecido",
          class: ficha.classe || "Desconhecido",
          level: ficha.nivel || 1,
        });
      } catch {
        characters.push({
          id: file.replace(".json", ""),
          system: sys as SystemId,
          name: file.replace(".json", ""),
          race: "Erro",
          class: "Erro",
          level: 1,
        });
      }
    }
  }

  return characters;
}

export function getCharacter(
  system: string,
  slug: string
): DnDCharacter | null {
  const dir = getCharacterDir(system);
  const filePath = path.join(dir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as DnDCharacter;
}

export function getCharactersBySystem(system: string): CharacterMetadata[] {
  return getAllCharacters(system);
}

export function saveCharacter(
  system: string,
  slug: string,
  data: DnDCharacter
): void {
  const dir = getCharacterDir(system);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
