import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
const assets = JSON.parse(await readFile('scripts/project-assets.json', 'utf8'));
for (const asset of assets.filter(a => !process.argv[2] || a.name.startsWith(process.argv[2]))) {
  const file = `.asset-cache/${asset.name}`;
  const metadata = await sharp(file).metadata();
  await sharp(file).resize({ width: asset.logo ? 500 : asset.diagram ? 2200 : 1600, withoutEnlargement: true }).webp({ quality: asset.logo || asset.diagram ? 95 : 86 }).toFile(`public/images/${asset.name}.webp`);
  console.log(`${asset.name}: ${metadata.width} × ${metadata.height}`);
}
