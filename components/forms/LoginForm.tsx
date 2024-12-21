'use client'

import { Button } from "@/components/ui/Button"
import { login } from "@/app/login/actions"

export function LoginForm() {
    return (
        <form className="glass-effect p-8 rounded-lg space-y-6">
            <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="login-email"
                    required
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="login-password"
                    required
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:border-primary focus:outline-none transition-colors"
                />
            </div>

            <Button
                formAction={login}
                className="w-full"
                variant="default"
            >
                Login
            </Button>
        </form>
    )
} 