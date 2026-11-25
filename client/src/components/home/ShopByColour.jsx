import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useCutout } from '../../hooks/useCutout'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const NOTES = {
  'tshirt-01': 'Clean, bright and quietly essential.',
  'tshirt-02': 'Sharp, grounded and endlessly wearable.',
  'tshirt-03': 'Soft, understated and effortlessly versatile.',
  'tshirt-04': 'Calm, balanced and made for every day.',
  'tshirt-05': 'Warm, gentle and quietly refined.',
  'tshirt-06': 'Earthy, muted and naturally composed.',
  'tshirt-07': 'Deep, rich and quietly confident.',
  'tshirt-08': 'Dark, considered and quietly bold.',
  'tshirt-09': 'Smoked, modern and effortlessly clean.',
  'tshirt-10': 'Soft, warm and subtly expressive.',
}

const TINTS = {
  'tshirt-01': '#F4F1EA',
  'tshirt-02': '#EBE7E0',
  'tshirt-03': '#F3EBDF',
  'tshirt-04': '#EEEAE4',
  'tshirt-05': '#F5F0E6',
  'tshirt-06': '#EEEDE4',
  'tshirt-07': '#F1E8DF',
  'tshirt-08': '#E8E7E6',
  'tshirt-09': '#ECE9E4',
  'tshirt-10': '#F3EBE6',
}

function ColourPreview({ src, alt, reduce }) {
  const cutout = useCutout(src, true)
  const [shown, setShown] = useState(cutout)
  const [opacity, setOpacity] = useState(1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!cutout || cutout === shown) return undefined
    if (reduce) {
      setShown(cutout)
      setOpacity(1)
      return undefined
    }
    setLeaving(true)
    setOpacity(0)
    const swap = setTimeout(() => {
      setShown(cutout)
      setLeaving(false)
      setOpacity(1)
    }, 180)
    return () => clearTimeout(swap)
  }, [cutout, shown, reduce])

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[36rem]">
      {shown ? (
        <img
          src={shown}
          alt={alt}
          style={{
            opacity,
            transition: reduce ? 'none' : `opacity ${leaving ? 180 : 380}ms ${EASE}`,
          }}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : null}
    </div>
  )
}

export default function ShopByColour() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [index, setIndex] = useState(2)
  const swatches = useRef([])
  const product = products[index]
  const count = products.length

  useEffect(() => {
    products.forEach((item) => {
      const image = new Image()
      image.src = item.images.front
    })
  }, [])

  function choose(next) {
    setIndex((next + count) % count)
  }

  function onSwatchKey(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = event.key === 'ArrowRight' ? index + 1 : index - 1
    const wrapped = (next + count) % count
    choose(wrapped)
    swatches.current[wrapped]?.focus()
  }

  return (
    <section
      id="shop-by-colour"
      style={{ backgroundColor: TINTS[product.id] }}
      className={`px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20 ${
        reduce ? '' : 'transition-colors duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
      }`}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-8">
        <header className="lg:col-start-2 lg:row-start-1">
          <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">The colour edit</p>
          <h2 className="mt-3 font-display text-[clamp(2.35rem,4vw,4rem)] leading-[0.92] tracking-[-0.04em]">
            FIND YOUR COLOUR.
          </h2>
          <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-[#77716A]">
            One essential fit. Ten ways to express yourself. Discover the shade that feels like you.
          </p>
        </header>

        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
          <ColourPreview
            src={product.images.front}
            alt={`${product.colorName} oversized essential tee`}
            reduce={reduce}
          />
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <p className="text-[10px] tracking-[0.24em] text-[#77716A] uppercase">
            Colour {product.id.slice(-2)} / {String(count).padStart(2, '0')}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[-0.03em] uppercase">
            {product.colorName}
          </h3>
          <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-[#77716A]">{NOTES[product.id]}</p>

          <div
            className="mt-7 flex flex-wrap gap-3.5"
            role="list"
            aria-label="T-shirt colours"
            onKeyDown={onSwatchKey}
          >
            {products.map((color, colorIndex) => {
              const selected = color.id === product.id
              return (
                <button
                  key={color.id}
                  ref={(node) => {
                    swatches.current[colorIndex] = node
                  }}
                  type="button"
                  role="listitem"
                  title={color.colorName}
                  aria-label={color.colorName}
                  aria-pressed={selected}
                  onClick={() => choose(colorIndex)}
                  className={`group/swatch relative size-[34px] rounded-full border border-black/15 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#171717] ${
                    selected ? 'ring-1 ring-[#171717] ring-offset-2 ring-offset-[var(--swatch-paper,#F1EADF)]' : ''
                  } ${reduce ? '' : 'transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110'}`}
                  style={{ backgroundColor: color.colorHex, '--swatch-paper': TINTS[product.id] }}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 bg-[#171717] px-1.5 py-1 text-[9px] tracking-[0.14em] whitespace-nowrap text-[#F7F4EF] uppercase opacity-0 group-hover/swatch:opacity-100 group-focus-visible/swatch:opacity-100">
                    {color.colorName}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] tracking-[0.18em] uppercase">
            <button
              type="button"
              onClick={() => choose(index - 1)}
              className="group inline-flex items-center gap-3"
            >
              <span
                className={`flex size-10 items-center justify-center border border-[#171717]/30 bg-[#F7F4EF] text-[#171717] group-hover:bg-[#171717] group-hover:text-[#F1EADF] ${
                  reduce ? '' : 'transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
                }`}
              >
                <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.25} />
              </span>
              Previous shade
            </button>
            <button
              type="button"
              onClick={() => choose(index + 1)}
              className="group inline-flex items-center gap-3"
            >
              Next shade
              <span
                className={`flex size-10 items-center justify-center border border-[#171717]/30 bg-[#F7F4EF] text-[#171717] group-hover:bg-[#171717] group-hover:text-[#F1EADF] ${
                  reduce ? '' : 'transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
                }`}
              >
                <ArrowRight aria-hidden="true" size={15} strokeWidth={1.25} />
              </span>
            </button>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="group mt-8 inline-flex items-center gap-3 bg-[#171717] px-5 py-3.5 text-[11px] tracking-[0.22em] text-[#F1EADF] uppercase transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#3a342c]"
          >
            Explore this colour
            <ArrowRight
              aria-hidden="true"
              size={14}
              strokeWidth={1.25}
              className={
                reduce
                  ? undefined
                  : 'transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1'
              }
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
