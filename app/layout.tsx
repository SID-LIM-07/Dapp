import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'Ted - A Meaningful Dating Experience',
 description: 'Find your perfect match with Ted, a dating app inspired by early Macintosh design.',
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <html lang="en">
     <body className={inter.className}>
       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
         <main className="container mx-auto px-4 py-8 pb-20">
           {children}
         </main>
         <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
  <div className="max-w-md mx-auto flex justify-around">
    <Link href="/main-feed" className="text-gray-500 hover:text-black">Feed</Link>
    <Link href="/matches" className="text-gray-500 hover:text-black">Matches</Link>
    <Link href="/profile" className="text-gray-500 hover:text-black">Profile</Link>
  </div>
</nav>
       </div>
     </body>
   </html>
 )
}

