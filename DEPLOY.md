# Hostinger Deploy — neo.pixswp.com

## Step 1: Build (local)

```bash
npm run deploy:pack
```

Yeh `dist/` build karega aur `neo-deploy.zip` banayega.

## Step 2: Hostinger hPanel

1. Login: https://hpanel.hostinger.com
2. **Websites** → **neo.pixswp.com** → **File Manager**
3. `public_html` folder kholo
4. Purani default files delete karo (`index.html`, `default.php`, etc.)
5. `neo-deploy.zip` upload karo
6. Zip par right-click → **Extract**
7. Zip delete kar do (optional)

## Step 3: Verify

Browser mein kholo: https://neo.pixswp.com

Login page dikhna chahiye.

## Option B: Git Deploy (Hostinger)

1. hPanel → **Git** → Create repository
2. GitHub repo connect karo: `https://github.com/Yogesh283/AI_Neo.git`
3. Build command: `npm install && npm run build`
4. Output directory: `dist`
5. Deploy branch: `main`

## APK (server-linked)

```bash
set CAPACITOR_SERVER_URL=https://neo.pixswp.com
npm run android:build
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Default Hostinger page | `public_html` se purani files delete karo |
| Blank page | Cache clear karo, files `public_html` root mein honi chahiye |
| Assets 404 | `index.html` aur `assets/` same folder mein hon |
