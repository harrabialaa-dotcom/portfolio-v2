# Alaa Harrabi — Portfolio v2

## Quick Start

```powershell
# 1. Extract the zip (if not done yet)
Expand-Archive -Path ~\Downloads\portfolio-v2-enhanced.zip -DestinationPath ~\Desktop\

# 2. Navigate into the folder
cd ~\Desktop\portfolio-v2

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

## What's included

| Component | Description |
|-----------|-------------|
| `Hero` | Particle canvas, typewriter, floating stat cards |
| `About` | Bio, values grid, tech marquee |
| `Projects` | Featured Badge System with screenshot gallery + 5 other projects |
| `Skills` | Animated skill bars (3 groups) |
| `Timeline` | Career & education vertical timeline |
| `Contact` | Social links + contact form |
| `Header` | Sticky frosted-glass nav with active tracking |
| `Cursor` | Custom gold cursor with smooth lerp |

## Badge Form (calm background)

The file `public/badge-form-calm.html` is the updated Valeo badge correction form
with a deep navy background instead of black. Open it directly in any browser — no server needed.

## Customization

- **Your info**: Edit name/email/links in each component
- **Screenshots**: Replace files in `public/screenshots/` (keep same filenames)
- **Colors**: CSS variables in `app/globals.css` under `:root`
- **Projects**: Edit the `PROJECTS` array in `components/Projects.tsx`
