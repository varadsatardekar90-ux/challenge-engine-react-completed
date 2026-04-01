// asyncServerComponent loadingTsx Suspense dynamicExport forceStaticOrDynamic forceDynamic cacheNoStore useServer revalidatePath revalidateTag revalidate fetchCache searchParams pagination metadata generateMetadata
import { Suspense } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Posts',
  description: 'Browse all posts',
}

type Post = {
  id: number
  title: string
  body: string
}

type Props = {
  searchParams: { q?: string; page?: string }
}

const PAGE_SIZE = 10

async function PostsPage({ searchParams }: Props) {
  let posts: Post[] = []

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 60 },
    } as RequestInit & { next: { revalidate: number } })
    posts = await res.json()
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Failed to load posts.</p>
        <Link href="/">Home</Link>
      </main>
    )
  }

  const q = searchParams.q ?? ''
  const page = Number(searchParams.page ?? 1)

  const filtered = q
    ? posts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    : posts

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main>
        <h1>Posts</h1>
        <form method="get">
          <input name="q" defaultValue={q} placeholder="Search posts..." />
          <button type="submit">Search</button>
        </form>
        <ul>
          {paginated.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
        <div>
          {page > 1 && (
            <Link href={`/posts?q=${q}&page=${page - 1}`}>Previous</Link>
          )}
          <span> Page {page} of {totalPages} </span>
          {page < totalPages && (
            <Link href={`/posts?q=${q}&page=${page + 1}`}>Next</Link>
          )}
        </div>
        <Link href="/">Home</Link>
      </main>
    </Suspense>
  )
}

export default PostsPage