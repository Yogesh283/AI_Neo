# Hostinger Deploy — public_html/Neo

Domain: https://neo.pixswp.com  
Server path: `~/domains/pixswp.com/public_html/Neo`

---

## 1. Local → GitHub (Windows CMD)

```cmd
cd D:\Neo
git add .
git commit -m "update"
git push origin main
```

---

## 2. GitHub → Server (SSH) — ALL code clone

```bash
cd ~/domains/pixswp.com/public_html
rm -rf Neo
GIT_TERMINAL_PROMPT=0 git clone https://github.com/Yogesh283/AI_Neo.git Neo
cd Neo
ls
```

Password mat do — repo public hai.

Har update ke baad server par:

```bash
cd ~/domains/pixswp.com/public_html/Neo
git pull origin main
```

---

## 3. Website live karne ke liye (dist upload)

Server par npm nahi hai — local par build karo:

```cmd
cd D:\Neo
npm run deploy:pack
```

Phir `neo-deploy.zip` → File Manager → `public_html/Neo` → Extract.

---

## Neo folder mein kya hoga

**Git clone ke baad (all code):**
```
Neo/src, Neo/android, Neo/package.json, ...
```

**Zip extract ke baad (website files):**
```
Neo/index.html, Neo/assets/, Neo/.htaccess
```

Dono ek saath ho sakte hain — site `index.html` + `assets` se chalegi.

---

## FTP auto deploy (optional)

```cmd
copy .env.deploy.example .env.deploy
npm run deploy:ftp
```

FTP_PATH=/public_html/Neo
