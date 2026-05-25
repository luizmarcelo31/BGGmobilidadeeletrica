import { access } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const required = [
  "src/assets/hero-videoinicial.mp4",
  "src/assets/hero-videoprincipal.mp4",
  "src/assets/public/A2.webp",
  "src/assets/public/A3.webp",
  "src/assets/public/A4.webp",
  "src/assets/public/A5.webp",
  "src/assets/public/K06.webp",
  "src/assets/public/brand/bgg-logo.webp",
];

async function exists(rel) {
  try {
    await access(path.join(root, rel));
    return true;
  } catch {
    return false;
  }
}

const missing = [];
for (const rel of required) {
  if (!(await exists(rel))) missing.push(rel);
}

if (missing.length === 0) process.exit(0);

console.warn("[ensure-assets] Arquivos ausentes:", missing.join(", "));

try {
  execSync(`git checkout -- ${missing.map((f) => `"${f}"`).join(" ")}`, {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  console.error(
    "\n[ensure-assets] Não foi possível restaurar via git.\n" +
      "Rode na pasta do projeto:\n" +
      "  git checkout -- src/assets/\n",
  );
  process.exit(1);
}

const stillMissing = [];
for (const rel of missing) {
  if (!(await exists(rel))) stillMissing.push(rel);
}

if (stillMissing.length > 0) {
  console.error("[ensure-assets] Ainda faltam:", stillMissing.join(", "));
  process.exit(1);
}

console.log("[ensure-assets] Assets restaurados.");
