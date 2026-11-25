// One-Sentence Absurd Invention Pitch — make.fun entry
// The pitch: the laugh comes from the invention itself — a toothbrush that
// treats skipped brushing as a custody case — not from a joke bolted on.
// It names the tiny annoyance (skipped brushing), the invention (the
// toothbrush as a litigant) and its silly mechanism (custody + relocation)
// in one tight sentence of 143 characters.
// Gate (from RULES.txt): UTF-8 text, 1-220 characters, not only whitespace.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "A toothbrush that files for custody of your teeth after you skip brushing twice, then moves them into a tiny furnished apartment in your mouth.";

function gateCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 220) {
    throw new Error(`gate: pitch is ${chars} characters, must be 1-220`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: pitch must not be only whitespace");
  }
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("gate: pitch must be exactly one sentence");
  }
}

function main(): void {
  gateCheck(PITCH);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, PITCH, "utf8");
  chmodSync(outPath, 0o644);
  // Read back and re-check so a truncated or mangled write fails loudly.
  const written = readFileSync(outPath, "utf8");
  if (written !== PITCH) {
    throw new Error("verify: read-back differs from pitch");
  }
  gateCheck(written);
}

main();
