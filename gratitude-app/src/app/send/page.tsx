"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

const flowers = [
	{ id: 'rose', name: 'Rose', color: '#f43f5e' },
	{ id: 'tulip', name: 'Tulip', color: '#f59e0b' },
	{ id: 'orchid', name: 'Orchid', color: '#8b5cf6' },
]

export default function SendPage() {
	const [toName, setToName] = useState('')
	const [toContact, setToContact] = useState('')
	const [message, setMessage] = useState('')
	const [flower, setFlower] = useState(flowers[0].id)
	const [busy, setBusy] = useState(false)
	const [sentId, setSentId] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [aiBusy, setAiBusy] = useState(false)
	const [fromName, setFromName] = useState('')
	const [relationship, setRelationship] = useState('')
	const [tone, setTone] = useState<'warm' | 'formal' | 'fun' | 'brief'>('warm')
	const [recos, setRecos] = useState<{ recipients: string[]; relationships: string[]; occasions: string[] } | null>(null)

	useEffect(() => {
		fetch('/api/recommendations').then(r=>r.json()).then(setRecos).catch(()=>{})
	}, [])

	async function submit() {
		setError(null)
		if (!toName || !toContact || !message) {
			setError('Please fill name, contact and message')
			return
		}
		setBusy(true)
		try {
			const res = await fetch('/api/gratitudes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ toName, toContact, message, flower }),
			})
			if (!res.ok) throw new Error('Failed to send')
			const data = await res.json()
			setSentId(data.id)
		} catch (e: any) {
			setError(e.message || 'Something went wrong')
		} finally {
			setBusy(false)
		}
	}

	async function draftWithAI() {
		setAiBusy(true)
		try {
			const res = await fetch('/api/ai/draft', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ toName, fromName, relationship, tone }),
			})
			const data = await res.json()
			if (data.text) setMessage(data.text)
		} finally {
			setAiBusy(false)
		}
	}

	if (sentId) {
		return (
			<div className="space-y-4">
				<h1 className="text-2xl font-semibold">Gratitude ready</h1>
				<p className="text-gray-600">We created a beautiful card and sent a notification. Share this link if needed:</p>
				<div className="rounded border border-gray-200 p-3 text-sm break-all">{`${typeof window !== 'undefined' ? window.location.origin : ''}/g/${sentId}`}</div>
				<Link href={`/g/${sentId}`} className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Open card</Link>
				<div className="rounded-md border border-gray-200 p-4">
					<p className="text-sm text-gray-700">Create a free account to save your gratitudes and get gentle reminders.</p>
					<AuthInline />
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Send a gratitude</h1>
			{recos && (
				<div className="rounded-md border border-gray-200 p-3 text-sm text-gray-700">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-gray-500">Suggestions:</span>
						{recos.recipients.slice(0,4).map(r => (
							<button key={r} onClick={() => setToName(r)} className="rounded-full border border-gray-300 px-3 py-1 hover:bg-gray-50">{r}</button>
						))}
						{recos.relationships.slice(0,3).map(r => (
							<button key={r} onClick={() => setRelationship(r)} className="rounded-full border border-gray-300 px-3 py-1 hover:bg-gray-50">{r}</button>
						))}
					</div>
				</div>
			)}
			<div className="grid gap-4">
				<label className="grid gap-1">
					<span className="text-sm text-gray-700">Recipient name</span>
					<input value={toName} onChange={e => setToName(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="e.g. Mrs. Johnson" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm text-gray-700">Email or phone</span>
					<input value={toContact} onChange={e => setToContact(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="e.g. name@example.com or +1 555 123 4567" />
				</label>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<label className="grid gap-1">
						<span className="text-sm text-gray-700">Your name (optional)</span>
						<input value={fromName} onChange={e => setFromName(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="e.g. Alex" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm text-gray-700">Relationship</span>
						<input value={relationship} onChange={e => setRelationship(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="e.g. teacher, mentor, parent" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm text-gray-700">Tone</span>
						<select value={tone} onChange={e => setTone(e.target.value as any)} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40">
							<option value="warm">Warm</option>
							<option value="formal">Formal</option>
							<option value="fun">Fun</option>
							<option value="brief">Brief</option>
						</select>
					</label>
				</div>
				<label className="grid gap-1">
					<span className="text-sm text-gray-700">Message</span>
					<textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="Write a short thank you note..." />
				</label>
				<div className="flex items-center gap-3">
					<button type="button" onClick={draftWithAI} disabled={aiBusy} className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50">{aiBusy ? 'Drafting...' : 'Draft with AI'}</button>
					<span className="text-xs text-gray-500">Optional</span>
				</div>
				<div className="grid gap-2">
					<span className="text-sm text-gray-700">Pick a flower</span>
					<div className="flex gap-2">
						{flowers.map(f => (
							<button key={f.id} onClick={() => setFlower(f.id)} className={`rounded-md border px-3 py-2 ${flower === f.id ? 'border-brand bg-brand/10' : 'border-gray-300 hover:bg-gray-50'}`}>
								<span className="inline-flex items-center gap-2">
									<span className="h-3 w-3 rounded-full" style={{ backgroundColor: f.color }} />
									{f.name}
								</span>
							</button>
						))}
					</div>
				</div>
				{error && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
				<button disabled={busy} onClick={submit} className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-50">
					{busy ? 'Sending...' : 'Send'}
				</button>
			</div>
		</div>
	)
}

function AuthInline() {
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [busy, setBusy] = useState(false)
	const [ok, setOk] = useState(false)
	async function register() {
		setBusy(true)
		try {
			const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email || undefined, phone: phone || undefined }) })
			if (res.ok) setOk(true)
		} finally {
			setBusy(false)
		}
	}
	if (ok) return <div className="text-sm text-green-700">You're in. Your gratitudes will be saved.</div>
	return (
		<div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
			<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40" />
			<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40" />
			<button disabled={busy} onClick={register} className="inline-flex items-center justify-center rounded-md bg-brand px-3 py-2 text-sm text-white disabled:opacity-50">{busy ? 'Saving...' : 'Create account'}</button>
		</div>
	)
}