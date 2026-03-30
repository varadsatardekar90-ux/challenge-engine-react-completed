import React from 'react'
import { useGetPostByIdQuery } from '../api/apiSlice'

interface Props {
  postId?: number
}

const PostDetail: React.FC<Props> = ({ postId }) => {
  const { data, isLoading, error } = useGetPostByIdQuery(postId as number, {
    skip: !postId,
  })

  if (!postId) {
    return <div>No Post Selected</div>
  }

  if (isLoading) {
    return <div data-testid="post-detail-loading">Loading...</div>
  }

  if (error) {
    return <div data-testid="post-detail-error">Error loading post</div>
  }

  return (
    <div data-testid="post-detail">
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  )
}

export default PostDetail