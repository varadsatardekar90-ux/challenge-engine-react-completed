// // errorBoundary errorHandling notFound resetError errorTsx
// 'use client'

// export default function ErrorPage({
//   error,
//   reset,
// }: {
//   error: Error
//   reset: () => void
// }) {
//   return (
//     <main>
//       <h1>Something went wrong</h1>
//       <p>{error.message}</p>
//       <button onClick={reset}>Try again</button>
//     </main>
//   )
// }
// errorBoundary errorHandling notFound resetError errorTsx dynamicSegment useClient metadata
'use client'

export default function PostsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main>
      <h1>Failed to load posts</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  )
}