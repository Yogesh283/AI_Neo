# Deploy Guide — neo.pixswp.com

| Item | Value |
|------|-------|
| Live URL | https://neo.pixswp.com |
| Server path | `~/domains/pixswp.com/public_html/Neo` |
| GitHub repo | https://github.com/Yogesh283/AI_Neo.git |
| Branch | `main` |

---

## Important

- `contentscript.js` errors = **browser extension** (MetaMask etc.) — **ignore karo**
- `main.jsx MIME text/plain` = **galat index.html** serve ho raha hai — neeche Step 3 zaroor karo
- Server par **npm nahi hai** — build local PC par hoti hai
- `live/` folder = production website files (git mein committed)

---

## Pehli baar setup

### Step 1 — Local push + live build (Windows CMD)

```cmd
cd D:\Neo
git add .
git commit -m "update"
git push origin main
npm run deploy:live
git add live
git commit -m "Update live site files"
git push origin main
```

### Step 2 — Server code clone (SSH)

```bash
cd ~/domains/pixswp.com/public_html
rm -rf Neo
git clone https://github.com/Yogesh283/AI_Neo.git Neo
cd Neo
ls
```

### Step 3 — Site live karo (SSH) — ZAROORI

```bash
cd ~/domains/pixswp.com/public_html/Neo
cp -r live/* .
ls -la
head -3 index.html
```

`index.html` mein `/assets/index` dikhna chahiye — **`main.jsx` NAHI**.

### Step 4 — Browser check

https://neo.pixswp.com — `Ctrl+Shift+R` hard refresh

---

## Har update ke baad

### Local (Windows CMD)

```cmd
cd D:\Neo
git add .
git commit -m "update"
git push origin main
npm run deploy:live
git add live
git commit -m "Update live site files"
git push origin main
```

### Server (SSH)

```bash
cd ~/domains/pixswp.com/public_html/Neo
git pull origin main
cp -r live/* .
```

Browser refresh: https://neo.pixswp.com

---

## Neo folder structure

```
Neo/
├── live/               ← git se (production files source)
│   ├── index.html
│   ├── .htaccess
│   └── assets/
├── index.html          ← cp ke baad (site yahi se chalti hai)
├── assets/             ← cp ke baad
├── src/                ← source code (git)
└── package.json
```

---

## Zip upload (alternative)

```cmd
cd D:\Neo
npm run deploy:pack
```

File Manager → `Neo` folder → `neo-deploy.zip` upload → Extract (overwrite)

---

## Private repo (SSH)

GitHub token banao (`repo` scope), phir:

```bash
git clone https://github.com/Yogesh283/AI_Neo.git Neo
```

Username: `Yogesh283` | Password: **token**

---

## FTP deploy (optional)

```cmd
copy .env.deploy.example .env.deploy
npm run deploy:ftp
```

`.env.deploy`:
```
FTP_HOST=ftp.pixswp.com
FTP_USER=your_username
FTP_PASS=your_password
FTP_PATH=/domains/pixswp.com/public_html/Neo
```

---

## Android APK

```cmd
set CAPACITOR_SERVER_URL=https://neo.pixswp.com
npm run android:build
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `main.jsx MIME text/plain` | Server: `cp -r live/* .` |
| `favicon.svg 404` | `cp -r live/* .` dubara karo |
| `contentscript.js` warnings | Browser extension — ignore |
| Default Hostinger page | Galat folder — `public_html/Neo` check karo |
| `npm not found` on server | Normal — local `npm run deploy:live` use karo |

### Server par check karo

```bash
cd ~/domains/pixswp.com/public_html/Neo
head -5 index.html
ls live/assets/
ls assets/
```

Sahi `index.html` example:
```html
<script type="module" crossorigin src="/assets/index-zNu17ywf.js"></script>
```

Galat (error wala):
```html
<script type="module" src="/src/main.jsx"></script>
```

---

## Quick one-liners

**Local:**
```cmd
cd D:\Neo && npm run deploy:live && git add live && git commit -m "live update" && git push origin main
```

**Server:**
```bash
cd ~/domains/pixswp.com/public_html/Neo && git pull origin main && cp -r live/* .
```
