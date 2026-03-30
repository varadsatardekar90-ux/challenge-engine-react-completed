// // dynamicRoute params generateStaticParams errorHandling notFound errorTsx
// import { notFound } from 'next/navigation'
// import Link from 'next/link'

// type Props = {
//   params: { id: string }
// }

// type Post = {
//   id: number
//   title: string
//   body: string
// }

// export async function generateStaticParams() {
//   return Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }))
// }

// export default async function PostPage({ params }: Props) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params.id}`,
//     { cache: 'force-cache' }
//   )

//   if (!res.ok) {
//     notFound()
//   }

//   const post: Post = await res.json()

//   if (!post || !post.id) {
//     notFound()
//   }

//   return (
//     <main>
//       <h1>{post.title}</h1>
//       <p>{post.body}</p>
//       <Link href="/posts">Back to Posts</Link>
//     </main>
//   )
// }

// dynamicRoute params generateStaticParams errorHandling notFound errorTsx metadata generateMetadata fullstackCapstone clientComponent dynamicSegment useClient
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LikeButton from '../../components/LikeButton'

type Props = {
  params: { id: string }
}

type Post = {
  id: number
  title: string
  body: string
}

export async function generateMetadata({ params }: Props) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: 'force-cache' }
  )
  if (!res.ok) return { title: 'Post Not Found', description: 'This post does not exist.' }
  const post: Post = await res.json()
  return {
    title: post.title,
    description: post.body.slice(0, 100),
  }
}

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }))
}

export default async function PostPage({ params }: Props) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: 'force-cache' }
  )

  if (!res.ok) notFound()

  const post: Post = await res.json()

  if (!post || !post.id) notFound()

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <LikeButton />
      <br />
      <Link href="/posts">Back to Posts</Link>
    </main>
  )
}