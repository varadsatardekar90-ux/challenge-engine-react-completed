// useClient clientComponent useState useSelector useDispatch
'use client'

import { useState } from 'react'

export default function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  function handleLike() {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {likes} {likes === 1 ? 'Like' : 'Likes'}
    </button>
  )
}