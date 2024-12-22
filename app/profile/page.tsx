import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { formatUsername } from "@/utils/formatUsername";
import ProfileForm from "@/components/ProfileForm";

export default async function Profile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login')
    }

    // Fetch existing profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('username, bio, birthday')
        .eq('user_id', user.id)
        .single()

    // Profile will always exist due to the trigger
    const defaultUsername = formatUsername(user.email || '', {
        removeNumbers: true,
        capitalizeWord: true,
        maxLength: 20
    })

    return (
        <main className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 gradient-text">Profile Settings</h1>
                <ProfileForm
                    userId={user.id}
                    initialData={{
                        nickname: profile?.username || defaultUsername,
                        bio: profile?.bio || '',
                        birthday: profile?.birthday || ''
                    }}
                />
            </div>
        </main>
    )
}