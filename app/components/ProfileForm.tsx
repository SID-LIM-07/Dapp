'use client'

import { useState } from 'react'
import { fetchApi, uploadImage } from '../utils/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    mbti: '',
    bio: '',
    location: '',
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      let photoUrl = ''
      if (photo) {
        const uploadResult = await uploadImage(photo)
        photoUrl = uploadResult.url
      }

      const userData = {
        ...formData,
        age: parseInt(formData.age),
        photoUrl,
      }

      const user = await fetchApi('profile', {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: '',
        mbti: '',
        bio: '',
        location: '',
      })
      setPhoto(null)
    } catch (err) {
      setError('An error occurred while creating the profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <Input
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
          <Input
            name="mbti"
            placeholder="MBTI Type"
            value={formData.mbti}
            onChange={handleChange}
            required
          />
          <Textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">Profile created successfully!</p>}
      </CardContent>
    </Card>
  )
}

