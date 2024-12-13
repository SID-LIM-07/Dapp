'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, MessageCircle } from 'lucide-react'

const DrinkIcon = () => <span title="Drinks alcohol">🍷</span>
const SmokeIcon = () => <span title="Smokes cigarettes">🚬</span>
const WeedIcon = () => <span title="Smokes weed">🌿</span>
const PillsIcon = () => <span title="Takes recreational pills">💊</span>

const userProfile = {
  name: "John Doe",
  age: 24,
  gender: "Man",
  sexuality: "Straight",
  height: "6'0\"",
  location: "New York, NY",
  ethnicity: "White",
  hasKids: false,
  wantsKids: true,
  pets: "Dog lover",
  zodiac: "Libra",
  mbti: "INFJ",
  vices: {
    drinks: true,
    smokes: false,
    weed: true,
    pills: false
  },
  work: "Software Engineer",
  education: "University of New York",
  religion: "Agnostic",
  politics: "Moderate",
  languages: ["English", "Spanish"],
  relationGoal: "Long-term",
  relationType: "Monogamous",
  photos: [
    "https://source.unsplash.com/random/300x300?man&sig=1",
    "https://source.unsplash.com/random/300x300?man&sig=2",
    "https://source.unsplash.com/random/300x300?man&sig=3"
  ],
  prompts: [
    {
      question: "My ideal first date",
      answer: "A cozy coffee shop followed by a walk in the park"
    },
    {
      question: "One thing I'm looking for",
      answer: "Someone who can make me laugh and think deeply"
    },
    {
      question: "My favorite travel story",
      answer: "Getting lost in Tokyo and stumbling upon the most amazing ramen shop"
    }
  ]
}

export default function ViewProfilePage() {
  const [photos, setPhotos] = useState(userProfile.photos)

  useEffect(() => {
    // In a real app, you'd fetch the user's profile data here
    const storedPhotos = localStorage.getItem('userPhotos')
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <Card className="overflow-hidden border-0 shadow-lg">
          {/* Basic Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">{userProfile.name}</span>
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                  {userProfile.mbti}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Scrollable ribbon with user details */}
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 py-1">
                <span>{userProfile.age}</span>
                <span>{userProfile.gender}</span>
                <span>{userProfile.sexuality}</span>
                <span>{userProfile.height}</span>
                <span>{userProfile.location}</span>
                <span>{userProfile.ethnicity}</span>
                <span>{userProfile.hasKids ? 'Has kids' : 'No kids'}</span>
                <span>{userProfile.wantsKids ? 'Wants kids' : "Doesn't want kids"}</span>
                <span>{userProfile.pets}</span>
                <span>{userProfile.zodiac}</span>
                <span>{userProfile.mbti}</span>
                {userProfile.vices.drinks && <DrinkIcon />}
                {userProfile.vices.smokes && <SmokeIcon />}
                {userProfile.vices.weed && <WeedIcon />}
                {userProfile.vices.pills && <PillsIcon />}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Profile Content */}
          <div className="space-y-4">
            {photos.map((photo, index) => (
              <div key={index} className="space-y-4">
                <div className="relative">
                  <img
                    src={photo}
                    alt={`${userProfile.name}'s photo ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute bottom-2 right-2 bg-white rounded-full"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                {index === 0 && (
                  <div className="px-4 space-y-2">
                    <div><strong>Work:</strong> {userProfile.work}</div>
                    <div><strong>Education:</strong> {userProfile.education}</div>
                    <div><strong>Religion:</strong> {userProfile.religion}</div>
                    <div><strong>Politics:</strong> {userProfile.politics}</div>
                    <div><strong>Languages:</strong> {userProfile.languages.join(', ')}</div>
                    <div><strong>Relationship Goal:</strong> {userProfile.relationGoal}</div>
                    <div><strong>Relationship Type:</strong> {userProfile.relationType}</div>
                  </div>
                )}

                {userProfile.prompts[index] && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">{userProfile.prompts[index].question}</h3>
                    <p className="text-xl font-serif">{userProfile.prompts[index].answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

