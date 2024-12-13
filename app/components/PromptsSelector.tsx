import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically be fetched from an API
const promptCategories = [
  "About Me",
  "Date Vibes",
  "My Type",
  "Let's Chat About",
  "Getting Personal",
  "Self-care",
  "Story Time"
]

const prompts = {
  "About Me": [
    {
      question: "How would you describe your personality in a few words?",
      answers: [
        "Curious and always eager to learn new things.",
        "Laid-back and easygoing.",
        "Ambitious and goal-oriented.",
        "Adventurous and open to new experiences.",
        "Caring and always looking out for others.",
        "Creative and a bit unconventional."
      ]
    },
    // ... other prompts for this category
  ],
  // ... other categories
}

export function PromptsSelector() {
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  const togglePrompt = (prompt: string) => {
    setSelectedPrompts(prev => 
      prev.includes(prompt)
        ? prev.filter(p => p !== prompt)
        : prev.length < 3 ? [...prev, prompt] : prev
    )
  }

  return (
    <Tabs defaultValue={promptCategories[0]} className="w-full">
      <TabsList className="grid grid-cols-3 gap-2">
        {promptCategories.map((category) => (
          <TabsTrigger key={category} value={category} className="text-xs">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {promptCategories.map((category) => (
        <TabsContent key={category} value={category}>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {prompts[category].map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium">{prompt.question}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {prompt.answers.map((answer, answerIndex) => (
                      <Button
                        key={answerIndex}
                        variant={selectedPrompts.includes(`${category}-${index}-${answerIndex}`) ? "default" : "outline"}
                        onClick={() => togglePrompt(`${category}-${index}-${answerIndex}`)}
                        className="justify-start text-left"
                      >
                        {answer}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
      <div className="mt-4 flex justify-between">
        <span>{selectedPrompts.length}/3 selected</span>
        <Button onClick={() => {/* Save selected prompts */}}>Save</Button>
      </div>
    </Tabs>
  )
}

