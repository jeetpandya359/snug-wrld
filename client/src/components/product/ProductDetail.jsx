import { ChevronLeft, ChevronRight, Minus, Plus, Shirt, SunMedium, SwatchBook } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { useCutout } from '../../hooks/useCutout'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { rackFrontSrc } from '../product-rack/rackFronts'
import { useRackFlight } from '../product-rack/rackFlight'
import { addToCart } from '../../utils/cart'
import { formatPrice } from '../../utils/formatPrice'

const DELIVERY = {
  threshold: 2999,
  freeShipping: 'Demonstration only. Free shipping above this amount is not a confirmed policy.',
  estimate: 'A delivery estimate is not connected yet.',
  returns: 'Returns terms will be confirmed before launch.',
}

const SAMPLE_MEASUREMENTS = [
  ['S', '56', '70', '52'],
  ['M', '58', '72', '54'],
  ['L', '61', '74', '56'],
  ['XL', '64', '76', '58'],
  ['XXL', '67', '78', '60'],
]

const SHEET = { width: 1448, height: 1086 }
const NECK = { x: 160, y: 90, size: 560 }

function CutoutImage({ src, alt, className }) {
  const url = useCutout(src, true)
  return <img src={url || src} alt={alt} className={className} />
}

function DetailCrop({ src, alt }) {
  const { x, y, size } = NECK
  return (
    <span className="relative block h-full w-full overflow-hidden bg-[#E7E0D4]">
      <img
        src={src}
        alt={alt}
        style={{
          width: `${(SHEET.width / size) * 100}%`,
          height: `${(SHEET.height / size) * 100}%`,
          left: `${(-x / size) * 100}%`,
          top: `${(-y / size) * 100}%`,
        }}
        className="absolute max-w-none"
      />
    </span>
  )
}

function Gallery({ product, reduce }) {
  const flight = useRackFlight()
  const arriving = flight.phase === 'moving' && flight.id === product.id
  const views = [
    { id: 'front', label: 'Front view' },
    { id: 'back', label: 'Back view' },
    { id: 'detail', label: 'Neckline and stitching' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ]
  const [index, setIndex] = useState(0)
  const startX = useRef(null)
  const view = views[index]

  useEffect(() => {
    setIndex(0)
  }, [product.id])

  const step = (direction) => setIndex((current) => (current + direction + views.length) % views.length)

  const frame = (item, large) => {
    if (item.id === 'detail') {
      return <DetailCrop src={product.images.detail} alt={large ? `${product.colorName} tee, ${item.label}` : ''} />
    }
    if (item.id === 'lifestyle') {
      return (
        <img
          src={product.images.lifestyle}
          alt={large ? `${product.colorName} oversized tee, worn` : ''}
          className="h-full w-full object-cover object-[center_22%]"
        />
      )
    }
    const hanger = item.id === 'front' ? rackFrontSrc(product.id) : ''
    return (
      <CutoutImage
        src={hanger || product.images[item.id]}
        alt={large ? `${product.colorName} oversized tee, ${item.label.toLowerCase()}` : ''}
        className={
          hanger
            ? 'h-full w-full object-contain object-center p-3 md:p-5'
            : 'h-full w-full object-contain p-6 md:p-10'
        }
      />
    )
  }

  return (
    <div>
      <div
        className="relative aspect-[4/5] overflow-hidden bg-[#F7F4EF]"
        onTouchStart={(event) => {
          startX.current = event.changedTouches[0].clientX
        }}
        onTouchEnd={(event) => {
          if (startX.current == null) return
          const delta = event.changedTouches[0].clientX - startX.current
          if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1)
          startX.current = null
        }}
      >
        <div
          data-product-stage
          className={reduce ? 'h-full' : 'h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]'}
          style={{
            opacity: arriving ? 0 : 1,
            transition: reduce ? 'none' : 'opacity 280ms ease',
          }}
        >
          {frame(view, true)}
        </div>
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => step(-1)}
          className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center border border-[#171513]/20 bg-[#F1EADF]/90"
        >
          <ChevronLeft size={16} strokeWidth={1.25} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => step(1)}
          className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center border border-[#171513]/20 bg-[#F1EADF]/90"
        >
          <ChevronRight size={16} strokeWidth={1.25} />
        </button>
      </div>
      <ul className="mt-3 flex gap-2 overflow-x-auto">
        {views.map((item, itemIndex) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              aria-label={`Show ${item.label}`}
              aria-current={itemIndex === index ? 'true' : undefined}
              onClick={() => setIndex(itemIndex)}
              className={`block size-16 overflow-hidden bg-[#F7F4EF] md:size-20 ${
                itemIndex === index ? 'ring-1 ring-[#171513]' : 'ring-1 ring-transparent'
              }`}
            >
              {frame(item, false)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SizeGuide({ onClose }) {
  const panel = useRef(null)

  useEffect(() => {
    panel.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171513]/45 p-4" onClick={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        tabIndex={-1}
        className="max-h-[90vh] w-full max-w-lg overflow-auto bg-[#F1EADF] p-6 text-[#171513] outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[10px] tracking-[0.22em] text-[#77716A] uppercase">Sample sizing</p>
        <h2 id="size-guide-title" className="mt-2 font-display text-3xl tracking-[-0.03em]">
          Size guide
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#77716A]">
          These measurements are sample data until the confirmed garment measurements are added. They are not
          a finished size chart.
        </p>
        <table className="mt-6 w-full text-left text-[13px]">
          <caption className="sr-only">Sample measurements in centimetres</caption>
          <thead className="border-b border-[#171513]/15 text-[10px] tracking-[0.16em] uppercase">
            <tr>
              <th className="py-2 font-normal">Size</th>
              <th className="py-2 font-normal">Chest</th>
              <th className="py-2 font-normal">Length</th>
              <th className="py-2 font-normal">Shoulder</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_MEASUREMENTS.map((row) => (
              <tr key={row[0]} className="border-b border-[#171513]/10">
                {row.map((cell) => (
                  <td key={cell} className="py-2.5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[13px] text-[#77716A]">All figures are centimetres.</p>
        <p className="mt-2 text-[14px]">Between sizes? Choose one size up for a more relaxed oversized fit.</p>
        <button type="button" onClick={onClose} className="mt-6 text-[11px] tracking-[0.2em] uppercase underline">
          Close
        </button>
      </div>
    </div>
  )
}

function RelatedCard({ product }) {
  const [size, setSize] = useState(null)
  const [open, setOpen] = useState(false)
  const discount =
    product.compareAtPrice > product.price ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0

  return (
    <article>
      <Link to={`/product/${product.id}`} className="block aspect-[3/4] bg-[#F7F4EF]">
        <CutoutImage
          src={product.images.front}
          alt={`${product.colorName} oversized tee`}
          className="h-full w-full object-contain p-4"
        />
      </Link>
      <h3 className="mt-3 text-[13px] tracking-[0.08em] uppercase">
        <Link to={`/product/${product.id}`}>Oversized Essential Tee</Link>
      </h3>
      <p className="mt-1 text-[13px] text-[#77716A]">{product.colorName}</p>
      <p className="mt-2 flex items-center gap-2 text-[14px]">
        <span>{formatPrice(product.price, product.currency)}</span>
        {discount > 0 && (
          <span className="text-[13px] text-[#77716A] line-through">
            {formatPrice(product.compareAtPrice, product.currency)}
          </span>
        )}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {products.map((shade) => (
          <li key={shade.id}>
            <Link
              to={`/product/${shade.id}`}
              title={shade.colorName}
              aria-label={shade.colorName}
              className="block size-3.5 rounded-full border border-[#171513]/20"
              style={{ backgroundColor: shade.colorHex }}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-3 text-[11px] tracking-[0.18em] uppercase"
      >
        Quick add
      </button>
      {open && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSize(option)
                addToCart({
                  id: product.id,
                  name: 'Oversized Essential Tee',
                  colorName: product.colorName,
                  size: option,
                  price: product.price,
                  currency: product.currency,
                  image: product.images.front,
                  quantity: 1,
                })
              }}
              className={`px-2 py-1 text-[11px] ${size === option ? 'bg-[#171513] text-[#F1EADF]' : 'border border-[#171513]/25'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}

const DETAILS = [
  {
    id: 'description',
    title: 'Product description',
    body: (
      <p>
        Designed for everyday expression, the SNUG WRLD Oversized Essential Tee combines a relaxed silhouette
        with an understated contemporary aesthetic.
      </p>
    ),
  },
  {
    id: 'fabric',
    title: 'Fabric and fit',
    body: (
      <ul className="space-y-1">
        <li>Premium cotton feel. Fabric composition is not confirmed yet.</li>
        <li>Oversized silhouette.</li>
        <li>Dropped shoulders.</li>
        <li>Relaxed sleeves.</li>
        <li>Ribbed crew neckline.</li>
      </ul>
    ),
  },
]

export default function ProductDetail({ product }) {
  const navigate = useNavigate()
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [size, setSize] = useState(() => sessionStorage.getItem('snug-selected-size'))
  const [quantity, setQuantity] = useState(1)
  const [guide, setGuide] = useState(false)
  const [open, setOpen] = useState('description')
  const [notice, setNotice] = useState('')
  const [pin, setPin] = useState('')
  const [pinNote, setPinNote] = useState('')
  const [showBar, setShowBar] = useState(false)
  const buyRef = useRef(null)
  const pending = useRef(false)

  const discount =
    product.compareAtPrice > product.price ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0
  const related = products.filter((item) => item.id !== product.id).slice(0, 4)

  useEffect(() => {
    setNotice('')
    window.scrollTo(0, 0)
  }, [product.id])

  useEffect(() => {
    const node = buyRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting), { threshold: 0 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [product.id])

  function chooseColour(id) {
    if (id === product.id) return
    navigate(`/product/${id}`)
  }

  function purchase(checkout) {
    if (!product.sizes.includes(size)) {
      setNotice('Select a size')
      return
    }
    if (pending.current) return
    pending.current = true
    addToCart({
      id: product.id,
      name: 'Oversized Essential Tee',
      colorName: product.colorName,
      size,
      price: product.price,
      currency: product.currency,
      image: product.images.front,
      quantity,
    })
    setNotice('Added to bag')
    window.setTimeout(() => {
      pending.current = false
    }, 500)
    if (checkout) navigate('/checkout')
  }

  const specs = [
    ['Product', 'Oversized Essential Tee'],
    ['Colour', product.colorName],
    ['Sizes', product.sizes.join(', ')],
    ['Fit', 'Oversized'],
    ['Fabric', 'Not confirmed'],
  ]

  const sections = [
    ...DETAILS,
    {
      id: 'specs',
      title: 'Product specifications',
      body: (
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2">
          {specs.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-[#77716A]">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: 'care',
      title: 'Care instructions',
      body: (
        <p>
          Sample guidance only: wash cold, turn inside out, and avoid high heat until confirmed care
          instructions are added.
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping and returns',
      body: (
        <div className="space-y-2">
          <p>
            {DELIVERY.freeShipping} Threshold: {formatPrice(DELIVERY.threshold)}.
          </p>
          <p>{DELIVERY.estimate}</p>
          <p>{DELIVERY.returns}</p>
        </div>
      ),
    },
  ]

  return (
    <main className="bg-[#F1EADF] px-5 py-8 text-[#171513] md:px-8 md:py-12 lg:px-12 lg:pb-20">
      <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.16em] text-[#77716A] uppercase">
        <Link to="/" className="hover:text-[#171513]">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to="/shop" className="hover:text-[#171513]">
          Shop
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-[#171513]">Oversized Essential Tee</span>
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-14">
        <Gallery product={product} reduce={reduce} />

        <div className="lg:sticky lg:top-24">
          <p className="text-[11px] tracking-[0.22em] uppercase">SNUG WRLD</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.03em]">
            Oversized Essential Tee
          </h1>
          <p className="mt-3 text-[13px] tracking-[0.18em] uppercase">{product.colorName}</p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#77716A]">
            An everyday essential designed with a relaxed oversized silhouette, considered details and
            effortless comfort.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <p className="font-display text-3xl">{formatPrice(product.price, product.currency)}</p>
            {discount > 0 && (
              <>
                <p className="text-[15px] text-[#77716A] line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
                <p className="border border-[#171513]/20 px-2 py-1 text-[10px] tracking-[0.16em]">
                  {discount}% off
                </p>
              </>
            )}
          </div>

          <div className="mt-8">
            <p className="text-[11px] tracking-[0.18em] uppercase">Colour</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {products.map((shade) => {
                const active = shade.id === product.id
                return (
                  <li key={shade.id}>
                    <button
                      type="button"
                      title={shade.colorName}
                      aria-label={shade.colorName}
                      aria-pressed={active}
                      onClick={() => chooseColour(shade.id)}
                      className={`size-8 rounded-full border ${
                        active ? 'ring-1 ring-[#171513] ring-offset-2 ring-offset-[#F1EADF]' : 'border-[#171513]/20'
                      }`}
                      style={{ backgroundColor: shade.colorHex }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.18em] uppercase">Size</p>
              <button type="button" onClick={() => setGuide(true)} className="text-[11px] tracking-[0.16em] uppercase underline">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => {
                    setSize(option)
                    sessionStorage.setItem('snug-selected-size', option)
                    setNotice('')
                  }}
                  className={`min-w-12 border px-3 py-2 text-[12px] tracking-[0.12em] ${
                    size === option ? 'border-[#171513] bg-[#171513] text-[#F1EADF]' : 'border-[#171513]/25 hover:border-[#171513]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[11px] tracking-[0.18em] uppercase">Quantity</p>
            <div className="mt-3 inline-flex items-center border border-[#171513]/25">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex size-10 items-center justify-center"
              >
                <Minus size={14} strokeWidth={1.25} />
              </button>
              <span className="min-w-8 text-center text-[14px]" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="flex size-10 items-center justify-center"
              >
                <Plus size={14} strokeWidth={1.25} />
              </button>
            </div>
          </div>

          <div ref={buyRef} className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={() => purchase(false)}
              className="bg-[#171513] px-5 py-4 text-[12px] tracking-[0.2em] text-[#F1EADF] uppercase transition-colors duration-300 hover:bg-[#3a342c]"
            >
              Add to bag
            </button>
            <button
              type="button"
              onClick={() => purchase(true)}
              className="border border-[#171513] bg-transparent px-5 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#171513] hover:text-[#F1EADF]"
            >
              Buy now
            </button>
            <p className="min-h-5 text-[13px]" role="status">
              {notice}
            </p>
          </div>

          <div className="mt-6 space-y-2 border-t border-[#171513]/15 pt-5 text-[13px] text-[#77716A]">
            <p>
              {DELIVERY.freeShipping} {formatPrice(DELIVERY.threshold)}.
            </p>
            <p>{DELIVERY.estimate}</p>
            <p>{DELIVERY.returns}</p>
            <form
              className="flex gap-2 pt-2"
              onSubmit={(event) => {
                event.preventDefault()
                setPinNote(
                  pin.trim()
                    ? 'PIN code checks are not connected yet. No delivery date is available.'
                    : 'Enter a PIN code.',
                )
              }}
            >
              <label className="sr-only" htmlFor="pin-code">
                PIN code
              </label>
              <input
                id="pin-code"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                inputMode="numeric"
                placeholder="PIN code"
                className="w-32 border border-[#171513]/25 bg-transparent px-3 py-2 text-[13px] text-[#171513] outline-none"
              />
              <button type="submit" className="text-[11px] tracking-[0.16em] uppercase">
                Check
              </button>
            </form>
            {pinNote && <p>{pinNote}</p>}
          </div>
        </div>
      </div>

      <div className="-mx-5 mt-12 bg-[#171513] px-5 text-[#F1E9DD] md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
        {sections.map((section) => {
          const expanded = open === section.id
          return (
            <div key={section.id} className="border-b border-[#49423B]">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`panel-${section.id}`}
                onClick={() => setOpen(expanded ? '' : section.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[12px] tracking-[0.16em] uppercase"
              >
                {section.title}
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center bg-[#F1E9DD] text-[1.65rem] leading-none text-[#171513]"
                >
                  {expanded ? '−' : '+'}
                </span>
              </button>
              {expanded && (
                <div id={`panel-${section.id}`} className="pb-6 pr-16 text-[14px] leading-relaxed text-[#D8CFC3]">
                  {section.body}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <ul className="mt-14 grid gap-8 border-t border-[#171513]/15 pt-10 md:grid-cols-3">
        {[
          [Shirt, '01 — Relaxed fit', 'Room to move. Freedom to express.'],
          [SunMedium, '02 — Everyday comfort', 'Made for the rhythm of everyday life.'],
          [SwatchBook, '03 — Timeless colours', 'Find the shade that feels like you.'],
        ].map(([Icon, title, copy]) => (
          <li key={title} className="flex gap-4">
            <Icon aria-hidden="true" size={18} strokeWidth={1.25} />
            <div>
              <h2 className="text-[12px] tracking-[0.16em] uppercase">{title}</h2>
              <p className="mt-2 text-[14px] text-[#77716A]">{copy}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <h2 className="font-display text-3xl tracking-[-0.03em]">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((item) => (
            <RelatedCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-[#171513]/15 pt-10">
        <h2 className="font-display text-3xl tracking-[-0.03em]">Customer reviews</h2>
        <p className="mt-3 text-[14px] text-[#77716A]">No reviews yet. Review storage is not connected.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-[#77716A]">
          <p>Average rating unavailable</p>
          <label>
            <span className="sr-only">Sort reviews</span>
            <select className="border border-[#171513]/20 bg-transparent px-2 py-2" defaultValue="recent" disabled>
              <option value="recent">Most recent</option>
              <option value="highest">Highest rated</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => setNotice('A review cannot be saved until a review service is connected.')}
            className="border border-[#171513] px-4 py-2 text-[11px] tracking-[0.16em] text-[#171513] uppercase"
          >
            Write a review
          </button>
        </div>
      </section>

      {showBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#171513]/15 bg-[#F1EADF] p-3 lg:hidden">
          <button
            type="button"
            onClick={() => purchase(false)}
            className="w-full bg-[#171513] py-3 text-[12px] tracking-[0.18em] text-[#F1EADF] uppercase"
          >
            Add to bag
          </button>
        </div>
      )}

      {guide && <SizeGuide onClose={() => setGuide(false)} />}
    </main>
  )
}
