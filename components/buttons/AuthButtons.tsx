'use client'

import { useState } from 'react'
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"

interface AuthButtonProps {
    user: User | null
    onSignOut: () => void
}

export function CreateAccountButton({ user }: { user: User | null }) {
    const pathname = usePathname()
    if (user || pathname === '/signup') return null

    return (
        <Button
            href="/signup"
            variant="default"
            size="sm"
        >
            Create Account
        </Button>
    )
}

export function ProfileButton({ user }: { user: User | null }) {
    const pathname = usePathname()

    if (!user || pathname === '/profile') return null

    return (
        <Button
            href="/profile"
            variant="secondary"
            size="sm"
        >
            Profile
        </Button>
    )
}

export function LogoutButton({ user, onSignOut }: AuthButtonProps) {
    const pathname = usePathname()
    const [showDialog, setShowDialog] = useState(false)

    if (!user || pathname !== '/profile') return null

    return (
        <>
            <Button
                onClick={() => setShowDialog(true)}
                variant="secondary"
                size="sm"
            >
                Logout
            </Button>

            <Dialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={onSignOut}
                title="Confirm Logout"
                message="Are you sure you want to logout? You will need to login again to access your account."
                confirmText="Logout"
            />
        </>
    )
}

export function LoginButton({ user }: { user: User | null }) {
    const pathname = usePathname()

    if (user || pathname === '/login') return null

    return (
        <Button
            href="/login"
            variant="secondary"
            size="sm"
        >
            Login
        </Button>
    )
} 