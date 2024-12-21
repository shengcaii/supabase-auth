'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('App Error:', error)
    }, [error])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-accent">Something went wrong!</h2>
                <p className="text-muted">
                    {error?.message || 'An error occurred while processing your request.'}
                </p>
                <div className="space-x-4">
                    <button
                        onClick={reset}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="bg-surface-2 text-foreground px-4 py-2 rounded-md hover:bg-surface transition-colors"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </main>
    )
} 