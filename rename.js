import fs from "fs/promises"
import path from "path";

const folderPath = './public'; // adjust if needed
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

(async () => {
  try {
    const files = await fs.readdir(folderPath);
    const imageFiles = files.filter(file =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const ext = path.extname(file);
      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, `img${i + 1}${ext}`);
      await fs.rename(oldPath, newPath);
      console.log(`Renamed ${file} -> img${i + 1}${ext}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
