import { Client } from 'basic-ftp'
import { readdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.deploy' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const { FTP_HOST, FTP_USER, FTP_PASS, FTP_PATH } = process.env

if (!FTP_HOST || !FTP_USER || !FTP_PASS || !FTP_PATH) {
  console.error('Missing FTP config. Copy .env.deploy.example to .env.deploy and fill details.')
  process.exit(1)
}

async function uploadDir(client, localDir, remoteDir) {
  await client.ensureDir(remoteDir)
  const entries = await readdir(localDir, { withFileTypes: true })

  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name)
    const remotePath = `${remoteDir}/${entry.name}`.replace(/\\/g, '/')

    if (entry.isDirectory()) {
      await uploadDir(client, localPath, remotePath)
    } else {
      console.log(`Uploading ${entry.name}`)
      await client.uploadFrom(localPath, remotePath)
    }
  }
}

async function deploy() {
  try {
    await stat(distDir)
  } catch {
    console.error('dist/ not found. Run: npm run deploy:pack')
    process.exit(1)
  }

  const client = new Client(60000)
  client.ftp.verbose = true

  try {
    console.log(`Connecting to ${FTP_HOST}...`)
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASS,
      secure: false,
    })

    console.log(`Deploying to ${FTP_PATH}`)
    await client.ensureDir(FTP_PATH)
    await client.cd(FTP_PATH)

    // Remove default Hostinger file if present
    try {
      await client.remove('default.php')
      console.log('Removed default.php')
    } catch {
      // file may not exist
    }

    await uploadDir(client, distDir, FTP_PATH)
    console.log('Deploy complete! Open https://neo.pixswp.com')
  } catch (err) {
    console.error('Deploy failed:', err.message)
    process.exit(1)
  } finally {
    client.close()
  }
}

deploy()
