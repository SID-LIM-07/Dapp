'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, ArrowLeft, ImageIcon } from 'lucide-react'

interface ChatInterfaceProps {
  match: {
    id: string
    name: string
    avatar: string
  }
  onProfileClick: () => void
  onBack: () => void
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'match'
  timestamp: Date
  image?: string
}

export function ChatInterface({ match, onProfileClick, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulating fetching previous messages
    const fetchedMessages: Message[] = [
      { id: '1', text: 'Hey there!', sender: 'match', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: '2', text: 'Hi! How are you?', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
      { id: '3', text: 'I\'m doing great, thanks for asking! How about you?', sender: 'match', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    ]
    setMessages(fetchedMessages)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      simulateResponse()
    }
  }

  const simulateResponse = () => {
    setIsTyping(true)
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now().toString(),
        text: 'Thanks for your message! I\'ll get back to you soon.',
        sender: 'match',
        timestamp: new Date()
      }
      setMessages(prevMessages => [...prevMessages, responseMessage])
      setIsTyping(false)
    }, 3000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: 'Sent an image',
          sender: 'user',
          timestamp: new Date(),
          image: reader.result as string
        }
        setMessages([...messages, newMessage])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={onProfileClick}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={match.avatar} alt={match.name} />
            <AvatarFallback>{match.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{match.name}</h2>
        </div>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[70%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg p-2`}>
              {message.image ? (
                <img src={message.image} alt="Uploaded" className="max-w-full rounded" />
              ) : (
                <p>{message.text}</p>
              )}
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-200 rounded-lg p-2">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Button variant="ghost" size="icon" as="span">
            <ImageIcon className="h-5 w-5" />
          </Button>
        </label>
        <Input 
          className="flex-grow" 
          placeholder="Type a message..." 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

