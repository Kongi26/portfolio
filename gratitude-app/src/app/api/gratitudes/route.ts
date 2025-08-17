import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { readGratitudes, writeGratitudes } from '@/lib/db'
import { sendNotification } from '@/lib/notify'
import { cookies } from 'next/headers'

export async function GET() {
	const db = await readGratitudes()
	return NextResponse.json({ gratitudes: db.gratitudes.slice(-50) })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const id = randomUUID()
	const createdAt = new Date().toISOString()
	const uid = cookies().get('uid')?.value
	const record = {
		id,
		createdAt,
		fromUserId: uid,
		toName: String(body.toName || '').slice(0, 120),
		toContact: String(body.toContact || '').slice(0, 160),
		message: String(body.message || '').slice(0, 2000),
		flower: String(body.flower || 'rose'),
		status: 'sent' as const,
		replies: [] as any[],
	}
	const db = await readGratitudes()
	db.gratitudes.push(record)
	await writeGratitudes(db)

	const envBase = process.env.NEXT_PUBLIC_BASE_URL
	const origin = envBase && envBase.trim().length ? envBase : new URL(req.url).origin
	const url = `${origin}/g/${id}`
	await sendNotification(record.toContact, url, `You received a gratitude from someone who appreciates you.`).catch(() => {})

	return NextResponse.json({ id })
}