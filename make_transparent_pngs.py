import os
from PIL import Image

images = [
    ('cadillac_escalade_clean_1791337189959.jpg', 'cadillac_escalade_esv.png'),
    ('gmc_yukon_denali_clean_1791337205343.jpg', 'gmc_yukon_denali_xl.png'),
    ('chevrolet_suburban_clean_1791337223280.jpg', 'chevrolet_suburban_premier.png'),
    ('cadillac_xt6_clean_1791337239278.jpg', 'cadillac_xt6_sport.png'),
    ('cadillac_lyriq_clean_1791337261468.jpg', 'cadillac_lyriq_electric.png'),
]

brain_dir = r"C:\Users\Sharafath\.gemini\antigravity-ide\brain\c560266e-faca-44f1-8087-219dfcc9f1ed"
output_dir = r"c:\Users\Sharafath\Desktop\Website\limo\Limo\public\images\fleet_png"
os.makedirs(output_dir, exist_ok=True)
src_assets_dir = r"c:\Users\Sharafath\Desktop\Website\limo\Limo\src\assets\images"
os.makedirs(src_assets_dir, exist_ok=True)

for src_name, out_name in images:
    src_path = os.path.join(brain_dir, src_name)
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        continue
    
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Clean background thresholding
    for item in datas:
        r, g, b, a = item
        # If pure white / light background
        if r >= 243 and g >= 243 and b >= 243:
            new_data.append((r, g, b, 0))
        elif r >= 234 and g >= 234 and b >= 234:
            # Subtle smooth edge feathering
            alpha = int(((243 - max(r, g, b)) / (243 - 234)) * 255)
            new_data.append((r, g, b, max(0, min(255, alpha))))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Auto-crop transparent boundaries to maximize vehicle display size
    bbox = img.getbbox()
    if bbox:
        w, h = img.size
        pad_x = 24
        pad_y = 16
        crop_box = (
            max(0, bbox[0] - pad_x),
            max(0, bbox[1] - pad_y),
            min(w, bbox[2] + pad_x),
            min(h, bbox[3] + pad_y)
        )
        img = img.crop(crop_box)
        
    out_path = os.path.join(output_dir, out_name)
    img.save(out_path, "PNG")
    img.save(os.path.join(src_assets_dir, out_name), "PNG")
    print(f"Successfully created: {out_name} - Size: {img.size[0]}x{img.size[1]}")

print("All fleet vehicle transparent PNGs created successfully!")
