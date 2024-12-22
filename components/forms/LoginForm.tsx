'use client'

import { Button } from "@/components/ui/Button"
import { login } from "@/app/auth/actions"
import { useState } from "react"
import { validateEmail } from "@/utils/validation"
import { PasswordInput } from '@/components/ui/PasswordInput'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [serverError, setServerError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        const emailError = validateEmail(email)
        if (emailError) newErrors.email = emailError

        if (!password) newErrors.password = 'Password is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setServerError('')
        setIsLoading(true)

        if (!validateForm()) {
            setIsLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        try {
            await login(formData)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
            setServerError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-lg space-y-6">
            {serverError && (
                <div className="p-3 rounded-md bg-accent/10 text-accent text-sm">
                    {serverError}
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md bg-surface-2 border transition-colors ${errors.email ? 'border-accent' : 'border-muted focus:border-primary'
                        }`}
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-sm text-accent mt-1">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                </label>
                <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md bg-surface-2 border transition-colors ${errors.password ? 'border-accent' : 'border-muted focus:border-primary'}`}
                    placeholder="Enter your password"
                />
                {errors.password && (
                    <p className="text-sm text-accent mt-1">{errors.password}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    )
} 