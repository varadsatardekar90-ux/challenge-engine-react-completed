// // appDirectory fileBasedRouting serverComponent
// import Link from 'next/link'

// export default function Page() {
//   return (
//     <main>
//       <h1>Home</h1>
//       <Link href="/about">About</Link>
//     </main>
//   )
// }

// // appDirectory fileBasedRouting serverComponent useClient useState
// import Link from 'next/link'
// import Counter from './components/Counter'

// export default function Page() {
//   return (
//     <main>
//       <h1>Home</h1>
//       <Link href="/about">About</Link>
//       <Counter />
//     </main>
//   )
// }

// appDirectory fileBasedRouting serverComponent useClient useState dynamicExport forceStaticOrDynamic nextImage nextFont metadata generateMetadata
import Link from 'next/link'
import Image from 'next/image'
import Counter from './components/Counter'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Home',
  description: 'Welcome to the Next.js App Router home page',
}

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      <Image
        src="https://placehold.co/600x400/png"
        alt="Placeholder image"
        width={600}
        height={400}
      />
      <Link href="/about">About</Link>
      <Counter />
    </main>
  )
}