'use client'

import { SignupForm } from '@/components/forms/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
                    <p className="mt-2 text-muted">Join us today</p>
                </div>

                <SignupForm />

                <p className="text-center text-muted">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-primary hover:text-primary-dark transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
} 