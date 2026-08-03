# Deployment guide

There are two supported deployment layouts.

## Recommended: full-stack Docker deployment

This option serves the React website and contact API from the same domain. It avoids cross-domain configuration and keeps React routes working on refresh.

### Render Blueprint

1. Push this project to the `diamondsuitescrystalriver` GitHub repository.
2. In Render, create a new **Blueprint** and select the repository.
3. Render reads `render.yaml` and builds the root `Dockerfile`.
4. Enter the private SMTP values when Render asks for them.
5. Confirm `/health` returns a JSON response with `status: ok`.
6. Add both custom domains in Render:
   - `diamondsuitescrystalriver.com`
   - `www.diamondsuitescrystalriver.com`
7. Update the domain's DNS records using the exact values Render provides.
8. Wait for the certificate to become active, then test every page and submit a contact form.

Do not remove the old hosting records until the new Render URL has been fully tested. DNS can be rolled back by restoring the old records.

### Azure Web App alternative

The same `Dockerfile` can be deployed to Azure Web App for Containers. Set all values from `server/.env.example` as App Service environment variables. Set `WEBSITES_PORT=4100`, `PORT=4100`, and `SERVE_CLIENT=true`.

## Client on GitHub Pages, API hosted separately

This layout is useful as an inexpensive placeholder. GitHub Pages only hosts the React client. The Express server must be deployed separately for the contact form.

### One-time GitHub Pages setup

Before the workflow can deploy:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. In **Settings → Secrets and variables → Actions → Variables**, create:
   - `VITE_FORMS_API_BASE_URL`: the shared forms API origin, such as `https://api.diamondsuitescrystalriver.com`
   - `VITE_CONTACT_FORM_ENDPOINT`: the contact route, such as `/api/contact`
   - `VITE_INQUIRY_FORM_ENDPOINT`: the leasing-inquiry route (use `/api/contact` while the bundled Express server handles both)
   - `VITE_TURNSTILE_SITE_KEY`: an optional public Turnstile site key
5. Push to `main` or manually run **Deploy client to GitHub Pages**.

The workflow creates a `404.html` SPA fallback and publishes `client/dist`. The `client/public/CNAME` file sets the custom domain.

Vite emits content-hashed JavaScript and CSS. Photographs and logos use versioned paths under `images/optimized/v1`, so changed image content must be published under a new version directory. Stable `index.html` and `404.html` reference the current hashed/versioned assets and are not stored by a service worker, allowing each GitHub Pages deployment to replace the application shell without requiring a manual cache clear.

### GitHub Pages DNS

For an apex domain, GitHub Pages commonly uses these four A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www`, create a CNAME pointing to the GitHub Pages host for the account or organization that owns the repository. Use the hostname GitHub displays in **Settings → Pages**.

Remove conflicting A, AAAA, or CNAME records before switching. Keep a copy of the current DNS records for rollback.

### Separate API deployment

Deploy the server with these production values:

```env
NODE_ENV=production
SERVE_CLIENT=false
ALLOWED_ORIGINS=https://diamondsuitescrystalriver.com,https://www.diamondsuitescrystalriver.com
```

Add `api.diamondsuitescrystalriver.com` as the server's custom domain, then set `VITE_FORMS_API_BASE_URL` to that HTTPS origin and redeploy Pages. Microsoft Graph tenant IDs, client secrets, access tokens, recipient routing, and Turnstile secret keys belong only in the API or Azure Function environment; they must never be added to the client variables above.

## Git commands

```powershell
git init
git add .
git commit -m "Build Diamond Suites Crystal River website"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/diamondsuitescrystalriver.git
git push -u origin main
```

## Pre-launch checklist

- Replace the three logo GIF files and marble background with the final originals.
- Confirm phone numbers and email addresses with the business owner.
- Confirm each professional's booking phone or booking URL.
- Configure SMTP and submit a real test lead.
- Test desktop, mobile, direct route refreshes, and the contact form.
- Confirm Facebook and Instagram links.
- Verify the privacy policy with the business before launch.
- Back up the old website and DNS values before changing the domain.
