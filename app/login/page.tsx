'use client'

import { LoginForm } from '@/components/forms/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
                    <p className="mt-2 text-muted">Sign in to your account</p>
                </div>

                <LoginForm />

                <p className="text-center text-muted">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-primary hover:text-primary-dark transition-colors"
                    >
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    )
}
