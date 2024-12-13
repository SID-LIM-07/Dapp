'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfile } from '../components/UserProfile'
import { ChatInterface } from '../components/ChatInterface'

const matches = [
  { id: '1', name: 'Emma', avatar: 'placeholder_intj.jpg', lastMessage: 'Hey, want to discuss quantum mechanics?' },
  { id: '2', name: 'Olivia', avatar: 'placeholder_enfp.jpg', lastMessage: 'Just had the most amazing experience!' },
]

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<typeof matches[0] | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleMatchClick = (match: typeof matches[0]) => {
    setSelectedMatch(match)
    setShowChat(true)
  }

  const handleBackToMatches = () => {
    setShowChat(false)
    setShowProfile(false)
    setSelectedMatch(null)
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Matches</h1>
      {!showChat && (
        <div className="space-y-4">
          {matches.map((match) => (
            <Card key={match.id} className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleMatchClick(match)}>
              <CardContent className="flex items-center p-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={match.avatar} alt={match.name} />
                  <AvatarFallback>{match.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{match.name}</h2>
                  <p className="text-sm text-gray-500">{match.lastMessage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showChat && selectedMatch && (
        <ChatInterface 
          match={selectedMatch}
          onProfileClick={() => setShowProfile(true)}
          onBack={handleBackToMatches}
        />
      )}

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-md p-0">
          {selectedMatch && (
            <UserProfile 
              userId={selectedMatch.id}
              onBack={() => setShowProfile(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

