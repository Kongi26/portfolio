"use client"

import { useState } from 'react'

const colors: Record<string, string> = { rose: '#f43f5e', tulip: '#f59e0b', orchid: '#8b5cf6' }

export default function Flower({ kind }: { kind: string }) {
	const [open, setOpen] = useState(false)
	const color = colors[kind] || '#8b5cf6'
	return (
		<div className="flex items-center gap-3">
			<div className="relative h-20 w-20 cursor-pointer select-none" onClick={() => setOpen(v => !v)} title={open ? 'Close flower' : 'Open flower'}>
				<div className="absolute inset-0 rounded-full" style={{ backgroundColor: color, boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)' }} />
				{open && (
					<div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="absolute left-1/2 top-1/2 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80" style={{ backgroundColor: color, transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(18px)` }} />
						))}
					</div>
				)}
			</div>
			<div className="text-sm text-gray-600">{open ? 'Flower opened' : 'Tap to open the flower'}</div>
		</div>
	)
}