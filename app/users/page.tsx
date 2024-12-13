import { prisma } from '@/lib/prisma'

export default async function UsersPage() {
  const users = await prisma.user.findMany()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

