import { NextResponse } from 'next/server'
import { readGratitudes } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET() {
	const uid = cookies().get('uid')?.value
	const db = await readGratitudes()
	if (!uid) {
		return NextResponse.json({
			recipients: ['Mentor', 'Teacher', 'Parent', 'Spouse', 'Coach', 'Friend'],
			relationships: ['mentor', 'teacher', 'parent', 'spouse', 'coach', 'friend'],
			occasions: ['birthday', 'work anniversary', 'graduation', 'milestone', 'random act'],
		})
	}
	const mine = db.gratitudes.filter(g => g.fromUserId === uid)
	const counts: Record<string, number> = {}
	for (const g of mine) counts[g.toName] = (counts[g.toName] || 0) + 1
	const recipients = Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([name])=>name).slice(0,6)
	return NextResponse.json({
		recipients: recipients.length ? recipients : ['Mentor','Teacher','Parent','Friend'],
		relationships: ['mentor','teacher','parent','friend','colleague'],
		occasions: ['birthday','work anniversary','milestone','thank you'],
	})
}