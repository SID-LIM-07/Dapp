'use client'

import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Compass } from 'lucide-react'
import { Explore } from '../components/Explore'

interface User {
  id: string
  name: string
  age: number
  location: string
  bio: string
  image: string
  categories: string[]
}

interface Category {
  id: string
  name: string
  image: string
}

const allUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    age: 28,
    location: 'New York, NY',
    bio: 'Gamer girl and coffee enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=634&q=80',
    categories: ['Gaming', 'Foodies']
  },
  {
    id: '2',
    name: 'Bob',
    age: 32,
    location: 'Los Angeles, CA',
    bio: 'Musician and binge-watcher',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=634&q=80',
    categories: ['Music Lovers', 'Binge Watching']
  },
  // Add more users with various categories
]

export default function SpeedDatePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastDirection, setLastDirection] = useState<string>()
  const [showExplore, setShowExplore] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers)

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    config: { friction: 50, tension: 200 }
  }))

  useEffect(() => {
    if (selectedCategory) {
      const newFilteredUsers = allUsers.filter(user => 
        user.categories.includes(selectedCategory.name)
      )
      setFilteredUsers(newFilteredUsers)
      setCurrentIndex(0)
    } else {
      setFilteredUsers(allUsers)
    }
  }, [selectedCategory])

  const bind = useDrag(({ movement: [mx], down, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2
    const dir = xDir < 0 ? -1 : 1
    if (!down && trigger) swipe(dir)
    set({
      x: down ? mx : 0,
      rotation: mx / 10,
      scale: down ? 1.1 : 1,
      immediate: name => down && name === 'x'
    })
  })

  const swipe = (direction: number) => {
    setCurrentIndex(prevIndex => prevIndex + 1)
    setLastDirection(direction === 1 ? 'right' : 'left')
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setShowExplore(false)
  }

  const currentUser = filteredUsers[currentIndex % filteredUsers.length]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            {selectedCategory ? selectedCategory.name : 'Speed Date'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">New York, NY</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExplore(!showExplore)}
            >
              <Compass className="w-5 h-5 mr-1" />
              Explore
            </Button>
          </div>
        </div>

        {showExplore ? (
          <Explore onCategorySelect={handleCategorySelect} />
        ) : (
          <>
            {/* Swipeable Card */}
            <animated.div {...bind()} style={{ x: props.x, rotate: props.rotation, scale: props.scale }} className="cursor-grab active:cursor-grabbing">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={currentUser.image} alt={currentUser.name} className="w-full h-[60vh] object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                      <h2 className="text-2xl font-semibold">{currentUser.name}, {currentUser.age}</h2>
                      <p className="text-sm">{currentUser.location}</p>
                      <p className="mt-2">{currentUser.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </animated.div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => swipe(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full bg-white border-2 border-green-500 text-green-500 hover:bg-green-50"
                onClick={() => swipe(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>
            </div>

            {lastDirection && (
              <div className="text-center mt-4">
                You swiped {lastDirection}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

