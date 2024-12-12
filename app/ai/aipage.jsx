"use client"

import { ArrowUp } from 'lucide-react'

export default function HealioAIPage() {
  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD] items-center justify-center">
      <main className="flex-1 p-8 mt-35"> {/* Added mt-8 to move content up */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-8 mb-8">
            <img
              src="/images/logohealio.png" // Replace with your image source
              alt="Healio AI"
              className="w-24 h-24 object-cover rounded-full" // You can adjust the size and shape as needed
            />
            <div className="text-center">
              <h1 className="text-5xl font-medium text-[#314328] mb-2">
                How Can Healio AI Help You Today?
              </h1>
              <p className="text-gray-600">
                Ask Questions, Share Your Thoughts, Or Seek Advice. Healio AI Is Here To Listen, Support, And Guide You On Your Mental Wellness Journey.
              </p>
            </div>
          </div>

          <div className="relative">
            <textarea
              placeholder="How can Healio AI help you today?"
              className="w-full min-h-[120px] p-4 pr-12 rounded-lg border border-[#526D4E]/20 bg-white/80 text-[#526D4E] placeholder-[#526D4E]/60 focus:outline-none focus:ring-2 focus:ring-[#526D4E]/20"
            />
            <button
              className="absolute bottom-4 right-4 p-2 rounded-lg bg-[#A5C49C] hover:bg-[#94b38b] transition-colors"
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
