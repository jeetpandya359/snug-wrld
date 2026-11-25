import { useLocation } from 'react-router-dom'

const PAGES = {
  '/faqs': {
    title: 'FAQs',
    copy: 'Placeholder page. Answers about fit, care and orders will be published here.',
  },
  '/shipping': {
    title: 'Shipping information',
    copy: 'Placeholder page. Delivery times and shipping details will be published here.',
  },
  '/returns': {
    title: 'Returns & exchanges',
    copy: 'Placeholder page. The returns and exchange policy will be published here.',
  },
  '/privacy': {
    title: 'Privacy policy',
    copy: 'Placeholder page. The privacy policy will be published here.',
  },
  '/terms': {
    title: 'Terms & conditions',
    copy: 'Placeholder page. The terms and conditions will be published here.',
  },
}

export default function InfoPage() {
  const { pathname } = useLocation()
  const page = PAGES[pathname]

  return (
    <main className="min-h-screen bg-paper px-8 py-16 text-ink">
      <p className="text-xs tracking-[0.28em] text-stone uppercase">Customer care</p>
      <h1 className="mt-4 font-display text-4xl tracking-[-0.03em]">{page.title}</h1>
      <p className="mt-4 max-w-xl text-stone">{page.copy}</p>
    </main>
  )
}
