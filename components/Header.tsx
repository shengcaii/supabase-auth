'use client'

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CreateAccountButton,
    ProfileButton,
    LogoutButton,
    LoginButton
} from "./buttons/AuthButtons"
import { User } from "@supabase/supabase-js"

export default function Header() {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Get initial user state
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'SIGNED_IN') {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)
                router.refresh()
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                router.refresh()
                router.push('/')
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase.auth, router])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="glass-effect px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold gradient-text">
                            Luna
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="text-foreground hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CreateAccountButton user={user} />
                        <ProfileButton user={user} />
                        <LogoutButton user={user} onSignOut={handleSignOut} />
                        <LoginButton user={user} />
                    </div>
                </div>
            </nav>
        </header>
    )
}
