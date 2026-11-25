import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { addToCart } from '../../utils/cart'
import { formatPrice } from '../../utils/formatPrice'

const FEATURED = ['tshirt-01', 'tshirt-02', 'tshirt-03', 'tshirt-04']
const IMAGE_FADE = 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)'

function CrossfadeImage({ src, className, reduce }) {
  const [base, setBase] = useState(src)
  const [cover, setCover] = useState(null)
  const [coverOn, setCoverOn] = useState(false)

  useEffect(() => {
    if (!src || src === base) return undefined
    setCover(src)
    setCoverOn(false)
    const frame = requestAnimationFrame(() => setCoverOn(true))
    const done = setTimeout(() => {
      setBase(src)
      setCover(null)
      setCoverOn(false)
    }, reduce ? 0 : 700)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(done)
    }
  }, [src, base, reduce])

  return (
    <>
      <img src={base} alt="" className={className} />
      {cover ? (
        <img
          src={cover}
          alt=""
          className={`${className} absolute inset-0`}
          style={{ opacity: coverOn ? 1 : 0, transition: reduce ? 'none' : IMAGE_FADE }}
        />
      ) : null}
    </>
  )
}

function ProductCard({ initialId, reduce }) {
  const [productId, setProductId] = useState(initialId)
  const [quickOpen, setQuickOpen] = useState(false)
  const [size, setSize] = useState(null)
  const [notice, setNotice] = useState('')
  const product = products.find((item) => item.id === productId) ?? products[0]
  const sizes = product.sizes ?? []
  const discount =
    product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0

  function chooseColor(id) {
    setProductId(id)
    setNotice('')
    setSize(null)
  }

  function add() {
    if (!size || !sizes.includes(size)) return
    addToCart({
      id: product.id,
      name: 'Oversized Essential Tee',
      colorName: product.colorName,
      size,
      price: product.price,
      currency: product.currency,
      image: product.images.front,
    })
    setNotice('Added to bag')
    setQuickOpen(false)
  }

  return (
    <article className="flex h-full flex-col">
      <div className="group relative aspect-[3/4] overflow-hidden bg-[#F7F4EF]">
        <Link to={`/product/${product.id}`} className="relative block h-full" aria-label={`${product.colorName} tee`}>
          <CrossfadeImage
            src={product.images.front}
            reduce={reduce}
            className={`h-full w-full object-contain transition duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              reduce ? '' : 'group-hover:scale-[1.02] group-hover:opacity-0'
            }`}
          />
          {product.images.back ? (
            <img
              src={product.images.back}
              alt=""
              className={`absolute inset-0 h-full w-full object-contain opacity-0 transition duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                reduce ? '' : 'group-hover:scale-[1.02] group-hover:opacity-100'
              }`}
            />
          ) : null}
        </Link>
        <span className="pointer-events-none absolute top-3 left-3 text-[10px] tracking-[0.22em] uppercase">New</span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1">
          <h3 className="font-sans text-[15px] leading-5 font-medium">Oversized Essential Tee</h3>
          <div className="flex items-center justify-end gap-2">
            <p className="text-[15px] leading-5 font-semibold text-ink">{formatPrice(product.price, product.currency)}</p>
            {discount > 0 ? (
              <span className="rounded-sm bg-[#7A5344] px-1.5 py-0.5 text-[9px] tracking-[0.12em] text-[#F7F4EF] uppercase">
                {discount}% off
              </span>
            ) : null}
          </div>
          <p className="text-[11px] tracking-[0.16em] text-stone uppercase">{product.colorName}</p>
          {product.compareAtPrice > product.price ? (
            <p className="justify-self-end text-[12px] text-[#8A8378] line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </p>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2.5" role="list" aria-label="Colours">
          {products.map((color) => {
            const selected = color.id === product.id
            return (
              <button
                key={color.id}
                type="button"
                role="listitem"
                title={color.colorName}
                aria-label={color.colorName}
                aria-pressed={selected}
                onClick={() => chooseColor(color.id)}
                className={`group/swatch relative size-[18px] rounded-full border border-black/15 transition duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  selected ? 'ring-1 ring-ink ring-offset-2 ring-offset-[#F1EADF]' : ''
                }`}
                style={{ backgroundColor: color.colorHex }}
              >
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 bg-ink px-1.5 py-1 text-[9px] tracking-[0.12em] whitespace-nowrap text-[#F1EADF] uppercase opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100 group-focus-visible/swatch:opacity-100">
                  {color.colorName}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-auto pt-4">
          {notice ? <p className="mb-2 text-[11px] tracking-[0.16em] uppercase">{notice}</p> : null}
          {quickOpen ? (
            <div className="mb-3">
              <p className="text-[10px] tracking-[0.18em] uppercase">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={size === option}
                    onClick={() => setSize(option)}
                    className={`min-h-9 min-w-9 border px-2 text-[11px] tracking-[0.12em] transition-colors duration-300 ${
                      size === option ? 'border-ink bg-ink text-[#F1EADF]' : 'border-ink/25 hover:border-ink'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <button
            type="button"
            disabled={quickOpen && !size}
            onClick={() => {
              if (!quickOpen) {
                setQuickOpen(true)
                setNotice('')
                return
              }
              add()
            }}
            className="group/add flex h-10 w-full items-center justify-center gap-2 border border-ink bg-transparent text-[11px] tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-ink hover:text-[#F1EADF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            {quickOpen ? 'Add to bag' : 'Quick Add +'}
            <ArrowRight
              size={14}
              strokeWidth={1.25}
              className={`transition-opacity duration-300 ${quickOpen ? 'opacity-100' : 'opacity-0 group-hover/add:opacity-100'}`}
            />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function NewArrivals() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const featured = FEATURED.map((id) => products.find((product) => product.id === id)).filter(Boolean)

  return (
    <motion.section
      id="new-arrivals"
      className="bg-[#F1EADF] px-5 py-16 text-ink md:px-8 md:py-20 lg:px-12"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-stone uppercase">The latest drop</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.9] tracking-[-0.04em]">
            NEW ARRIVALS
          </h2>
          <p className="mt-3 text-sm text-stone">Fresh essentials. Same effortless comfort.</p>
        </div>
        <Link to="/shop" className="text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-60">
          View all products →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {featured.map((product) => (
          <ProductCard key={product.id} initialId={product.id} reduce={reduce} />
        ))}
      </div>
    </motion.section>
  )
}
