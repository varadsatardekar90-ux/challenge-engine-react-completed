// createApi fetchBaseQuery useQuery useMutation rtkQuery
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Post = {
  id: number
  title: string
  body: string
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = postsApi