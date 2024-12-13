'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserProfile } from '../components/UserProfile'

const crushes = [
 { id: '1', name: 'Alice', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=634&q=80' },
 { id: '2', name: 'Bob', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=634&q=80' },
 { id: '3', name: 'Charlie', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=634&q=80' },
 { id: '4', name: 'Diana', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=634&q=80' },
]

export default function CrushesPage() {
 const [selectedCrush, setSelectedCrush] = useState(null)

 return (
   <div className="space-y-4">
     <h1 className="text-2xl font-bold mb-4">Your Crushes</h1>
     <div className="grid grid-cols-2 gap-4">
       {crushes.map((crush) => (
         <Card key={crush.id} className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setSelectedCrush(crush)}>
           <CardContent className="flex flex-col items-center p-4">
             <Avatar className="h-24 w-24 mb-2">
               <AvatarImage src={crush.avatar} alt={crush.name} />
               <AvatarFallback>{crush.name[0]}</AvatarFallback>
             </Avatar>
             <h2 className="font-semibold">{crush.name}</h2>
           </CardContent>
         </Card>
       ))}
     </div>

     <Dialog open={!!selectedCrush} onOpenChange={() => setSelectedCrush(null)}>
       <DialogContent className="max-w-md p-0">
         {selectedCrush && <UserProfile userId={selectedCrush.id} />}
       </DialogContent>
     </Dialog>
   </div>
 )
}

