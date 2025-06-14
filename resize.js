// resize-images.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputFolder = './public';      // your image folder
const outputFolder = './resized';    // resized output folder
const width = 300;                   // target width
const height = 420;                  // target height

// Create output folder if not exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  const inputPath = path.join(inputFolder, file);
  const outputPath = path.join(outputFolder, file);

  // Only process images (jpg, jpeg, png, webp)
  if (/\.(jpe?g|png|webp)$/i.test(file)) {
    sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath)
      .then(() => console.log(`✅ Resized: ${file}`))
      .catch(err => console.error(`❌ Error resizing ${file}:`, err));
  }
});
