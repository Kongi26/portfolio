import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Flower from '@/components/Flower'
import ReplyBox from '@/components/ReplyBox'

async function readDb() {
	const dbPath = path.join(process.cwd(), 'data', 'gratitudes.json')
	try {
		const raw = await fs.readFile(dbPath, 'utf-8')
		return JSON.parse(raw) as { gratitudes: any[] }
	} catch {
		return { gratitudes: [] }
	}
}

export default async function GratitudePage({ params }: { params: { id: string } }) {
	const db = await readDb()
	const g = db.gratitudes.find(x => x.id === params.id)
	if (!g) return notFound()

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-gray-200 p-6">
				<div className="flex items-center gap-3">
					<Flower kind={g.flower} />
					<div>
						<h1 className="text-xl font-semibold">A gratitude for {g.toName}</h1>
						<p className="text-sm text-gray-600">Sent on {new Date(g.createdAt).toLocaleString()}</p>
					</div>
				</div>
				<div className="mt-4 whitespace-pre-wrap text-gray-900">{g.message}</div>
			</div>
			<ReplyBox id={g.id} />
			<RepliesList replies={g.replies} />
		</div>
	)
}

function RepliesList({ replies }: { replies: any[] }) {
	if (!replies?.length) return <div className="text-sm text-gray-500">No replies yet</div>
	return (
		<div className="space-y-3">
			<h2 className="font-medium">Replies</h2>
			<ul className="space-y-2">
				{replies.map((r, i) => (
					<li key={i} className="rounded-md border border-gray-200 p-3">
						<div className="text-sm text-gray-600">{new Date(r.createdAt).toLocaleString()}</div>
						<div className="whitespace-pre-wrap">{r.message}</div>
					</li>
				))}
			</ul>
		</div>
	)
}