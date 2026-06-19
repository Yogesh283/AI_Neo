# AI Neo

ChatGPT-style AI chat web app with login, Android APK support, and server-ready deployment.

## Features

- Dark theme chat UI (sidebar, messages, suggestions)
- Login & Register (Email + Google)
- Search chats, Library, user menu
- Android APK via Capacitor

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
# Web
npm run build

# Android APK
npm run android:build
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Server + APK

Deploy `dist` to your server, then build APK with server URL:

```bash
set CAPACITOR_SERVER_URL=https://yourdomain.com
npm run android:build
```

Copy `.env.example` to `.env` and set your URLs.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production web build |
| `npm run android:build` | Build debug APK |
| `npm run cap:sync` | Sync web build to Android |
