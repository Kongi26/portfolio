"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReplyBox({ id }: { id: string }) {
	const [message, setMessage] = useState('')
	const [busy, setBusy] = useState(false)
	const [needsAuth, setNeedsAuth] = useState(false)
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	async function trySend() {
		setBusy(true)
		setError(null)
		try {
			const res = await fetch(`/api/gratitudes/${id}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) })
			if (res.status === 401) {
				setNeedsAuth(true)
				return
			}
			if (!res.ok) throw new Error('Failed to send reply')
			router.refresh()
			setMessage('')
		} catch (e: any) {
			setError(e.message || 'Something went wrong')
		} finally {
			setBusy(false)
		}
	}

	async function registerThenSend() {
		setBusy(true)
		setError(null)
		try {
			const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email || undefined, phone: phone || undefined }) })
			if (!res.ok) throw new Error('Could not register')
			await trySend()
		} catch (e: any) {
			setError(e.message || 'Could not register')
		} finally {
			setBusy(false)
		}
	}

	return (
		<div className="space-y-3">
			<label className="grid gap-1">
				<span className="text-sm text-gray-700">Write a reply</span>
				<textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40" placeholder="Your reply..." />
			</label>
			{error && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
			{needsAuth ? (
				<div className="rounded-md border border-gray-200 p-3">
					<p className="text-sm text-gray-700">Create a free account to send your reply.</p>
					<div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
						<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40" />
						<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40" />
						<button disabled={busy} onClick={registerThenSend} className="inline-flex items-center justify-center rounded-md bg-brand px-3 py-2 text-sm text-white disabled:opacity-50">{busy ? 'Sending...' : 'Create account & send'}</button>
					</div>
					<p className="mt-1 text-xs text-gray-500">Use email or phone. No password required.</p>
				</div>
			) : (
				<button disabled={busy || !message.trim()} onClick={trySend} className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-50">{busy ? 'Sending...' : 'Send reply'}</button>
			)}
		</div>
	)
}