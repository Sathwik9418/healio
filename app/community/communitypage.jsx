import React, { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CommunityPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Title",
      description: "Description",
      votes: 0,
      userId: "Sathvik Enjamuri",
      userImage: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      title: "Title",
      description: "Description",
      votes: 0,
      userId: "Sathvik Enjamuri",
      userImage: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      title: "Title",
      description: "Description",
      votes: 0,
      userId: "Sathvik Enjamuri",
      userImage: "/placeholder.svg?height=32&width=32",
    },
  ])

  const handleVote = (id, increment) => {
    setDiscussions(prev =>
      prev.map(discussion =>
        discussion.id === id
          ? { ...discussion, votes: discussion.votes + (increment ? 1 : -1) }
          : discussion
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDiscussion = {
      id: discussions.length + 1,
      title: formData.get("title"),
      description: formData.get("description"),
      votes: 0,
      userId: "Sathvik Enjamuri", // This would typically come from the authenticated user
      userImage: "/placeholder.svg?height=32&width=32", // This would typically come from the authenticated user
    }
    setDiscussions(prev => [newDiscussion, ...prev])
    setIsDialogOpen(false)
  }

  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-medium text-[#314328] mb-2">
              "Connect, Share, And Support"
            </h1>
            <p className="text-gray-600">
              A Safe And Welcoming Space To Share Your Thoughts, Ask Questions, And Connect With Others On Their Mental Wellness Journey.
            </p>
          </div>

          {/* Button Section */}
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mb-12 w-full bg-[#C5E1A5] text-[#33691E] hover:bg-[#AED581]"
            size="lg"
          >
            Join The Conversation
          </Button>

          {/* Discussions Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-[#314328] mb-4">Recent Discussions</h2>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <Card key={discussion.id} className="p-4 bg-[#F9FDF7] rounded-lg shadow-lg border-[#C5E1A5] border-2">
                  <div className="flex items-center mb-2">
                    <img
                      src={discussion.userImage}
                      alt={`${discussion.userId}'s avatar`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-[#558B2F]">{discussion.userId} • 2h ago</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#33691E]">{discussion.title}</h3>
                  <p className="mb-4 text-sm text-[#558B2F]">{discussion.description}</p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(discussion.id, true)}
                      className="border-[#C5E1A5] text-[#33691E] hover:bg-[#C5E1A5] hover:text-[#33691E]"
                    >
                      <ChevronUp className="mr-1 h-4 w-4" />
                      Upvote
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(discussion.id, false)}
                      className="border-[#C5E1A5] text-[#33691E] hover:bg-[#C5E1A5] hover:text-[#33691E]"
                    >
                      <ChevronDown className="mr-1 h-4 w-4" />
                      Downvote
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Modal Dialog for Creating New Discussion */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-[#F1F8E9]">
              <DialogHeader>
                <DialogTitle className="text-[#33691E]">Share Your Thoughts</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#558B2F]">Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a title for your post"
                    required
                    className="border-[#C5E1A5] bg-white text-[#33691E]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#558B2F]">Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Type here... (e.g., I'm grateful for the sunny weather and this walk I took with my friends)"
                    className="min-h-[150px] border-[#C5E1A5] bg-white text-[#33691E]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#C5E1A5] text-[#33691E] hover:bg-[#AED581]"
                >
                  Save Entry
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
