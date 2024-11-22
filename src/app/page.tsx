import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Dating App</h1>
      <p className="text-xl text-gray-700 mb-4">
        Discover meaningful connections based on your preferences.
      </p>
      <div className="space-x-4">
        <Link href="/auth" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Login
        </Link>
        <Link href="/profile" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Profile
        </Link>
        <Link href="/matchmaking" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
          Matchmaking
        </Link>
      </div>
    </main>
  );
}
