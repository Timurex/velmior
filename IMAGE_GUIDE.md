# Velmior image replacement guide

Use these exact paths when replacing the placeholder images so the site layout stays stable.

## Homepage story slider
- `/public/story/harvest.svg` -> recommended replacement: `1920x1280` (3:2)
- `/public/story/prep.svg` -> recommended replacement: `1920x1280` (3:2)
- `/public/story/pack.svg` -> recommended replacement: `1920x1280` (3:2)

These are used in a large responsive hero-style slider.
Keep all three at the same aspect ratio.

## Product card / hero gallery images
### Wild Lapsang Souchong
- `/public/gallery/wild-lapsang-leaf.svg` -> `1600x2000` (4:5)
- `/public/gallery/wild-lapsang-cup.svg` -> `1600x2000` (4:5)
- `/public/gallery/wild-lapsang-pack.svg` -> `1600x2000` (4:5)
- `/public/tea/wild-lapsang.svg` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

### Rou Gui
- `/public/gallery/rou-gui-leaf.svg` -> `1600x2000` (4:5)
- `/public/gallery/rou-gui-cup.svg` -> `1600x2000` (4:5)
- `/public/gallery/rou-gui-pack.svg` -> `1600x2000` (4:5)
- `/public/tea/rou-gui.svg` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

### Zhengyan Rou Gui
- `/public/gallery/zhengyan-leaf.svg` -> `1600x2000` (4:5)
- `/public/gallery/zhengyan-cup.svg` -> `1600x2000` (4:5)
- `/public/gallery/zhengyan-pack.svg` -> `1600x2000` (4:5)
- `/public/tea/zhengyan-rou-gui.svg` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

## Brand assets
- `/public/velmior-logo.svg` -> SVG preferred, square artboard `512x512` or `1024x1024`

## Notes
- You can replace `.svg` files with `.jpg`, `.jpeg`, `.png` or `.webp`, but then also update the paths in `data/teas.js` and `components/VelmiorStore.jsx` if the extension changes.
- Keep file names and aspect ratios consistent to avoid layout shifts.
- WebP is the best choice for photos on the live site.
