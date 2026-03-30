// // appDirectory fileBasedRouting serverComponent
// import Link from 'next/link'

// export default function AboutPage() {
//   return (
//     <main>
//       <h1>About</h1>
//       <Link href="/">Home</Link>
//     </main>
//   )
// }

// appDirectory fileBasedRouting serverComponent dynamicRendering forceStatic forceDynamic
import Link from 'next/link'

export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </main>
  )
}