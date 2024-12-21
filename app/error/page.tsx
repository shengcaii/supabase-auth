import { Button } from '@/components/ui/Button'

export default function ErrorPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-accent">Something went wrong</h2>
                <p className="text-muted">We encountered an error while processing your request.</p>
                <div className="pt-4">
                    <Button href="/" variant="default">
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    )
}