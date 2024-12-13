'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const questions = [
  {
    title: "1. Are you outwardly or inwardly focused?",
    pairs: [
      ["You prefer quiet, private settings", "You enjoy talking and interacting with others"],
      ["You feel more comfortable in calm and slower-paced environments", "You feel energized in busy and active environments"],
      ["You like thinking through ideas on your own", "You prefer discussing ideas with people to process them"],
      ["You enjoy observing rather than participating actively", "You feel comfortable being the focus of attention"]
    ]
  },
  {
    title: "2. How do you prefer to take in information?",
    pairs: [
      ["You focus on what is happening around you in the moment", "You think about possibilities and how things could be different"],
      ["You pay attention to facts and details", "You notice patterns and connections between ideas"],
      ["You prefer ideas that have practical and clear outcomes", "You enjoy exploring creative and conceptual ideas"],
      ["You like describing things in straightforward and specific ways", "You describe things in imaginative or figurative ways"]
    ]
  },
  {
    title: "3. How do you prefer to make decisions?",
    pairs: [
      ["You rely on logic and reasoning to make decisions", "You consider the impact of decisions on others"],
      ["You believe fairness and consistency are important", "You value harmony and creating positive relationships"],
      ["You enjoy analyzing situations and solving problems", "You focus on understanding and supporting people"],
      ["You tend to approach decisions in a calm and rational way", "You approach decisions with warmth and empathy"]
    ]
  },
  {
    title: "4. How do you prefer to live your outer life?",
    pairs: [
      ["You like having plans and knowing what to expect", "You prefer keeping options open and adapting as needed"],
      ["You prefer sticking to schedules and meeting deadlines", "You see schedules and deadlines as flexible"],
      ["You enjoy clear instructions and step-by-step processes", "You like improvising and going with the flow"],
      ["You feel more at ease in organized and structured environments", "You enjoy exploring new and unexpected opportunities"]
    ]
  },
  {
    title: "5. How Do You Respond to Challenges?",
    questions: [
      "You generally feel confident handling unexpected challenges.",
      "You remain calm and collected under pressure.",
      "You rarely doubt your abilities or decisions.",
      "You feel secure in your direction even if others question it."
    ]
  }
];

const mbtiExplanations = {
  "ISTJ": "ISTJs are responsible, practical, and orderly. They value stability, clear rules, and take pride in reliability.",
  "ISFJ": "ISFJs are warm, supportive, and detail-oriented. They enjoy helping others and maintaining harmonious environments.",
  "INFJ": "INFJs are empathetic visionaries who seek meaningful connections. They combine insight with a desire to help others grow.",
  "INTJ": "INTJs are strategic, independent thinkers who love understanding complex systems and striving for improvement.",
  "ISTP": "ISTPs are curious, adaptable problem-solvers. They prefer hands-on exploration and learning through experience.",
  "ISFP": "ISFPs are gentle, creative souls who value authenticity and compassion.",
  "INFP": "INFPs are idealistic, thoughtful, and caring. They search for deeper meaning and strive to align with their values.",
  "INTP": "INTPs are analytical, innovative thinkers who love exploring concepts and theories.",
  "ESTP": "ESTPs are energetic, action-oriented, and practical. They handle challenges swiftly and adapt on the go.",
  "ESFP": "ESFPs are lively, sociable, and spontaneous. They enjoy enriching experiences and making others feel included.",
  "ENFP": "ENFPs are enthusiastic, imaginative, and people-focused. They see potential in every idea and person.",
  "ENTP": "ENTPs are curious, witty, and love intellectual exploration. They enjoy debating and challenging norms.",
  "ESTJ": "ESTJs are organized, responsible leaders who value efficiency and logical order.",
  "ESFJ": "ESFJs are caring, supportive, and community-minded, fostering harmony and cooperation.",
  "ENFJ": "ENFJs are empathetic, encouraging, and driven to help others grow and thrive.",
  "ENTJ": "ENTJs are confident, strategic leaders who excel at planning, decision-making, and motivating others"
};

interface MBTISurveyProps {
  onComplete: (result: string) => void;
}

export function MBTISurvey({ onComplete }: MBTISurveyProps) {
  const [answers, setAnswers] = useState<number[][]>(questions.map(q => q.pairs ? new Array(q.pairs.length).fill(0) : new Array(q.questions!.length).fill(0)));
  const [result, setResult] = useState<string | null>(null);

  const handleSliderChange = (sectionIndex: number, questionIndex: number, value: number[]) => {
    const newAnswers = [...answers];
    newAnswers[sectionIndex][questionIndex] = value[0];
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const dimensions = ['EI', 'SN', 'TF', 'JP'];
    let mbti = '';
    
    for (let i = 0; i < 4; i++) {
      const total = answers[i].reduce((sum, val) => sum + val, 0);
      mbti += total > 0 ? dimensions[i][1] : dimensions[i][0];
    }

    const atTotal = answers[4].reduce((sum, val) => sum + val, 0);
    const at = atTotal > 0 ? 'A' : 'T';

    const fullType = mbti + '-' + at;
    setResult(fullType);
    onComplete(fullType);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>MBTI Survey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            {section.pairs ? (
              section.pairs.map((pair, questionIndex) => (
                <div key={questionIndex} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{pair[0]}</span>
                    <span>{pair[1]}</span>
                  </div>
                  <Slider
                    min={-5}
                    max={5}
                    step={1}
                    value={[answers[sectionIndex][questionIndex]]}
                    onValueChange={(value) => handleSliderChange(sectionIndex, questionIndex, value)}
                  />
                </div>
              ))
            ) : (
              section.questions!.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-2">
                  <p className="text-sm">{question}</p>
                  <Slider
                    min={-5}
                    max={5}
                    step={1}
                    value={[answers[sectionIndex][questionIndex]]}
                    onValueChange={(value) => handleSliderChange(sectionIndex, questionIndex, value)}
                  />
                </div>
              ))
            )}
          </div>
        ))}
        <Button onClick={calculateResult} className="w-full">Get Results</Button>
        {result && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Your MBTI Type: {result}</h3>
            <p className="mt-2">{mbtiExplanations[result.slice(0, 4) as keyof typeof mbtiExplanations]}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

