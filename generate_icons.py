from PIL import Image, ImageDraw, ImageFont
import os

sizes = [16, 32, 48, 128]
os.makedirs('icons', exist_ok=True)

for size in sizes:
    img = Image.new('RGB', (size, size), color=(41, 128, 185))
    d = ImageDraw.Draw(img)
    # Draw a simple shield-like shape
    points = [(size*0.1, size*0.1), (size*0.9, size*0.1), (size*0.9, size*0.7), (size*0.5, size*0.95), (size*0.1, size*0.7)]
    d.polygon(points, fill=(52, 152, 219), outline=(236, 240, 241))
    
    # Try to add text
    try:
        font = ImageFont.truetype("Arial.ttf", int(size*0.35))
    except:
        font = ImageFont.load_default()
        
    d.text((size/2, size/2), "K24", fill=(255,255,255), anchor="mm", font=font)
    
    img.save(f'icons/icon{size}.jpeg', 'JPEG')

print("Icons generated!")
