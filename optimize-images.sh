#!/bin/bash

# Install ImageMagick if not already installed
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    brew install imagemagick
fi

# Create optimized directory
mkdir -p assets/optimized

# Optimize hero images
echo "Optimizing hero images..."
convert assets/16_9.png -resize 1920x1080 -strip -quality 85 assets/optimized/16_9.png
convert assets/4_3.png -resize 1080x1440 -strip -quality 85 assets/optimized/4_3.png

# Optimize slider images
echo "Optimizing slider images..."
convert assets/SS_Logo.png -resize 300x100 -strip -quality 85 assets/optimized/SS_Logo.png
convert assets/Yawanawa_Slider.png -resize 300x100 -strip -quality 85 assets/optimized/Yawanawa_Slider.png
convert assets/Tumata_Slider.png -resize 300x100 -strip -quality 85 assets/optimized/Tumata_Slider.png

# Optimize other images
echo "Optimizing other images..."
convert assets/Yawanawa.jpg -resize 800x600 -strip -quality 85 assets/optimized/Yawanawa.jpg
convert assets/Tumata.jpg -resize 800x600 -strip -quality 85 assets/optimized/Tumata.jpg

echo "Image optimization complete! Check the assets/optimized directory." 