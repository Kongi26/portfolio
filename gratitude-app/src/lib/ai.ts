type DraftParams = {
	toName: string
	fromName?: string
	relationship?: string
	occasion?: string
	tone?: 'warm' | 'formal' | 'fun' | 'brief'
}

export async function generateDraft(params: DraftParams): Promise<string> {
	const base = fallbackDraft(params)
	const apiKey = process.env.OPENAI_API_KEY
	if (!apiKey) return base
	try {
		const { OpenAI } = await import('openai')
		const client = new OpenAI({ apiKey })
		const prompt = `Write a short gratitude note. Audience: ${params.toName}. From: ${params.fromName || 'Me'}. Relationship: ${params.relationship || 'N/A'}. Occasion: ${params.occasion || 'general'}. Tone: ${params.tone || 'warm'}. 80-120 words. Keep it sincere and specific. No emojis.`
		const response = await client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'You write short, kind gratitude notes.' },
				{ role: 'user', content: prompt },
			],
			temperature: 0.7,
		})
		return response.choices[0]?.message?.content?.trim() || base
	} catch (e) {
		return base
	}
}

function fallbackDraft({ toName, fromName, relationship, occasion, tone }: DraftParams): string {
	const sal = `Dear ${toName || 'Friend'},`
	const body = occasion?.toLowerCase().includes('birthday')
		? `on your special day, I wanted to pause and thank you for the countless ways you've encouraged and inspired me. Your ${relationship || 'support'} has made a real difference.`
		: `thank you for being such a steady presence in my life. Your ${relationship || 'kindness and guidance'} have helped me grow in ways I notice every day.`
	const sign = tone === 'formal' ? 'With gratitude' : tone === 'fun' ? 'Big thanks' : 'Warmly'
	return `${sal}\n\n${capitalize(body)}\n\n${sign},\n${fromName || 'Me'}`
}

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1)
}