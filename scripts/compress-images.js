const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../assets');
const outputDir = path.join(__dirname, '../assets-compressed');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function compressImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Calculate new dimensions while maintaining aspect ratio
        // Max width of 1920px for hero images
        const maxWidth = 1920;
        let newWidth = metadata.width;
        let newHeight = metadata.height;
        
        if (metadata.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = Math.round((metadata.height * maxWidth) / metadata.width);
        }

        await image
            .resize(newWidth, newHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 80, // Good balance between quality and size
                progressive: true // Creates a progressive JPEG
            })
            .toFile(outputPath);

        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

        console.log(`Compressed ${path.relative(sourceDir, inputPath)}:`);
        console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Savings: ${savings}%\n`);

    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error);
    }
}

async function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const inputPath = path.join(dir, item);
        const relativePath = path.relative(sourceDir, inputPath);
        const outputPath = path.join(outputDir, relativePath);
        
        if (fs.statSync(inputPath).isDirectory()) {
            // Create corresponding directory in output
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }
            await processDirectory(inputPath);
        } else if (item.match(/\.(jpg|jpeg|png)$/i)) {
            // Create parent directory if it doesn't exist
            const parentDir = path.dirname(outputPath);
            if (!fs.existsSync(parentDir)) {
                fs.mkdirSync(parentDir, { recursive: true });
            }
            await compressImage(inputPath, outputPath);
        }
    }
}

processDirectory(sourceDir).then(() => {
    console.log('Image compression completed!');
    console.log(`Compressed images are saved in: ${outputDir}`);
}).catch(error => {
    console.error('Error during compression:', error);
}); 