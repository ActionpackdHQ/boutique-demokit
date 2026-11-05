# Actionpackd demo kit

Mobile-first sales page for Actionpackd. It shows **Agents, Bots, Shops, and Sites**, and links the [Aavarna boutique demo](https://aavarna-boutique.vercel.app/).

No account, database, or API key. Visitors reach the team at +91 733 964 0064, 87543 66890, or [hello.actionpackd.com](https://hello.actionpackd.com).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run lint
npm run build
npm start
```

## Deploy

The app is a Next.js site with files in `public/`. It does not need environment variables.

On Vercel (or any Next.js host):

1. Import this project.
2. Use the Next.js preset. Build command: `npm run build`. Start command: `npm start`.
3. Leave environment variables empty.
4. Deploy.

The one-page sheet is a static file at `/actionpackd-demo-kit.pdf`.

## Regenerate the PDF

Requires Python, `fpdf2`, and Liberation Sans (installed on the machine that builds the sheet).

```bash
pip install fpdf2
npm run sheet
```

## Placeholders

- The 60-second demo plays from `public/actionpackd-demo-video.mp4`. It stays muted until someone presses play.
