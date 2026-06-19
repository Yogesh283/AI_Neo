# Deploy Guide — neo.pixswp.com

| Item | Value |
|------|-------|
| Live URL | https://neo.pixswp.com |
| Server path | `~/domains/pixswp.com/public_html/Neo` |
| GitHub repo | https://github.com/Yogesh283/AI_Neo.git |
| Branch | `main` |

---

## Important

- **Git clone** = saara source code server par aata hai (`src/`, `android/`, etc.)
- **Website live** = `dist` files chahiye (`index.html`, `assets/`, `.htaccess`)
- Server par **npm nahi hai** — build hamesha **local PC** par karo
- Galat `index.html` (`/src/main.jsx`) se MIME error aata hai — zip extract zaroori hai

---

## Pehli baar setup

### Step 1 — Local se GitHub par push (Windows CMD)

```cmd
cd D:\Neo
git add .
git commit -m "update"
git push origin main
```

### Step 2 — Server par code clone (SSH)

```bash
cd ~/domains/pixswp.com/public_html
rm -rf Neo
git clone https://github.com/Yogesh283/AI_Neo.git Neo
cd Neo
ls
```

Repo **public** hai — username/password mat do.

### Step 3 — Local par build + zip (Windows CMD)

```cmd
cd D:\Neo
npm run deploy:pack
```

Output: `D:\Neo\neo-deploy.zip`

### Step 4 — Hostinger File Manager

1. Login: https://hpanel.hostinger.com
2. **File Manager** → `domains` → `pixswp.com` → `public_html` → **Neo**
3. `default.php` delete karo (agar hai)
4. `neo-deploy.zip` upload karo
5. Right-click → **Extract** (overwrite allow karo)
6. Zip delete karo (optional)

### Step 5 — Verify

Browser: https://neo.pixswp.com (Ctrl+Shift+R — hard refresh)

`Neo` folder mein ye files honi chahiye:

```
Neo/
├── index.html          ← /assets/index-xxx.js load karega
├── .htaccess
├── favicon.svg
├── icons.svg
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
├── src/                ← git se (theek hai, ignore karo browser mein)
└── package.json
```

---

## Har update ke baad (full flow)

### Local — code push + build (Windows CMD)

```cmd
cd D:\Neo
git add .
git commit -m "update"
git push origin main
npm run deploy:pack
```

### Server — latest code pull (SSH)

```bash
cd ~/domains/pixswp.com/public_html/Neo
git pull origin main
```

### File Manager — site update

1. `neo-deploy.zip` upload karo `Neo` folder mein
2. Extract karo (overwrite)
3. Browser refresh: https://neo.pixswp.com

---

## Private repo ho to (SSH)

GitHub → Settings → Developer settings → Personal access token (`repo` scope)

```bash
cd ~/domains/pixswp.com/public_html
rm -rf Neo
git clone https://github.com/Yogesh283/AI_Neo.git Neo
```

- Username: `Yogesh283`
- Password: **token** (GitHub password nahi)

Credentials save karo:

```bash
cd ~/domains/pixswp.com/public_html/Neo
git config credential.helper store
git pull origin main
```

---

## FTP deploy (optional — Windows CMD)

```cmd
cd D:\Neo
copy .env.deploy.example .env.deploy
```

`.env.deploy` mein FTP details bharo (hPanel → FTP Accounts):

```
FTP_HOST=ftp.pixswp.com
FTP_USER=your_username
FTP_PASS=your_password
FTP_PATH=/domains/pixswp.com/public_html/Neo
```

Deploy:

```cmd
npm run deploy:ftp
```

---

## Android APK (server-linked)

Server live hone ke baad:

```cmd
cd D:\Neo
set CAPACITOR_SERVER_URL=https://neo.pixswp.com
npm run android:build
```

APK: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## Troubleshooting

| Error | Reason | Fix |
|-------|--------|-----|
| `main.jsx MIME type text/plain` | Source `index.html` serve ho raha hai | `neo-deploy.zip` upload + extract |
| `favicon.svg 404` | dist files upload nahi hui | zip dubara extract karo |
| `git: not a git repository` | clone nahi hua | Step 2 dubara karo |
| `npm: command not found` | server par Node nahi | local `npm run deploy:pack` use karo |
| `Invalid username or token` | private repo + password | GitHub token use karo |
| Default Hostinger page | galat folder | `public_html/Neo` check karo |
| `contentscript.js` warnings | browser extension | ignore — app error nahi |

---

## Quick commands

**Local push + build:**
```cmd
cd D:\Neo && git add . && git commit -m "update" && git push origin main && npm run deploy:pack
```

**Server pull:**
```bash
cd ~/domains/pixswp.com/public_html/Neo && git pull origin main
```

Phir File Manager se `neo-deploy.zip` upload + extract.
