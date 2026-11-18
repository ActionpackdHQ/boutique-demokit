# Actionpackd demo kit

Three separate Next.js apps live in this repo. None of them need an account, a database, or an API key.

| Folder | What it is | Live |
| --- | --- | --- |
| `/` | Boutique sales demo kit | https://actionpackd-boutiquedemo.vercel.app/ |
| `realestate-demo/` | Real-estate sales demo kit | https://actionpackd-realestatedemo.vercel.app/ |
| `webinar/` | Student webinar page, Dream it. Bot it. Live. | https://actionpackd-dream-it-bot-it.vercel.app/ |

Run one app at a time. Each one uses port 3000.

## Boutique kit (repo root)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Real-estate kit

```bash
cd realestate-demo
npm install
npm run dev
```

## Webinar

```bash
cd webinar
npm install
npm run dev
```

The one-page PDF sheets are static files in each app's `public/` folder. Rebuild the boutique sheet with `npm run sheet` from the repo root (needs Python, `fpdf2`, and Liberation Sans). Rebuild the real-estate sheet with `python3 realestate-demo/scripts/build-sheet.py`.
