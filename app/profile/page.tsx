'use client'

import { Button } from "@/components/ui/button"
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <Button 
          className="w-full" 
          onClick={() => router.push('/edit-profile')}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        <Button 
          className="w-full" 
          onClick={() => router.push('/view-profile')}
        >
          View My Profile
        </Button>
      </div>
    </div>
  )
}

