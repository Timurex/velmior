# Velmior image replacement guide

Use these exact paths when replacing the placeholder images so the site layout stays stable.

## Homepage story slider
- `/public/story/harvest.png` -> recommended replacement: `1920x1280` (3:2)
- `/public/story/prep.png` -> recommended replacement: `1920x1280` (3:2)
- `/public/story/pack.png` -> recommended replacement: `1920x1280` (3:2)

These are used in a large responsive slider.
Keep all three at the same aspect ratio.

## Product card / gallery images
### Wild Lapsang Souchong
- `/public/gallery/wild-lapsang-leaf.png` -> `1600x2000` (4:5)
- `/public/gallery/wild-lapsang-cup.png` -> `1600x2000` (4:5)
- `/public/gallery/wild-lapsang-pack.png` -> `1600x2000` (4:5)
- `/public/tea/wild-lapsang.png` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

### Rou Gui
- `/public/gallery/rou-gui-leaf.png` -> `1600x2000` (4:5)
- `/public/gallery/rou-gui-cup.png` -> `1600x2000` (4:5)
- `/public/gallery/rou-gui-pack.png` -> `1600x2000` (4:5)
- `/public/tea/rou-gui.png` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

### Zhengyan Rou Gui
- `/public/gallery/zhengyan-leaf.png` -> `1600x2000` (4:5)
- `/public/gallery/zhengyan-cup.png` -> `1600x2000` (4:5)
- `/public/gallery/zhengyan-pack.png` -> `1600x2000` (4:5)
- `/public/tea/zhengyan-rou-gui.png` -> `1200x1200` (1:1), used for fly-to-cart animation fallback

## Brand assets
- `/public/velmior-logo.svg` -> SVG preferred, square artboard `512x512` or `1024x1024`
- `/public/favicon.svg` -> square SVG, ideally built from the logo symbol only
- `/public/og-image.svg` -> social preview image, recommended source size `1200x630`

## Quick replacement workflow
1. Keep the same file name.
2. Copy the new file over the old one in the same project folder.
3. Commit and push.
4. Vercel redeploys automatically.

Because the file paths stay identical, you do **not** need to open a new project or reconnect GitHub.

## Notes
- For photos, prefer `.png`, `.jpg` or `.webp`.
- Keep file names and aspect ratios consistent to avoid layout shifts.
- WebP is the best choice for final production photos.
