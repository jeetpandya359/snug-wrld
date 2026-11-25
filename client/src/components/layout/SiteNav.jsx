import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { products } from '../../data/products'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/#rack' },
  { label: 'About Us', to: '/about' },
]

function useCartCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem('snug-wrld-cart')
        const items = raw ? JSON.parse(raw) : []
        const total = Array.isArray(items)
          ? items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
          : 0
        setCount(Number.isFinite(total) ? total : 0)
      } catch {
        setCount(0)
      }
    }

    read()
    window.addEventListener('storage', read)
    window.addEventListener('snug-cart-change', read)
    return () => {
      window.removeEventListener('storage', read)
      window.removeEventListener('snug-cart-change', read)
    }
  }, [])

  return count
}

function NavLabel({ link, onNavigate, large = false }) {
  const itemClass = `group relative inline-flex items-center py-1 uppercase transition-colors duration-300 ${
    large ? 'text-2xl tracking-[0.16em]' : 'text-[11px] tracking-[0.22em]'
  }`

  const underline = (active) => (
    <span
      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  )

  if (link.to.includes('#')) {
    return (
      <Link to={link.to} onClick={onNavigate} className={`${itemClass} text-ink/70 hover:text-ink`}>
        {link.label}
        {underline(false)}
      </Link>
    )
  }

  return (
    <NavLink
      to={link.to}
      end={link.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${itemClass} ${isActive ? 'text-ink' : 'text-ink/70 hover:text-ink'}`
      }
    >
      {({ isActive }) => (
        <>
          {link.label}
          {underline(isActive)}
        </>
      )}
    </NavLink>
  )
}

export default function SiteNav() {
  const location = useLocation()
  const cartCount = useCartCount()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products
      .filter((product) =>
        `${product.name} ${product.colorName}`.toLowerCase().includes(term),
      )
      .slice(0, 6)
  }, [query])

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[#F1EADF] text-ink transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-ink/15 shadow-[0_1px_0_rgba(26,25,22,0.04)]'
          : 'border-transparent shadow-none'
      }`}
    >
      <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-4 px-[2.75vw] lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="block h-7 w-40 shrink-0 overflow-hidden md:w-44" aria-label="SNUG WRLD">
          <img
            src="/images/branding/snug-wrld-logo.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLabel key={link.label} link={link} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4 md:gap-5">
          <button
            type="button"
            className="hidden transition-opacity duration-300 hover:opacity-60 lg:inline-flex"
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Search'}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <X strokeWidth={1.25} size={18} /> : <Search strokeWidth={1.25} size={18} />}
          </button>
          <button
            type="button"
            className="hidden transition-opacity duration-300 hover:opacity-60 lg:inline-flex"
            aria-label="Account"
          >
            <User strokeWidth={1.25} size={18} />
          </button>
          <Link to="/cart" aria-label="Shopping bag" className="relative transition-opacity duration-300 hover:opacity-60">
            <ShoppingBag strokeWidth={1.25} size={18} />
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] text-[#F1EADF]">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X strokeWidth={1.25} size={18} /> : <Menu strokeWidth={1.25} size={18} />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-ink/10 px-[2.75vw] py-4">
          <form
            className="flex items-center gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="site-search">
              Search the collection
            </label>
            <input
              id="site-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search colours"
              className="w-full border-0 border-b border-ink/20 bg-transparent py-2 text-sm tracking-[0.08em] uppercase outline-none placeholder:text-stone"
            />
            <button type="button" className="text-[10px] tracking-[0.18em] uppercase" onClick={() => setSearchOpen(false)}>
              Close
            </button>
          </form>
          {query.trim() ? (
            <ul className="mt-4 flex flex-col">
              {matches.length ? (
                matches.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center justify-between py-2 text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-60"
                    >
                      <span>{product.colorName}</span>
                      <span className="text-stone">{product.name}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-2 text-[11px] tracking-[0.16em] text-stone uppercase">No matching colours</li>
              )}
            </ul>
          ) : (
            <p className="mt-3 text-[11px] tracking-[0.16em] text-stone uppercase">Search the current colour collection</p>
          )}
        </div>
      ) : null}

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F1EADF] px-[2.75vw] lg:hidden">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="block h-7 w-40 overflow-hidden" aria-label="SNUG WRLD" onClick={() => setMenuOpen(false)}>
              <img src="/images/branding/snug-wrld-logo.png" alt="" className="h-full w-full object-cover object-center" />
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X strokeWidth={1.25} size={18} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-6" aria-label="Mobile">
            {LINKS.map((link) => (
              <NavLabel
                key={link.label}
                link={link}
                large
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </nav>
          <form className="mt-10" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="mobile-search">
              Search the collection
            </label>
            <input
              id="mobile-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search colours"
              className="w-full border-0 border-b border-ink/20 bg-transparent py-2 text-sm tracking-[0.08em] uppercase outline-none placeholder:text-stone"
            />
          </form>
        </div>
      ) : null}
    </header>
  )
}
