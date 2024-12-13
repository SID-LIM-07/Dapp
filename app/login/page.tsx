'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc"
import { fetchApi } from '../utils/api'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetchApi('login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      if (response.success) {
        localStorage.setItem('currentUser', username);
        router.push('/profile');
      } else {
        // Handle login error
        console.error('Login failed:', response.error);
        alert('Login failed: ' + response.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto mac-window fade-in">
        <CardHeader className="text-center">
          <CardTitle className="elegant-title">Ted</CardTitle>
          <CardDescription>Where meaningful connections bloom</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              className="mac-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className="mac-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              className="w-full mac-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full mac-button"
              onClick={() => router.push('/signup')}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

