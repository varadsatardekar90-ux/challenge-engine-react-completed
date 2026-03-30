// useServer serverAction revalidatePath revalidateTag revalidate fetchCache
'use server'

import { revalidatePath } from 'next/cache'

type PostInput = {
  title: string
  body: string
}

export async function addPost(formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string

  const input: PostInput = { title, body }

  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  revalidatePath('/posts')
}