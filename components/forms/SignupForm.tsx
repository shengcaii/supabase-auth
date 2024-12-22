'use client'

import { Button } from "@/components/ui/Button"
import { signup } from "@/app/auth/actions"
import { useState } from "react"
import { validateEmail, validatePassword, validatePasswordMatch } from "@/utils/validation"
import { PasswordInput } from '@/components/ui/PasswordInput'

export function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [serverError, setServerError] = useState('')

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        const emailError = validateEmail(email)
        if (emailError) newErrors.email = emailError

        const passwordError = validatePassword(password)
        if (passwordError) newErrors.password = passwordError

        const confirmError = validatePasswordMatch(password, confirmPassword)
        if (confirmError) newErrors.confirmPassword = confirmError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setServerError('')

        if (!validateForm()) return

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)

        try {
            await signup(formData)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
            setServerError(errorMessage)
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
                    className={`w-full px-3 py-2 rounded-md bg-surface-2 border transition-colors ${errors.password ? 'border-accent' : 'border-muted focus:border-primary'
                        }`}
                    placeholder="Create a password"
                />
                {errors.password && (
                    <p className="text-sm text-accent mt-1">{errors.password}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                </label>
                <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md bg-surface-2 border transition-colors ${errors.confirmPassword ? 'border-accent' : 'border-muted focus:border-primary'
                        }`}
                    placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-accent mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                variant="default"
            >
                Create Account
            </Button>
        </form>
    )
} 