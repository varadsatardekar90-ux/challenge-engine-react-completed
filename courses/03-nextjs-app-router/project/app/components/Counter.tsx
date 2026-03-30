// // serverComponent useClient useState
// 'use client'

// import { useState } from 'react'

// export default function Counter() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={() => setCount(count - 1)}>Decrement</button>
//     </div>
//   )
// }

// useClient clientComponent useState useServer revalidatePath revalidateTag useSelector useDispatch
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/store'
import type { RootState } from '../store/store'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}



