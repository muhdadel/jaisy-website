/**
 * GitHub Pages cannot host Next.js Route Handlers. Copy `/api` aside for the
 * static export, then restore it so local `next dev` still has the form.
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const apiDir = join(root, "src", "app", "api");
const backupDir = join(tmpdir(), "jaisy-api-pages-backup");

function parkApi() {
  if (!existsSync(apiDir)) return;
  rmSync(backupDir, { recursive: true, force: true });
  mkdirSync(backupDir, { recursive: true });
  cpSync(apiDir, backupDir, { recursive: true });
  rmSync(apiDir, { recursive: true, force: true });
}

function restoreApi() {
  if (!existsSync(backupDir)) return;
  rmSync(apiDir, { recursive: true, force: true });
  mkdirSync(join(root, "src", "app"), { recursive: true });
  cpSync(backupDir, apiDir, { recursive: true });
  rmSync(backupDir, { recursive: true, force: true });
}

parkApi();

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, GITHUB_PAGES: "true" },
});

restoreApi();

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

writeFileSync(join(root, "out", ".nojekyll"), "");
