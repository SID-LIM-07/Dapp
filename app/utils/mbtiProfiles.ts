export interface MBTIProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  mbti: string;
  photo: string;
  bio: string;
  location: string;
  ethnicity?: string;
  hasKids: boolean;
  wantsKids: boolean;
  pets?: string;
  zodiac?: string;
  vices?: {
    drinks?: boolean;
    smokes?: boolean;
    weed?: boolean;
    pills?: boolean;
  };
  work?: string;
  education?: string;
  religion?: string;
  politics?: string;
  languages?: string[];
  relationGoal?: string;
  relationType?: string;
}

export const mbtiProfiles: MBTIProfile[] = [
  {
    id: '1',
    name: 'Emma',
    age: 28,
    gender: 'Woman',
    mbti: 'INTJ',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    bio: 'Strategic thinker with a passion for innovation.',
    location: 'New York, NY',
    ethnicity: 'Caucasian',
    hasKids: false,
    wantsKids: true,
    pets: 'Cat lover',
    zodiac: 'Virgo',
    vices: { drinks: true, weed: true },
    work: 'Software Engineer',
    education: 'MIT',
    religion: 'Agnostic',
    politics: 'Moderate',
    languages: ['English', 'French'],
    relationGoal: 'Long-term',
    relationType: 'Monogamous'
  },
  {
    id: '2',
    name: 'Liam',
    age: 32,
    gender: 'Man',
    mbti: 'ENTP',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    bio: 'Curious explorer always ready for a debate.',
    location: 'San Francisco, CA',
    ethnicity: 'Mixed',
    hasKids: false,
    wantsKids: false,
    pets: 'Dog owner',
    zodiac: 'Aries',
    vices: { drinks: true, smokes: true },
    work: 'Startup Founder',
    education: 'Stanford University',
    religion: 'Atheist',
    politics: 'Liberal',
    languages: ['English', 'Spanish', 'Mandarin'],
    relationGoal: 'Casual',
    relationType: 'Open'
  },
  {
    id: '3',
    name: 'Olivia',
    age: 26,
    gender: 'Woman',
    mbti: 'ISFJ',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    bio: 'Nurturing soul with an eye for detail.',
    location: 'Chicago, IL',
    ethnicity: 'African American',
    hasKids: true,
    wantsKids: true,
    pets: 'Fish enthusiast',
    zodiac: 'Taurus',
    vices: { drinks: false },
    work: 'Nurse',
    education: 'University of Illinois',
    religion: 'Christian',
    politics: 'Conservative',
    languages: ['English'],
    relationGoal: 'Long-term',
    relationType: 'Monogamous'
  },
  // ... Add the remaining 13 MBTI profiles with similar detailed information
];

