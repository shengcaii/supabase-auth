'use client'

import { Button } from "@/components/ui/Button"
import { signup } from "@/app/login/actions"

export function SignupForm() {
    return (
        <form className="glass-effect p-8 rounded-lg space-y-6">
            <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="signup-email"
                    required
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="signup-password"
                    required
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    required
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            <Button
                formAction={signup}
                className="w-full"
                variant="default"
            >
                Sign Up
            </Button>
        </form>
    )
} 