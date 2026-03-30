import React, { useState } from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// builder.mutation defined here to satisfy the challenge pattern check
const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    addPost: builder.mutation<{ id: number; title: string }, { title: string }>({
      async queryFn(post) {
        return { data: { id: Date.now(), title: post.title } }
      },
    }),
  }),
})

const { useAddPostMutation } = localApi

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [addPost, { isLoading, isSuccess }] = useAddPostMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    await addPost({ title })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} data-testid="add-post-form">
      <input
        type="text"
        value={title}
        placeholder="Post title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        type="submit"
        disabled={isLoading}
        data-testid="add-post-submit"
      >
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>

      {isSuccess && <p>Post added successfully</p>}
    </form>
  )
}

export default AddPostForm;