# Diamond Suites Crystal River

A full React + TypeScript client and Express + TypeScript server for `diamondsuitescrystalriver.com`.

The site includes:

- An original editorial design for Crystal River using the approved Diamond identity and location photography
- Responsive pages for Home, About, Suites, FAQs, Directory, Contact, Salon Etiquette, Privacy Policy, and 404
- Compact sticky navigation with an accessible mobile menu
- The verified Crystal River professional directory, contact details, and location information
- Contact form API with validation, rate limiting, spam honeypot, and optional SMTP delivery
- Local approved images instead of hotlinks
- GitHub Pages client deployment workflow
- Docker and Render full-stack deployment files

## Folder structure

```text
diamondsuitescrystalriver/
├─ client/                 React + Vite + TypeScript
│  ├─ image-sources/       Archival originals, excluded from deployment
│  ├─ public/images/       Versioned AVIF/WebP delivery assets
│  └─ src/
├─ server/                 Express + TypeScript contact API
├─ .github/workflows/      Validation and GitHub Pages deployment
├─ Dockerfile              Full-stack production image
└─ render.yaml             Render Blueprint
```

## Brand assets

The approved originals are preserved in `client/image-sources`. Responsive, deployment-ready files are generated in `client/public/images/optimized/v1` and delivered through the shared `ResponsiveImage` component.

```text
client/image-sources/DiamondSuitesCrystalRiverLogo.webp
client/image-sources/marblebackground.jpg
client/public/images/optimized/v1/
```

Optimized filenames are versioned. Increment the image version when regenerating a changed source so GitHub Pages and browsers can cache old immutable files without keeping a stale replacement. Vite continues to content-hash JavaScript and CSS bundles. There is no service worker, so HTML and form/API requests are never intercepted by an application cache.

## Local setup

```powershell
cd diamondsuitescrystalriver
npm install
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
npm run dev
```

Open:

- Client: `http://localhost:5173`
- Server health: `http://localhost:4100/health`

The Vite client proxies `/api` and `/health` to the server during local development.

All browser form routes are centralized in `client/src/config/api.ts`. Configure the shared forms API without editing a form component:

```env
VITE_FORMS_API_BASE_URL=https://api.diamondsuitescrystalriver.com
VITE_CONTACT_FORM_ENDPOINT=/api/contact
VITE_INQUIRY_FORM_ENDPOINT=/api/inquiry
VITE_TURNSTILE_SITE_KEY=
```

Only public browser configuration belongs in the client environment. Microsoft Graph authentication, email delivery, recipient routing, and Turnstile secret verification must remain in the API or Azure Function.

## Production build

```powershell
npm run typecheck
npm run build
npm start
```

For `npm start` to serve the built website and API together, set this in `server/.env`:

```env
NODE_ENV=production
SERVE_CLIENT=true
```

## Contact form email

Configure the SMTP values in `server/.env`. SMTP credentials must never be committed.

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-user
SMTP_PASS=your-password
CONTACT_TO=ashley@diamondsuitesocala.com
CONTACT_FROM=website@diamondsuitescrystalriver.com
```

Without SMTP, local development accepts the form and logs a shortened submission to the server console. Production intentionally returns an error until SMTP is configured, preventing leads from disappearing silently.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full custom-domain, GitHub Pages, Render, DNS, and rollback steps.
