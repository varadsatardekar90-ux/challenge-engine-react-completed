// useClient clientComponent useState useServer revalidatePath revalidateTag
'use client'

import { useState } from 'react'
import { addPost } from '../actions'

export default function AddPostForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(formData: FormData) {
    try {
      await addPost(formData)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <textarea name="body" placeholder="Body" required />
      <button type="submit">Add Post</button>
      {status === 'success' && <p>Post added!</p>}
      {status === 'error' && <p>Failed to add post.</p>}
    </form>
  )
}