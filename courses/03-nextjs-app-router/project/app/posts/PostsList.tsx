// useClient clientComponent useState useQuery useMutation createApi fetchBaseQuery rtkQuery
'use client'

import { useGetPostsQuery } from '../store/apiSlice'

export default function PostsList() {
  const { data: posts, isLoading, isError } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load posts.</p>

  return (
    <ul>
      {posts?.slice(0, 10).map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}
