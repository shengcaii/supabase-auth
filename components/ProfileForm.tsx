'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"

interface ProfileFormProps {
    userId: string
    initialData: {
        nickname: string
        bio: string
        birthday?: string
    }
}

export default function ProfileForm({ userId, initialData }: ProfileFormProps) {
    const [nickname, setNickname] = useState(initialData.nickname)
    const [bio, setBio] = useState(initialData.bio)
    const [birthday, setBirthday] = useState(initialData.birthday || '')
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [isFormChanged, setIsFormChanged] = useState(false)

    const supabase = createClient()

    // Check if form values have changed from initial values
    useEffect(() => {
        const hasChanges =
            nickname !== initialData.nickname ||
            bio !== initialData.bio ||
            birthday !== (initialData.birthday || '')

        setIsFormChanged(hasChanges)
    }, [nickname, bio, birthday, initialData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormChanged) return

        setIsSaving(true)
        setMessage('')

        const { error } = await supabase
            .from('profiles')
            .update({
                user_id: userId,
                username: nickname,
                bio,
                birthday: birthday || null
            }).eq('user_id', userId)

        setIsSaving(false)

        if (error) {
            setMessage('Error saving profile')
            console.error('Error:', error)
        } else {
            setMessage('Profile updated successfully!')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-foreground mb-1">
                    Nickname
                </label>
                <input
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:outline-none focus:border-primary"
                    maxLength={20}
                    required
                />
            </div>

            <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-foreground mb-1">
                    Birthday
                </label>
                <input
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1">
                    Bio
                </label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-surface-2 border border-muted focus:outline-none focus:border-primary"
                    rows={4}
                    maxLength={160}
                />
            </div>

            <button
                type="submit"
                disabled={isSaving || !isFormChanged}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving ? 'Saving...' : 'Save Profile'}
            </button>

            {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-accent' : 'text-secondary'}`}>
                    {message}
                </p>
            )}
        </form>
    )
} 