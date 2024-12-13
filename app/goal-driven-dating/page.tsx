import Link from 'next/link'

export default function GoalDrivenDating() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Goal-Driven Dating</h1>
      <div className="space-y-4">
        <div className="border border-gray-300 rounded-lg p-2">
          <h2 className="font-bold">Short-term Goals</h2>
          <ul className="list-disc list-inside">
            <li>Go on 3 dates this month</li>
            <li>Improve conversation skills</li>
          </ul>
        </div>
        <div className="border border-gray-300 rounded-lg p-2">
          <h2 className="font-bold">Long-term Goals</h2>
          <ul className="list-disc list-inside">
            <li>Find a compatible partner</li>
            <li>Develop a meaningful relationship</li>
          </ul>
        </div>
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

