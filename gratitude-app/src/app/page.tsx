import Link from 'next/link'

export default function HomePage() {
	return (
		<div className="space-y-8">
			<section className="space-y-3">
				<h1 className="text-3xl font-semibold tracking-tight">Appreciate those who shaped your journey</h1>
				<p className="text-gray-600">Send a heartfelt note with a digital flower in seconds. No app installs. Recipients can respond without creating an account.</p>
				<div className="flex gap-3">
					<Link href="/send" className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">Send a gratitude</Link>
					<Link href="#how" className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-50">How it works</Link>
				</div>
			</section>
			<section id="how" className="grid gap-4 sm:grid-cols-3">
				<div className="rounded-lg border border-gray-200 p-4">
					<h3 className="font-medium">Trigger</h3>
					<p className="text-sm text-gray-600">A life moment prompts a thanks: promotion, graduation, birthday, or a memory.</p>
				</div>
				<div className="rounded-lg border border-gray-200 p-4">
					<h3 className="font-medium">Action</h3>
					<p className="text-sm text-gray-600">Type a short note, pick a flower, add recipient email or phone.</p>
				</div>
				<div className="rounded-lg border border-gray-200 p-4">
					<h3 className="font-medium">Reward</h3>
					<p className="text-sm text-gray-600">Instant beautiful card. Recipient sees it and can reply. You feel great.</p>
				</div>
			</section>
		</div>
	)
}