import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-paper px-8 text-ink">
      <p className="text-xs tracking-[0.28em] text-stone uppercase">SNUG WRLD</p>
      <h1 className="mt-4 text-4xl font-medium">Page not found</h1>
      <Link to="/" className="mt-6 underline underline-offset-4">
        Back home
      </Link>
    </main>
  )
}
