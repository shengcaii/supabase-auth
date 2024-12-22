'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

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
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-accent">Something went wrong</h2>
                <p className="text-muted">{error.message || 'An error occurred'}</p>
                <div className="space-x-4">
                    <Button
                        onClick={reset}
                        variant="default"
                    >
                        Try Again
                    </Button>
                    <Button
                        href="/"
                        variant="secondary"
                    >
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    )
} 