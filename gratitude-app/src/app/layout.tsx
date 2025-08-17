import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Gratitude',
	description: 'Send gratitude with a beautiful, simple flow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-white text-gray-900">
				<header className="sticky top-0 z-20 border-b border-gray-100 bg-white/80 backdrop-blur">
					<div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded bg-brand" />
							<span className="font-semibold">Gratitude</span>
						</div>
						<nav className="text-sm text-gray-600">
							<a href="/" className="hover:text-gray-900">Home</a>
						</nav>
					</div>
				</header>
				<main className="mx-auto max-w-3xl px-4 py-6">
					{children}
				</main>
			</body>
		</html>
	)
}