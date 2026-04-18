/**
 * Extract AcroForm fields from the source PDFs in FichasdeRPG/.
 *
 * For each PDF we dump a JSON descriptor under .planning/pdf-fields/{sistema}.json
 * that the schema-builder (session 3) will consume.
 *
 * Run with:
 *   npx tsx scripts/extract-pdf-fields.ts
 */
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup, PDFOptionList, PDFButton, PDFSignature } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const PDF_ROOT = path.resolve(
  __dirname,
  "..",
  "..",
  "FichasdeRPG",
);
const OUT_DIR = path.resolve(__dirname, "..", ".planning", "pdf-fields");

interface PdfInput {
  sistema: string;
  variant?: string;
  pdfPath: string;
}

const INPUTS: PdfInput[] = [
  { sistema: "dnd",         pdfPath: "D&D 5ed - Ficha Editável.pdf" },
  { sistema: "daggerheart", pdfPath: "Character-Sheets-and-Guides-Daggerheart-May212025.pdf" },
  { sistema: "vampiro",     pdfPath: "VtM V5-Ficha PTBR-Editável.pdf" },
  { sistema: "candela",     pdfPath: "783548931-Candela-Obscura-Ficha-Editavel-Personagem-e-Circulo.pdf" },
  { sistema: "sacramento",  pdfPath: "Ficha Editável - Sacramento RPG (1).pdf" },
];

interface FieldInfo {
  name: string;
  type: string;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  options?: string[];
  isChecked?: boolean;
  defaultValue?: string | string[] | boolean;
}

function classifyField(f: unknown): FieldInfo {
  const field = f as { getName: () => string; constructor: { name: string } };
  const base: FieldInfo = {
    name: field.getName(),
    type: field.constructor.name.replace(/^PDF/, ""),
  };

  if (f instanceof PDFTextField) {
    const max = f.getMaxLength();
    if (max !== undefined) base.maxLength = max;
    if (f.isRequired()) base.required = true;
    if (f.isReadOnly()) base.readOnly = true;
    try {
      const val = f.getText();
      if (val) base.defaultValue = val;
    } catch {
      // Rich-text fields throw; we keep the field name+type and skip the value.
      base.type = "RichTextField";
    }
  } else if (f instanceof PDFCheckBox) {
    base.isChecked = f.isChecked();
  } else if (f instanceof PDFDropdown || f instanceof PDFOptionList) {
    base.options = f.getOptions();
    const selected = f.getSelected();
    if (selected.length) base.defaultValue = selected;
  } else if (f instanceof PDFRadioGroup) {
    base.options = f.getOptions();
    const selected = f.getSelected();
    if (selected) base.defaultValue = selected;
  } else if (f instanceof PDFButton || f instanceof PDFSignature) {
    // no extra info
  }
  return base;
}

async function extractOne(input: PdfInput) {
  const full = path.join(PDF_ROOT, input.pdfPath);
  const bytes = await fs.readFile(full);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = doc.getForm();
  const fields = form.getFields().map(classifyField);

  return {
    sistema: input.sistema,
    source: input.pdfPath,
    pages: doc.getPageCount(),
    fieldCount: fields.length,
    fields,
  };
}

async function extractAvatar() {
  const base = path.join(PDF_ROOT, "FichasAvatarLegends", "Character Sheets");
  const playbooks = await fs.readdir(base, { withFileTypes: true });
  const out: Record<string, unknown>[] = [];

  for (const pb of playbooks) {
    if (!pb.isDirectory()) continue;
    const pbDir = path.join(base, pb.name);
    const files = await fs.readdir(pbDir);
    const fillable = files.find((f) => /FormFillable/i.test(f));
    if (!fillable) continue;

    try {
      const bytes = await fs.readFile(path.join(pbDir, fillable));
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const form = doc.getForm();
      const fields = form.getFields().map(classifyField);
      out.push({
        playbook: pb.name,
        source: path.posix.join("FichasAvatarLegends/Character Sheets", pb.name, fillable),
        pages: doc.getPageCount(),
        fieldCount: fields.length,
        fields,
      });
      console.log(`  • avatar/${pb.name}: ${fields.length} fields`);
    } catch (err) {
      console.warn(`  ! avatar/${pb.name} failed:`, (err as Error).message);
    }
  }
  return {
    sistema: "avatar",
    source: "FichasAvatarLegends/Character Sheets",
    playbookCount: out.length,
    playbooks: out,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const input of INPUTS) {
    try {
      const data = await extractOne(input);
      const outPath = path.join(OUT_DIR, `${input.sistema}.json`);
      await fs.writeFile(outPath, JSON.stringify(data, null, 2), "utf8");
      console.log(`✓ ${input.sistema}: ${data.fieldCount} fields, ${data.pages}p → ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
      console.error(`✗ ${input.sistema}:`, (err as Error).message);
    }
  }

  try {
    const avatar = await extractAvatar();
    const outPath = path.join(OUT_DIR, "avatar.json");
    await fs.writeFile(outPath, JSON.stringify(avatar, null, 2), "utf8");
    console.log(`✓ avatar: ${avatar.playbookCount} playbooks → ${path.relative(process.cwd(), outPath)}`);
  } catch (err) {
    console.error(`✗ avatar:`, (err as Error).message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
