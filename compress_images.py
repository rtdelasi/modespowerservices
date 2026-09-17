import os
from PIL import Image

IMAGE_DIR = r"c:\Websites\CascadeProjects\modespowerservices\images"
MAX_SIZE = (1600, 1600)  # Max width/height
QUALITY = 82  # Target JPEG quality (highly optimized but good visual quality)

def compress_image(file_path):
    try:
        original_size = os.path.getsize(file_path)
        
        # Open the image
        with Image.open(file_path) as img:
            # Check format
            img_format = img.format
            if img_format not in ['JPEG', 'PNG']:
                # If it doesn't match PIL's identified JPEG/PNG, look at file extension
                ext = os.path.splitext(file_path)[1].lower()
                if ext in ['.jpg', '.jpeg']:
                    img_format = 'JPEG'
                elif ext == '.png':
                    img_format = 'PNG'
                else:
                    print(f"Skipping unknown format: {file_path}")
                    return 0, 0

            # Convert RGBA to RGB for JPEG saving
            if img_format == 'JPEG' and img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3]) # 3 is alpha channel
                img = background
            elif img_format == 'JPEG' and img.mode != 'RGB':
                img = img.convert('RGB')
                
            # Resize if dimensions are larger than MAX_SIZE
            width, height = img.size
            if width > MAX_SIZE[0] or height > MAX_SIZE[1]:
                img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                print(f"Resized {os.path.basename(file_path)}: {width}x{height} -> {img.size[0]}x{img.size[1]}")
            
            # Save the compressed image back in-place
            if img_format == 'JPEG':
                img.save(file_path, 'JPEG', quality=QUALITY, optimize=True)
            elif img_format == 'PNG':
                # PNG optimization: if image mode is RGB/RGBA, we can optimize it
                # For PNGs that are photos (heavy), we check if we can compress them as palette if they don't have transparency
                if img.mode in ('RGBA', 'RGB'):
                    # Save with optimize=True
                    img.save(file_path, 'PNG', optimize=True)
                else:
                    img.save(file_path, 'PNG', optimize=True)
                    
        new_size = os.path.getsize(file_path)
        reduction = original_size - new_size
        reduction_pct = (reduction / original_size) * 100 if original_size > 0 else 0
        
        if reduction > 0:
            print(f"Compressed {os.path.basename(file_path)}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB (-{reduction_pct:.1f}%)")
        else:
            print(f"No size reduction for {os.path.basename(file_path)}: currently {original_size/1024:.1f}KB")
            
        return original_size, new_size
    except Exception as e:
        print(f"Error compressing {file_path}: {e}")
        return 0, 0

def main():
    print("Starting image compression script...")
    total_original = 0
    total_new = 0
    files_processed = 0
    
    for root, dirs, files in os.walk(IMAGE_DIR):
        # Skip thumbnails directories if we don't want to double-process,
        # but here we want to compress everything
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                file_path = os.path.join(root, file)
                orig, new = compress_image(file_path)
                if orig > 0:
                    total_original += orig
                    total_new += new
                    files_processed += 1
                    
    print("\n--- Compression Summary ---")
    print(f"Total files processed: {files_processed}")
    print(f"Total original size: {total_original/1024/1024:.2f} MB")
    print(f"Total compressed size: {total_new/1024/1024:.2f} MB")
    saved = total_original - total_new
    saved_pct = (saved / total_original) * 100 if total_original > 0 else 0
    print(f"Total space saved: {saved/1024/1024:.2f} MB (-{saved_pct:.1f}%)")

if __name__ == "__main__":
    main()
