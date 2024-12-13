import Link from 'next/link'

export default function SocialHierarchy() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Social/Dominance Hierarchy</h1>
      <div className="space-y-4">
        {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((level, index) => (
          <div key={level} className="border border-gray-300 rounded-lg p-2">
            <h2 className="font-bold">{level}</h2>
            <p className="text-sm text-gray-500">Level {index + 1}</p>
          </div>
        ))}
      </div>
      <Link 
        href="/main-feed" 
        className="bg-black text-white px-4 py-2 rounded-lg mt-4 block text-center"
      >
        Back to Feed
      </Link>
    </div>
  )
}

