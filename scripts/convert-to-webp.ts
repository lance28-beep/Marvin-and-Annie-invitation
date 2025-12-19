import fs from "fs";
import path from "path";
import sharp from "sharp";

// Directories to convert with their quality and max dimension settings
const CONVERSION_TARGETS = [
  { 
    dir: path.resolve(process.cwd(), "public", "desktop-background"),
    quality: 75,
    maxWidth: 1920,
    maxHeight: 1080
  },
  { 
    dir: path.resolve(process.cwd(), "public", "mobile-background"),
    quality: 75,
    maxWidth: 1080,
    maxHeight: 1920
  },
  { 
    dir: path.resolve(process.cwd(), "public", "Couple_img"),
    quality: 82,
    maxWidth: 1200,
    maxHeight: 1200
  },
  { 
    dir: path.resolve(process.cwd(), "public", "Details"),
    quality: 80,
    maxWidth: 1200,
    maxHeight: 1200
  },
  { 
    dir: path.resolve(process.cwd(), "public", "LoveStory"),
    quality: 80,
    maxWidth: 1200,
    maxHeight: 1200
  },
  { 
    dir: path.resolve(process.cwd(), "public", "gallery"),
    quality: 82,
    maxWidth: 1200,
    maxHeight: 1200
  }
];

const VALID_INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function convertImageToWebp(
  inputPath: string, 
  quality: number = 80,
  maxWidth?: number,
  maxHeight?: number
): Promise<void> {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    return; // skip if already converted
  }

  try {
    let image = sharp(inputPath, { failOn: "none" });
    
    // Resize if dimensions are specified
    if (maxWidth || maxHeight) {
      image = image.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    await image.webp({ quality }).toFile(outputPath);
    
    // Log size reduction
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${path.basename(inputPath)} → ${baseName}.webp (${reduction}% smaller)`);
  } catch (err) {
    console.error(`  ✗ Failed to convert ${path.basename(inputPath)}:`, err);
    throw err;
  }
}

async function convertDirectory(
  dir: string, 
  quality: number,
  maxWidth?: number,
  maxHeight?: number
): Promise<{ converted: number; total: number }> {
  if (!fs.existsSync(dir)) {
    console.log(`⚠ Directory not found: ${dir}`);
    return { converted: 0, total: 0 };
  }

  const entries = fs.readdirSync(dir);
  const targets = entries
    .filter((name) => VALID_INPUT_EXTENSIONS.has(path.extname(name)))
    .map((name) => path.join(dir, name));

  if (targets.length === 0) {
    return { converted: 0, total: 0 };
  }

  console.log(`\n📁 Converting ${targets.length} images in ${path.basename(dir)}...`);

  let converted = 0;
  for (const file of targets) {
    try {
      await convertImageToWebp(file, quality, maxWidth, maxHeight);
      converted += 1;
    } catch (err) {
      // Error already logged in convertImageToWebp
    }
  }

  return { converted, total: targets.length };
}

async function main(): Promise<void> {
  console.log("🖼️  Starting WebP conversion and optimization...\n");
  
  let totalConverted = 0;
  let totalFiles = 0;

  for (const target of CONVERSION_TARGETS) {
    const result = await convertDirectory(
      target.dir, 
      target.quality,
      target.maxWidth,
      target.maxHeight
    );
    totalConverted += result.converted;
    totalFiles += result.total;
  }

  console.log(`\n✨ Done! Converted ${totalConverted}/${totalFiles} images to WebP.`);
  
  if (totalConverted > 0) {
    console.log("\n💡 Next steps:");
    console.log("   1. Update your code to use .webp extensions");
    console.log("   2. Optionally delete the original JPG/PNG files to save space");
    console.log("   3. Test your app to ensure images load correctly");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


