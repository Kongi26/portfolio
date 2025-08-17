import { NextRequest, NextResponse } from 'next/server'
import { readUsers, writeUsers, type User } from '@/lib/db'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
	const data = await req.json().catch(() => ({})) as { email?: string; phone?: string }
	if (!data.email && !data.phone) return NextResponse.json({ error: 'email or phone required' }, { status: 400 })
	const users = await readUsers()
	let existing = users.users.find(u => (data.email && u.email === data.email) || (data.phone && u.phone === data.phone))
	if (!existing) {
		existing = { id: randomUUID(), email: data.email, phone: data.phone, createdAt: new Date().toISOString() } as User
		users.users.push(existing)
		await writeUsers(users)
	}
	const res = NextResponse.json({ userId: existing.id })
	res.cookies.set('uid', existing.id, { httpOnly: true, sameSite: 'lax', path: '/' })
	return res
}