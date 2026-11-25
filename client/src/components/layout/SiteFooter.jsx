import { Link, useLocation } from 'react-router-dom'
import { contact, credit, marketplaces, socials } from '../../data/site'

const SHOP = [
  { label: 'All products', to: '/shop' },
  { label: 'New arrivals', to: '/#new-arrivals' },
  { label: 'Best sellers', to: '/shop' },
  { label: 'Oversized Essential Tee', to: '/product/tshirt-01' },
  { label: 'Shop by colour', to: '/#shop-by-colour' },
]

const INFORMATION = [
  { label: 'About SNUG WRLD', to: '/about' },
  { label: 'Our philosophy', to: '/#brand-story' },
  { label: 'The SNUG difference', to: '/#snug-difference' },
  { label: 'Lifestyle lookbook', to: '/#world-of-snug' },
  { label: 'Customer reviews', to: '/#reviews' },
  { label: 'Contact us', to: '/contact' },
]

const CARE = [
  { label: 'Contact us', to: '/contact' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Shipping information', to: '/shipping' },
  { label: 'Returns & exchanges', to: '/returns' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms & conditions', to: '/terms' },
]

const linkClass =
  'relative inline-block text-[13px] text-[#D8CFC3] transition-colors duration-300 hover:text-[#F1E9DD] focus-visible:text-[#F1E9DD] focus-visible:outline-none after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#C6A98A] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none'

function FooterLink({ item }) {
  const location = useLocation()
  const hash = item.to.startsWith('/#') ? item.to.slice(2) : ''

  const onClick = (event) => {
    if (!hash || location.pathname !== '/') return
    const target = document.getElementById(hash)
    if (!target) return
    event.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top, behavior: 'smooth' })
    window.history.pushState(null, '', `/#${hash}`)
  }

  return (
    <Link to={item.to} onClick={onClick} className={linkClass}>
      {item.label}
    </Link>
  )
}

function Column({ title, items }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[11px] tracking-[0.22em] text-[#F1E9DD] uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SocialIcon({ name }) {
  const common = { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true', className: 'size-4' }
  if (name === 'Instagram') {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.6A4.4 4.4 0 1 0 16.4 12 4.4 4.4 0 0 0 12 7.6zm6.1-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" />
      </svg>
    )
  }
  if (name === 'YouTube') {
    return (
      <svg {...common}>
        <path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3z" />
      </svg>
    )
  }
  if (name === 'Facebook') {
    return (
      <svg {...common}>
        <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6.2-.7 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8A4.6 4.6 0 0 0 7.4 11c0 .9.3 1.8.7 2.3a.3.3 0 0 1 .1.3l-.3 1.1c0 .2-.2.3-.4.2-1.4-.6-2-2.2-2-4 0-3 2.5-6.6 7.5-6.6 4 0 6.6 2.9 6.6 6 0 4.1-2.3 7.2-5.7 7.2-1.1 0-2.2-.6-2.6-1.3l-.7 2.7a9.4 9.4 0 0 1-1.1 2.4A9 9 0 1 0 12 3z" />
    </svg>
  )
}

export default function SiteFooter() {
  const stores = marketplaces.filter((store) => store.href)

  return (
    <footer className="overflow-hidden bg-[#171513] px-5 py-14 text-[#F1E9DD] md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="max-w-sm">
          <Link to="/" className="block h-7 w-40 overflow-hidden" aria-label="SNUG WRLD">
            <img
              src="/images/branding/snug-wrld-logo.png"
              alt=""
              className="h-full w-full object-cover object-center brightness-0 invert"
            />
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.22em] text-[#F1E9DD] uppercase">Oversized streetwear.</p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#AAA197]">
            Discover everyday comfort through thoughtfully designed oversized essentials. Made for movement,
            expression and your everyday style.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Shop" items={SHOP} />
          <Column title="Information" items={INFORMATION} />
          <Column title="Customer care" items={CARE} />
          <address className="not-italic">
            <h2 className="text-[11px] tracking-[0.22em] text-[#F1E9DD] uppercase">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[13px] text-[#D8CFC3]">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className={linkClass}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>{contact.location}</li>
              {contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </address>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-8 border-t border-[#49423B] pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[11px] tracking-[0.22em] text-[#F1E9DD] uppercase">Follow the SNUG world.</h2>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#AAA197]">
            Stay connected for new drops, styling inspiration and everything SNUG.
          </p>
        </div>
        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.name}, placeholder profile`}
                className="flex size-10 items-center justify-center border border-[#5A5149] bg-transparent text-[#D8CFC3] transition-colors duration-300 hover:bg-[#F1E9DD] hover:text-[#171513] focus-visible:bg-[#F1E9DD] focus-visible:text-[#171513] focus-visible:outline-none motion-reduce:transition-none"
              >
                <SocialIcon name={social.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {stores.length > 0 && (
        <div className="mt-10">
          <h2 className="text-[11px] tracking-[0.22em] text-[#F1E9DD] uppercase">Find us online</h2>
          <ul className="mt-4 flex flex-wrap gap-6">
            {stores.map((store) => (
              <li key={store.name}>
                <a href={store.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {store.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 grid gap-4 border-t border-[#49423B] pt-6 text-center text-[11px] tracking-[0.14em] text-[#AAA197] uppercase md:grid-cols-3 md:items-center md:text-left">
        <p>© 2026 SNUG WRLD. All rights reserved.</p>
        <p className="md:text-center">
          Designed & developed by{' '}
          <a
            href={credit.href}
            target="_blank"
            rel="noreferrer"
            className="text-[#F1E9DD] underline-offset-4 transition-colors duration-300 hover:text-[#C6A98A] hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {credit.name}
          </a>
          .
        </p>
        <p className="flex justify-center gap-5 md:justify-end">
          <Link to="/privacy" className={linkClass}>
            Privacy policy
          </Link>
          <Link to="/terms" className={linkClass}>
            Terms & conditions
          </Link>
        </p>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none mt-10 text-center font-sans text-[clamp(4.2rem,13vw,10.5rem)] leading-none font-semibold tracking-[-0.045em] text-[#211E1B] select-none"
      >
        SNUG WRLD
      </p>
    </footer>
  )
}
