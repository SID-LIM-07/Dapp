import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'

interface Category {
  id: string
  name: string
  image: string
}

const categories: Category[] = [
  { id: '1', name: 'Gaming', image: '/placeholder.svg?height=400&width=400' },
  { id: '2', name: 'Binge Watching', image: '/placeholder.svg?height=400&width=400' },
  { id: '3', name: 'Outgoing', image: '/placeholder.svg?height=400&width=400' },
  { id: '4', name: 'Creatives', image: '/placeholder.svg?height=400&width=400' },
  { id: '5', name: 'Foodies', image: '/placeholder.svg?height=400&width=400' },
  { id: '6', name: 'Music Lovers', image: '/placeholder.svg?height=400&width=400' },
  { id: '7', name: 'Fitness', image: '/placeholder.svg?height=400&width=400' },
  { id: '8', name: 'Travelers', image: '/placeholder.svg?height=400&width=400' },
  { id: '9', name: 'Pet Lovers', image: '/placeholder.svg?height=400&width=400' },
  { id: '10', name: 'Bookworms', image: '/placeholder.svg?height=400&width=400' },
  { id: '11', name: 'Tech Enthusiasts', image: '/placeholder.svg?height=400&width=400' },
  { id: '12', name: 'Sports Fans', image: '/placeholder.svg?height=400&width=400' },
  { id: '13', name: 'Art Lovers', image: '/placeholder.svg?height=400&width=400' },
  { id: '14', name: 'Nature Enthusiasts', image: '/placeholder.svg?height=400&width=400' },
  { id: '15', name: 'Fashionistas', image: '/placeholder.svg?height=400&width=400' },
  { id: '16', name: 'Entrepreneurs', image: '/placeholder.svg?height=400&width=400' },
]

interface ExploreProps {
  onCategorySelect: (category: Category) => void;
}

export function Explore({ onCategorySelect }: ExploreProps) {
  return (
    <div className="space-y-4">
      {/* Featured Category */}
      <Card className="w-full aspect-video overflow-hidden">
        <CardContent className="p-0 relative h-full">
          <Image
            src={categories[0].image}
            alt={categories[0].name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-2xl font-bold text-white">{categories[0].name}</h2>
          </div>
          <button
            className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => onCategorySelect(categories[0])}
          >
            <span className="text-white text-lg font-semibold">Explore {categories[0].name}</span>
          </button>
        </CardContent>
      </Card>

      {/* Category Grid */}
      <ScrollArea className="h-96">
        <div className="grid grid-cols-3 gap-4">
          {categories.slice(1).map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all hover:ring-2 hover:ring-primary"
              onClick={() => onCategorySelect(category)}
            >
              <CardContent className="p-0 aspect-square relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <p className="text-sm font-medium text-white">{category.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

