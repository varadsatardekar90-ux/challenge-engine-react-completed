// forceDynamic cacheNoStore
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type User = {
  id: number
  name: string
  email: string
}

export default async function DashboardPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  })
  const users: User[] = await res.json()

  return (
    <main>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} — {user.email}</li>
        ))}
      </ul>
      <Link href="/">Home</Link>
    </main>
  )
}