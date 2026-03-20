# Velmior Tea Site v2

Ready-to-run Next.js storefront for IntelliJ IDEA.

## Included
- Homepage with premium catalog
- Product photos on each card
- Individual product pages
- Add-to-cart animation and visible cart drawer
- Cart drawer with quantity controls
- Checkout page with delivery type selection
- EN / RU / HE language switching
- Retail + wholesale prices

## Run
```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project structure
- `app/page.js` — homepage
- `app/product/[slug]/page.js` — product pages
- `app/checkout/page.js` — checkout page
- `data/teas.js` — tea catalog data and copy
- `components/CartContext.jsx` — cart state
- `components/CartDrawer.jsx` — side cart

## Notes
- Current tea images are premium placeholder artwork in SVG format. Replace files in `public/tea/` with real tea photography later.
- Payment is UI-only for now. Real payment provider integration can be added later.
