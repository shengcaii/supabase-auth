'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/forms/LoginForm'
import { SignupForm } from '@/components/forms/SignupForm'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold gradient-text">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="mt-2 text-muted">
                        {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
                    </p>
                </div>

                {/* Form Toggle */}
                <div className="flex rounded-lg overflow-hidden border border-muted">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin
                            ? 'bg-primary text-white'
                            : 'bg-surface-2 text-muted hover:text-foreground'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin
                            ? 'bg-primary text-white'
                            : 'bg-surface-2 text-muted hover:text-foreground'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
        </div>
    )
}
