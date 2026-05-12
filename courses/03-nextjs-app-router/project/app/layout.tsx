// // appDirectory fileBasedRouting serverComponent
// import Link from 'next/link'

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <nav>
//           <Link href="/">Home</Link>
//           <Link href="/about">About</Link>
//         </nav>
//         {children}
//       </body>
//     </html>
//   )
// }

// // appDirectory fileBasedRouting serverComponent useClient useState
// import Link from 'next/link'

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <nav>
//           <Link href="/">Home</Link>
//           <Link href="/about">About</Link>
//         </nav>
//         {children}
//       </body>
//     </html>
//   )
// }

// // appDirectory fileBasedRouting serverComponent useClient useState dynamicExport forceStaticOrDynamic metadata generateMetadata nextFont nextImage
// import Link from 'next/link'
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Next.js App',
//   description: 'A Next.js App Router application',
//   openGraph: {
//     title: 'Next.js App',
//     description: 'A Next.js App Router application',
//   },
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <nav>
//           <Link href="/">Home</Link>
//           <Link href="/about">About</Link>
//         </nav>
//         {children}
//       </body>
//     </html>
//   )
// }

