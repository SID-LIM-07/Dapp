'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Heart, X, MessageCircle, Filter, Paperclip, Send, ArrowLeft } from 'lucide-react'
import { fetchApi } from '../utils/api'
import { MBTIProfile, mbtiProfiles } from '../utils/mbtiProfiles'

// Icons for vices
const DrinkIcon = () => <span title="Drinks alcohol">🍷</span>
const SmokeIcon = () => <span title="Smokes cigarettes">🚬</span>
const WeedIcon = () => <span title="Smokes weed">🌿</span>
const PillsIcon = () => <span title="Takes recreational pills">💊</span>

export default function MainFeed() {
  const [profiles, setProfiles] = useState<MBTIProfile[]>(mbtiProfiles)
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState('')
  const [comment, setComment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const currentProfile = profiles[currentProfileIndex]

  const handlePhotoLike = (photo: string) => {
    setSelectedPhoto(photo)
    setShowPhotoDialog(true)
  }

  const handleSendComment = () => {
    console.log('Sending comment:', comment)
    setComment('')
    setShowPhotoDialog(false)
  }

  const handleBack = () => {
    if (comment) {
      setShowConfirmation(true)
    } else {
      setShowPhotoDialog(false)
    }
  }

  const handleNextProfile = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length)
  }

  if (!currentProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ted</h1>
        <Button variant="ghost" size="icon" onClick={() => setShowFilters(true)}>
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile Card */}
      <div className="max-w-md mx-auto p-4">
        <Card className="overflow-hidden border-0 shadow-lg">
          {/* Basic Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">{currentProfile.name}</span>
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                  {currentProfile.mbti}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Scrollable ribbon with user details */}
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 py-1">
                <span>{currentProfile.age}</span>
                <span>{currentProfile.gender}</span>
                <span>{currentProfile.mbti}</span>
                <span>{currentProfile.location}</span>
                <span>{currentProfile.ethnicity || 'Not specified'}</span>
                <span>{currentProfile.hasKids ? 'Has kids' : 'No kids'}</span>
                <span>{currentProfile.wantsKids ? 'Wants kids' : "Doesn't want kids"}</span>
                <span>{currentProfile.pets || 'No pets'}</span>
                <span>{currentProfile.zodiac || 'Not specified'}</span>
                {currentProfile.vices?.drinks && <DrinkIcon />}
                {currentProfile.vices?.smokes && <SmokeIcon />}
                {currentProfile.vices?.weed && <WeedIcon />}
                {currentProfile.vices?.pills && <PillsIcon />}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Profile Content */}
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={currentProfile.photo}
                  alt={`${currentProfile.name}'s photo`}
                  className="w-full aspect-square object-cover"
                  onDoubleClick={() => handlePhotoLike(currentProfile.photo)}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute bottom-2 right-2 bg-white rounded-full"
                  onClick={() => handlePhotoLike(currentProfile.photo)}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="px-4 space-y-2">
                <div><strong>Bio:</strong> {currentProfile.bio}</div>
                <div><strong>Work:</strong> {currentProfile.work}</div>
                <div><strong>Education:</strong> {currentProfile.education}</div>
                <div><strong>Religion:</strong> {currentProfile.religion}</div>
                <div><strong>Politics:</strong> {currentProfile.politics}</div>
                <div><strong>Languages:</strong> {currentProfile.languages?.join(', ')}</div>
                <div><strong>Relationship Goal:</strong> {currentProfile.relationGoal}</div>
                <div><strong>Relationship Type:</strong> {currentProfile.relationType}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between p-4 border-t">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleNextProfile}>
              <X className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleNextProfile}>
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Age
              </Button>
              <Button variant="outline" className="w-full justify-start">
                MBTI Type
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Dialog */}
      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <img src={selectedPhoto} alt="Selected photo" className="w-full rounded-lg" />
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendComment}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <h2 className="text-lg font-semibold mb-4">Are you sure you want to go back?</h2>
          <p>If you go back, you will lose your response to this user.</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowConfirmation(false)
              setShowPhotoDialog(false)
              setComment('')
            }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

