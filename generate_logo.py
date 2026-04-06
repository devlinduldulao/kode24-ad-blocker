from PIL import Image, ImageDraw, ImageFont
import os

size = 300
img = Image.new('RGB', (size, size), color=(41, 128, 185))
d = ImageDraw.Draw(img)

# Draw the exact same shield-like shape from the first turn
points = [(size*0.1, size*0.1), (size*0.9, size*0.1), (size*0.9, size*0.7), (size*0.5, size*0.95), (size*0.1, size*0.7)]
d.polygon(points, fill=(52, 152, 219), outline=(236, 240, 241))

# Try to add text
try:
    font = ImageFont.truetype("Arial.ttf", int(size*0.35))
except:
    font = ImageFont.load_default()
    
d.text((size/2, size/2), "K24", fill=(255,255,255), anchor="mm", font=font)

img.save('logo.png', 'PNG')
print("logo.png generated with size 300x300!")
