import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'gratitudes.json')
const USERS_PATH = path.join(DATA_DIR, 'users.json')

async function ensureFiles() {
	await fs.mkdir(DATA_DIR, { recursive: true })
	try { await fs.access(DB_PATH) } catch { await fs.writeFile(DB_PATH, JSON.stringify({ gratitudes: [] }, null, 2), 'utf-8') }
	try { await fs.access(USERS_PATH) } catch { await fs.writeFile(USERS_PATH, JSON.stringify({ users: [] }, null, 2), 'utf-8') }
}

export type Gratitude = {
	id: string
	createdAt: string
	fromUserId?: string
	toName: string
	toContact: string
	message: string
	flower: string
	status: 'sent'
	replies: Array<{ message: string; createdAt: string; fromUserId?: string }>
}

export type User = {
	id: string
	email?: string
	phone?: string
	createdAt: string
}

export async function readGratitudes(): Promise<{ gratitudes: Gratitude[] }> {
	await ensureFiles()
	return JSON.parse(await fs.readFile(DB_PATH, 'utf-8'))
}

export async function writeGratitudes(db: { gratitudes: Gratitude[] }) {
	await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

export async function readUsers(): Promise<{ users: User[] }> {
	await ensureFiles()
	return JSON.parse(await fs.readFile(USERS_PATH, 'utf-8'))
}

export async function writeUsers(db: { users: User[] }) {
	await fs.writeFile(USERS_PATH, JSON.stringify(db, null, 2), 'utf-8')
}