# Hostinger Deploy — public_html/Neo

Domain: https://neo.pixswp.com  
Server folder: `public_html/Neo`

## Step 1: Build (local)

```bash
npm run deploy:pack
```

Creates `neo-deploy.zip` in project root.

## Step 2: Upload via File Manager

1. https://hpanel.hostinger.com → **File Manager**
2. Open `public_html` → **Neo** folder
3. **Delete** `default.php`
4. Upload `neo-deploy.zip` into **Neo** folder
5. Right-click zip → **Extract**
6. Delete zip after extract

## Step 3: Verify

Open https://neo.pixswp.com — Login page should appear.

## Files inside Neo folder

```
Neo/
├── index.html
├── .htaccess
├── favicon.svg
├── icons.svg
└── assets/
    ├── index-xxx.js
    └── index-xxx.css
```

## Auto deploy (FTP)

1. Copy `.env.deploy.example` → `.env.deploy`
2. Fill Hostinger FTP details from hPanel → FTP Accounts
3. Run: `npm run deploy:ftp`

## APK

```bash
set CAPACITOR_SERVER_URL=https://neo.pixswp.com
npm run android:build
```
