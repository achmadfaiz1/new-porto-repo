# Achmad Faiz — Portfolio

Minimal black / grey / white one-page portfolio (Vite + React + TypeScript).

## Features

- Sections: Hero, About, Experience, Projects, Skills, Education, Contact
- CV download
- Smooth scroll + floating section arrows
- Live Asia/Jakarta (JKT / WIB) clock
- No visitor counter

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## CV PDF

Preferred local file: `public/Faiz Resume.pdf` (served as `/Faiz%20Resume.pdf`).
Until that binary is committed, the app links to the copy on `faiz-portfolio`.

To add locally:

```bash
mkdir -p public
# copy your CV as: public/Faiz Resume.pdf
```

Then set `PROFILE.cvPath` in `src/data/content.ts` back to `/Faiz%20Resume.pdf`.
