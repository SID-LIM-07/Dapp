'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'
import { MBTISurvey } from '../components/MBTISurvey'
import { fetchApi, uploadImage } from '../utils/api'

const hobbies = [
  "Reading", "Traveling", "Cooking", "Photography", "Hiking", "Painting",
  "Gaming", "Yoga", "Dancing", "Gardening", "Writing", "Cycling",
  "Fishing", "Knitting", "Surfing", "Skiing", "Meditation", "Birdwatching"
]

interface UserProfile {
  username: string;
  name: string;
  birthdate: string;
  zodiac: string;
  mbti: string | null;
  bio: string;
  location: string;
  photos: string[];
  hobbies: string[];
}

export default function EditProfilePage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [showHobbies, setShowHobbies] = useState(false)
  const [showMBTISurvey, setShowMBTISurvey] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    name: '',
    birthdate: '',
    zodiac: '',
    mbti: null,
    bio: '',
    location: '',
    photos: [],
    hobbies: []
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('currentUser');
        if (username) {
          const userData = await fetchApi(`profile?username=${username}`);
          setProfile(userData);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const toggleHobby = (hobby: string) => {
    setProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }))
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const uploadResult = await uploadImage(file);
        setProfile(prev => ({
          ...prev,
          photos: [...prev.photos, uploadResult.url]
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdate = e.target.value;
    const zodiac = calculateZodiac(new Date(birthdate));
    setProfile(prev => ({ ...prev, birthdate, zodiac }));
  }

  const calculateZodiac = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  }

  const handleMBTIComplete = (result: string) => {
    setProfile(prev => ({ ...prev, mbti: result }));
    setShowMBTISurvey(false);
  }

  const handleSave = async () => {
    try {
      await fetchApi('profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Your Profile</h1>
        <div className="space-x-2">
          <Button onClick={() => setShowPreview(true)}>Preview</Button>
          <Button onClick={handleSave}>Done</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold">{profile.name}</CardTitle>
            <Button
              onClick={() => setIsVerified(!isVerified)}
              variant={isVerified ? "default" : "outline"}
            >
              {isVerified ? "Verified" : "Verify"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={profile.name !== ''}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate</label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={profile.birthdate}
                onChange={handleBirthdateChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Zodiac Sign</label>
              <Input value={profile.zodiac} disabled />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">MBTI Type</label>
              <div className="flex items-center space-x-2">
                <Input value={profile.mbti || ''} disabled />
                <Button onClick={() => setShowMBTISurvey(true)}>Take MBTI Survey</Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Input
                id="location"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Photos</h3>
              <div className="grid grid-cols-3 gap-4">
                {profile.photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center relative">
                    <img
                      src={photo}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                <div className="aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Button variant="outline">Add Photo</Button>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <Badge key={hobby} variant="secondary">
                    {hobby}
                    <button onClick={() => toggleHobby(hobby)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="outline" onClick={() => setShowHobbies(true)}>+ Add</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hobbies Dialog */}
      <Dialog open={showHobbies} onOpenChange={setShowHobbies}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Hobbies</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid grid-cols-2 gap-2">
              {hobbies.map((hobby) => (
                <Button
                  key={hobby}
                  variant={profile.hobbies.includes(hobby) ? "default" : "outline"}
                  onClick={() => toggleHobby(hobby)}
                >
                  {hobby}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* MBTI Survey Dialog */}
      <Dialog open={showMBTISurvey} onOpenChange={setShowMBTISurvey}>
        <DialogContent className="sm:max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>MBTI Survey</DialogTitle>
          </DialogHeader>
          <MBTISurvey onComplete={handleMBTIComplete} />
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {profile.photos.length > 0 && (
              <img
                src={profile.photos[0]}
                alt="Profile"
                className="w-full aspect-square object-cover rounded-lg"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p>{profile.zodiac} • {profile.mbti || 'MBTI not set'}</p>
              <p>{profile.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">About</h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3 className="font-semibold">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <Badge key={hobby} variant="secondary">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

