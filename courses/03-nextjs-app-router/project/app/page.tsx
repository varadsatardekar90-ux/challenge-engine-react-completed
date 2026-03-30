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

// appDirectory fileBasedRouting serverComponent useClient useState dynamicExport forceStaticOrDynamic nextImage nextFont
import Link from 'next/link'
import Image from 'next/image'
import Counter from './components/Counter'

export const dynamic = 'force-static'

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