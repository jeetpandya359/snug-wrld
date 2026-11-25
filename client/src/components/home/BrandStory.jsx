import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const SLICES = [
  ['Pure White', '/images/products/tshirt-01/lifestyle.png'],
  ['Jet Black', '/images/products/tshirt-02/lifestyle.png'],
  ['Sand Beige', '/images/products/tshirt-03/lifestyle.png'],
  ['Stone Grey', '/images/products/tshirt-04/lifestyle.png'],
  ['Ivory Cream', '/images/products/tshirt-05/lifestyle.png'],
  ['Olive Green', '/images/products/tshirt-06/lifestyle.png'],
  ['Chocolate Brown', '/images/products/tshirt-07/lifestyle.png'],
]
const SLICE_COUNT = SLICES.length
const GAP = 3
const ACTIVE_GROW = 13

const VALUES = [
  ['01', 'Relaxed fit', 'Room to move. Freedom to express.'],
  ['02', 'Everyday comfort', 'Made for the rhythm of everyday life.'],
  ['03', 'Your style, your colour', 'Find the shade that feels like you.'],
]

function LifestyleAccordion({ reduce }) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const frameRef = useRef(null)
  const buttons = useRef([])
  const [width, setWidth] = useState(0)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const node = frameRef.current
    if (!node) return undefined
    const measure = () => setWidth(node.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const grows = Array.from({ length: SLICE_COUNT }, (_, index) => (active === index ? ACTIVE_GROW : 1))
  const totalGrow = grows.reduce((sum, value) => sum + value, 0)
  const inner = Math.max(0, width - GAP * (SLICE_COUNT - 1))
  let cursor = 0
  const slices = grows.map((grow) => {
    const sliceWidth = (grow / totalGrow) * inner
    const left = cursor
    cursor += sliceWidth
    return { left }
  })

  function open(index) {
    setActive(index)
  }

  function leave() {
    if (fine) setActive(null)
  }

  function onKeyDown(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const focused = buttons.current.findIndex((node) => node === document.activeElement)
    const current = active ?? (focused >= 0 ? focused : 0)
    const next = event.key === 'ArrowRight' ? (current + 1) % SLICE_COUNT : (current - 1 + SLICE_COUNT) % SLICE_COUNT
    open(next)
    buttons.current[next]?.focus()
  }

  const motion = reduce ? '' : 'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'

  return (
    <div
      ref={frameRef}
      id="lifestyle-accordion"
      role="group"
      aria-label="Campaign photograph"
      onMouseLeave={leave}
      onKeyDown={onKeyDown}
      className="flex h-[22rem] w-full min-w-0 bg-[#F1EADF] sm:h-[26rem] md:h-[min(62vh,34rem)]"
      style={{ gap: GAP }}
    >
      {slices.map((slice, index) => (
        <button
          key={SLICES[index][1]}
          ref={(node) => {
            buttons.current[index] = node
          }}
          type="button"
          aria-pressed={active === index}
          aria-label={`Show the ${SLICES[index][0]} section of the campaign`}
          onMouseEnter={() => {
            if (fine) open(index)
          }}
          onFocus={() => open(index)}
          onClick={() => open(index)}
          style={{ flexGrow: active === index ? ACTIVE_GROW : 1, flexBasis: 0 }}
          className={`relative h-full min-w-0 cursor-pointer overflow-hidden border-0 bg-[#F1EADF] p-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-3px] focus-visible:outline-[#171717] ${
            reduce ? '' : `transition-[flex-grow] ${motion}`
          }`}
        >
          <img
            src={SLICES[index][1]}
            alt={`${SLICES[index][0]} oversized essential tee`}
            style={{ width: inner, left: -slice.left }}
            className={`pointer-events-none absolute top-0 h-full max-w-none object-cover object-[center_16%] ${
              reduce ? '' : `transition-[left] ${motion}`
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function BrandStory() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <motion.section
      id="brand-story"
      className="bg-[#F1EADF] px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-14">
        <div className="@container max-w-[34rem]">
          <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">
            The SNUG WRLD philosophy
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,8.4cqi,4rem)] leading-[0.92] tracking-[-0.035em]">
            <span className="block whitespace-nowrap">MORE THAN A FIT.</span>
            <span className="block whitespace-nowrap">IT&apos;S A FEELING.</span>
          </h2>
          <p className="mt-5 max-w-[28rem] text-[15px] leading-relaxed text-[#77716A]">
            Designed for those who choose comfort without compromising on expression. Discover a
            world where relaxed silhouettes meet everyday individuality.
          </p>
          <Link
            to="/about"
            className="group mt-7 inline-flex items-center gap-3 border border-[#171717]/35 px-5 py-3 text-[11px] tracking-[0.22em] text-[#171717] uppercase transition-colors duration-300 hover:border-[#171717]"
          >
            <span className="relative">
              Discover our story
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#171717] ${
                  reduce
                    ? 'scale-x-100'
                    : 'scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100'
                }`}
              />
            </span>
            <ArrowRight
              aria-hidden="true"
              size={14}
              strokeWidth={1.25}
              className={
                reduce
                  ? undefined
                  : 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1'
              }
            />
          </Link>
        </div>

        <LifestyleAccordion reduce={reduce} />
      </div>

      <div className="mt-10 lg:mt-12">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 md:gap-x-10">
          {VALUES.map(([number, title, copy]) => (
            <li
              key={number}
              className="group border-t border-[#171717]/15 pt-4 transition-colors duration-300 hover:border-[#171717]/55"
            >
              <p className="text-[10px] tracking-[0.24em] text-[#77716A]">{number}</p>
              <h3 className="mt-2.5 text-[12px] font-medium tracking-[0.16em] text-[#2c2a26] uppercase transition-colors duration-300 group-hover:text-[#171717]">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#77716A]">{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}
