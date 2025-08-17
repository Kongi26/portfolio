import nodemailer from 'nodemailer'
import twilio from 'twilio'

export async function sendNotification(to: string, url: string, previewText: string) {
	const isEmail = to.includes('@')
	if (isEmail) {
		await sendEmail(to, url, previewText)
	} else {
		await sendSms(to, url, previewText)
	}
}

async function sendEmail(to: string, url: string, previewText: string) {
	if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
		console.log('[notify] Email (env missing):', { to, url, previewText })
		return
	}
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		secure: false,
		auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
	})
	await transporter.sendMail({
		from: process.env.SMTP_FROM!,
		to,
		subject: 'You received a gratitude',
		html: `<p>${escapeHtml(previewText)}</p><p><a href="${url}">Open your gratitude card</a></p>`,
	})
}

async function sendSms(to: string, url: string, previewText: string) {
	if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM) {
		console.log('[notify] SMS (env missing):', { to, url, previewText })
		return
	}
	const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
	await client.messages.create({ from: process.env.TWILIO_FROM!, to, body: `${previewText}\n${url}` })
}

function escapeHtml(input: string) {
	return input.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}