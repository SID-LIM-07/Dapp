import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle } from 'lucide-react'

interface UserProfileProps {
  userId: string
}

const DrinkIcon = () => <span title="Drinks alcohol">🍷</span>
const SmokeIcon = () => <span title="Smokes cigarettes">🚬</span>
const WeedIcon = () => <span title="Smokes weed">🌿</span>
const PillsIcon = () => <span title="Takes recreational pills">💊</span>

export function UserProfile({ userId }: UserProfileProps) {
  // This would typically fetch user data based on the userId
  const user = {
    name: "Kris",
    age: 24,
    gender: "Woman",
    sexuality: "Straight",
    height: "5'7\"",
    location: "New York, NY",
    ethnicity: "Black",
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
    education: "University of Regina",
    religion: "Catholic",
    politics: "Moderate",
    languages: ["English", "French"],
    relationGoal: "Long-term",
    relationType: "Monogamous",
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    prompts: [
      {
        question: "My therapist would say I",
        answer: "Need a therapist"
      },
      {
        question: "This year, I really want to",
        answer: "The year is already over. We'll try again next year"
      },
      {
        question: "My favorite type of date is",
        answer: "A picnic in the park"
      }
    ]
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{user.name}</span>
          <span className="text-sm font-normal bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            Verified
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh]">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2">
              <span className="text-sm text-gray-500">{user.age}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500">{user.gender}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500">{user.sexuality}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500">{user.height}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500">{user.location}</span>
            </div>

            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 py-1">
                <span>{user.ethnicity}</span>
                <span>{user.hasKids ? 'Has kids' : 'No kids'}</span>
                <span>{user.wantsKids ? 'Wants kids' : "Doesn't want kids"}</span>
                <span>{user.pets}</span>
                <span>{user.zodiac}</span>
                <span>{user.mbti}</span>
                {user.vices.drinks && <DrinkIcon />}
                {user.vices.smokes && <SmokeIcon />}
                {user.vices.weed && <WeedIcon />}
                {user.vices.pills && <PillsIcon />}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {user.photos.map((photo, index) => (
              <div key={index} className="space-y-4">
                <div className="relative">
                  <img
                    src={photo}
                    alt={`${user.name}'s photo ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
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
                  <div className="space-y-2 text-sm">
                    <div><strong>Work:</strong> {user.work}</div>
                    <div><strong>Education:</strong> {user.education}</div>
                    <div><strong>Religion:</strong> {user.religion}</div>
                    <div><strong>Politics:</strong> {user.politics}</div>
                    <div><strong>Languages:</strong> {user.languages.join(', ')}</div>
                    <div><strong>Relationship Goal:</strong> {user.relationGoal}</div>
                    <div><strong>Relationship Type:</strong> {user.relationType}</div>
                  </div>
                )}

                {user.prompts[index] && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">{user.prompts[index].question}</h3>
                    <p className="text-xl font-serif">{user.prompts[index].answer}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

