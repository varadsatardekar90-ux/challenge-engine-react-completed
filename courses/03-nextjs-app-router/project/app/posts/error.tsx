// errorBoundary errorHandling notFound resetError errorTsx
'use client'

export default function PostsError({
    error,
    reset,
}:{
    error:Error
    reset: () => void

}) {
    return(
        <main>
        <h1>Failed to load posts</h1>
        <p>{error.message}</p>
        <button onClick={reset}> Try Again</button>
        </main>
    )
}