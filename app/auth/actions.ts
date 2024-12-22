"use server"

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { validateEmail, validatePassword, validatePasswordMatch } from '@/utils/validation'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Basic validation
    const emailError = validateEmail(email)
    if (emailError) throw new Error(emailError)

    if (!password) throw new Error('Password is required')

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password')
        }
        if (error.message.includes('Email not confirmed')) {
            throw new Error('Please verify your email before logging in')
        }
        throw new Error(error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Server-side validation
    const emailError = validateEmail(email)
    if (emailError) throw new Error(emailError)

    const passwordError = validatePassword(password)
    if (passwordError) throw new Error(passwordError)

    const confirmError = validatePasswordMatch(password, confirmPassword)
    if (confirmError) throw new Error(confirmError)

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        if (error.message.includes('already registered')) {
            throw new Error('An account with this email already exists')
        }
        throw new Error(error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=check-email')
}

