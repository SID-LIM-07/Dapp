'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, X } from 'lucide-react'

interface Message {
  id: number
  content: string
  sender: 'user' | 'match'
  timestamp: Date
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const handleSend = () => {
    if (!newMessage.trim()) return
    
    setMessages([...messages, {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    }])
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfile(true)}>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Match" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Kris</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t bg-white p-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-md p-0 h-[80vh] overflow-auto">
          <Card className="border-0">
            <CardContent className="p-0">
              {/* Basic Info */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-semibold">Kris</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>24</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Woman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Straight</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Education</h3>
                  <p>University of Regina</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Religion</h3>
                  <p>Catholic</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Looking for</h3>
                  <p>Long-term relationship</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Relationship Type</h3>
                  <p>Monogamy</p>
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <img
                  src="/placeholder.svg"
                  alt="Profile"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">My therapist would say I</h3>
                  <p className="text-2xl font-serif">Need a therapist</p>
                </div>
                <img
                  src="/placeholder.svg"
                  alt="Profile"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">This year, I really want to</h3>
                  <p className="text-2xl font-serif">The year is already over. We'll try again next year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  )
}

