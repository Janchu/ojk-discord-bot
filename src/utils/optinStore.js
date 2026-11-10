import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', '..', 'data')
const STORE_FILE = path.join(DATA_DIR, 'optin-channels.json')

// Shape: { [channelId]: { roleId: string, name: string } }

export async function loadOptInChannels() {
  try {
    return JSON.parse(await readFile(STORE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

export async function saveOptInChannels(channels) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(STORE_FILE, JSON.stringify(channels, null, 2))
}

export async function setOptInChannel(channelId, entry) {
  const channels = await loadOptInChannels()
  channels[channelId] = entry
  await saveOptInChannels(channels)
}

export async function removeOptInChannel(channelId) {
  const channels = await loadOptInChannels()
  delete channels[channelId]
  await saveOptInChannels(channels)
}
