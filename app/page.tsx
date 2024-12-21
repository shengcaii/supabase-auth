import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check for authenticated user using getUser()
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Handle sign in action
  async function handleSignIn() {
    'use server'
    if (user) {
      // User is authenticated, redirect to dashboard
      redirect('/dashboard');
    } else {
      // No authenticated user, redirect to login
      redirect('/login');
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Find Your Perfect Match</h1>
        <p className="text-xl text-gray-600 mb-8">Connect with like-minded people and discover meaningful relationships</p>

        {/* CTA Button */}
        <form action={handleSignIn}>
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-full transition-colors">
            {user ? 'Start Matching' : 'Get Started'}
          </button>
        </form>
      </div>

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💝</div>
          <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
          <p className="text-gray-600">Our algorithm helps you find compatible partners based on your interests and preferences</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
          <p className="text-gray-600">Your privacy and security are our top priorities</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💫</div>
          <h3 className="text-xl font-semibold mb-2">Real Connections</h3>
          <p className="text-gray-600">Meet authentic people looking for genuine relationships</p>
        </div>
      </div>

      {/* 
      Suggested improvements:
      1. Add user testimonials section
      {/* User Testimonials */}
      <div className="max-w-6xl mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-semibold">SJ</span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-gray-500 text-sm">New York, NY</p>
              </div>
            </div>
            <p className="text-gray-600">&quot;I found my soulmate through this platform! The matching algorithm really works. We&apos;ve been together for 2 years now.&quot;</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-semibold">MD</span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Michael Davis</h4>
                <p className="text-gray-500 text-sm">Los Angeles, CA</p>
              </div>
            </div>
            <p className="text-gray-600">&quot;The focus on genuine connections and safety really sets this platform apart. I&apos;ve met amazing people here.&quot;</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-semibold">EP</span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Emily Parker</h4>
                <p className="text-gray-500 text-sm">Chicago, IL</p>
              </div>
            </div>
            <p className="text-gray-600">&quot;I appreciate how the platform helps you find matches based on shared interests. It made dating so much more meaningful.&quot;</p>
          </div>
        </div>
      </div>
      {/* 2. Implement a success stories carousel */}
      {/* Success Stories Carousel */}
      <div className="max-w-6xl mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Success Stories</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="min-w-full p-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center justify-center mb-6">
                    <img src="/success-couple-1.jpg" alt="Happy Couple" className="w-32 h-32 rounded-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Mark & Lisa</h3>
                  <p className="text-gray-600 text-center">
                    &quot;We matched in June 2021 and got married last summer! We couldn&apos;t be happier and are so grateful for this platform bringing us together.&quot;
                  </p>
                  <p className="text-rose-500 text-center mt-4">Together for 2 years</p>
                </div>
              </div>
              <div className="min-w-full p-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center justify-center mb-6">
                    <img src="/success-couple-2.jpg" alt="Happy Couple" className="w-32 h-32 rounded-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">David & Rachel</h3>
                  <p className="text-gray-600 text-center">
                    &quot;From our first message to our wedding day, every moment has been magical. Thank you for helping us find true love!&quot;
                  </p>
                  <p className="text-rose-500 text-center mt-4">Together for 3 years</p>
                </div>
              </div>
            </div>
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* 3. Add statistics about successful matches
      4. Include a brief quiz/questionnaire for better matching
      5. Add real-time chat preview
      6. Implement AI-powered compatibility scoring
      7. Add location-based matching preview
      */}
    </main>
  )
}
