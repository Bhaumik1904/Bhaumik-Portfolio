import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath  = path.join(__dirname, '../public/bhaumik.png');
const outputPath = path.join(__dirname, '../public/bhaumik.png');

const THRESHOLD = 30; // tolerance: pixels this close to white become transparent

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8ClampedArray(data);
const { width, height, channels } = info; // channels = 4 (RGBA)

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  // If pixel is close to white, make transparent
  if (r >= 255 - THRESHOLD && g >= 255 - THRESHOLD && b >= 255 - THRESHOLD) {
    pixels[i + 3] = 0; // fully transparent
  }
}

await sharp(pixels, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath + '.tmp.png');

// Replace original
import { renameSync } from 'fs';
renameSync(outputPath + '.tmp.png', outputPath);

console.log('✅ White background removed from bhaumik.png');
