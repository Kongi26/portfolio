import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateDraft } from '@/lib/ai'

const schema = z.object({
	toName: z.string().default('Friend'),
	fromName: z.string().optional(),
	relationship: z.string().optional(),
	occasion: z.string().optional(),
	tone: z.enum(['warm', 'formal', 'fun', 'brief']).optional(),
})

export async function POST(req: NextRequest) {
	const json = await req.json().catch(() => ({}))
	const input = schema.parse(json)
	const text = await generateDraft(input)
	return NextResponse.json({ text })
}