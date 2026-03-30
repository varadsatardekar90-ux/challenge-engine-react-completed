// // notFound errorHandling errorTsx
// import Link from 'next/link'

// export default function NotFound() {
//   return (
//     <main>
//       <h1>404 - Page Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//       <Link href="/">Go Home</Link>
//     </main>
//   )
// }
// notFound errorHandling errorTsx dynamicSegment useClient metadata
import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go Home</Link>
    </main>
  )
}