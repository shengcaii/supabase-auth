import { Button } from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-accent">Page Not Found</h2>
                <p className="text-muted">The page you are looking for does not exist.</p>
                <div className="pt-4">
                    <Button href="/" variant="default">
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    )
} 