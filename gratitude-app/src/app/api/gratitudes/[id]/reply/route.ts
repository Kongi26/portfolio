import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const DB_FILE = path.join(process.cwd(), 'data', 'gratitudes.json')

async function readDb() {
	try {
		const raw = await fs.readFile(DB_FILE, 'utf-8')
		return JSON.parse(raw) as { gratitudes: any[] }
	} catch {
		return { gratitudes: [] }
	}
}

async function writeDb(db: { gratitudes: any[] }) {
	await fs.mkdir(path.dirname(DB_FILE), { recursive: true })
	await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	let message = ''
	const ctype = req.headers.get('content-type') || ''
	if (ctype.includes('application/json')) {
		const json = await req.json().catch(() => ({})) as any
		message = String(json.message || '')
	} else {
		const form = await req.formData()
		message = String(form.get('message') || '')
	}
	message = message.trim().slice(0, 2000)
	if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })
	const uid = cookies().get('uid')?.value
	if (!uid) return NextResponse.json({ error: 'auth-required' }, { status: 401 })
	const db = await readDb()
	const g = db.gratitudes.find(x => x.id === params.id)
	if (!g) return NextResponse.json({ error: 'Not found' }, { status: 404 })
	g.replies.push({ message, createdAt: new Date().toISOString(), fromUserId: uid })
	await writeDb(db)
	return NextResponse.json({ ok: true })
}