import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
async function files(dir) { const found = []; for (const entry of await readdir(dir, { withFileTypes: true })) { const file = path.join(dir, entry.name); if (entry.isDirectory()) found.push(...await files(file)); else if (entry.name.endsWith('.html')) found.push(file); } return found; }
let checked = 0; const missing = new Set();
for (const file of await files(root)) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    const url = match[1].split('?')[0].replace(/&amp;/g, '&');
    const target = path.join(root, url);
    try { const info = await stat(target); if (info.isDirectory()) await stat(path.join(target, 'index.html')); checked++; }
    catch { missing.add(`${path.relative(root, file)} → ${url}`); }
  }
}
if (missing.size) { console.error([...missing].join('\n')); process.exit(1); }
console.log(`Static export verified: ${checked} local route and asset references, no missing targets.`);
