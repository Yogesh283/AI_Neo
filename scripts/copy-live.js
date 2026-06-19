import { cpSync, rmSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const liveDir = path.join(__dirname, '..', 'live')

if (!existsSync(distDir)) {
  console.error('dist/ not found. Run: npm run build:prod')
  process.exit(1)
}

if (existsSync(liveDir)) rmSync(liveDir, { recursive: true, force: true })
mkdirSync(liveDir, { recursive: true })

cpSync(distDir, liveDir, { recursive: true })
console.log('Copied dist/ → live/ (commit + push, then server: cp -r live/* .)')
