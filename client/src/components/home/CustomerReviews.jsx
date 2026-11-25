import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]

const REVIEWS = [
  {
    id: 'aarav',
    quote:
      'Finally, an oversized T-shirt that actually feels premium. The fabric feels substantial, the fit is exactly what I wanted, and the comfort is incredible.',
    name: 'Aarav Mehta',
    product: 'Oversized Essential Tee — Jet Black',
  },
  {
    id: 'rohan',
    quote:
      'Love the relaxed fit. The shoulders, sleeves and overall silhouette are perfect for everyday styling.',
    name: 'Rohan Shah',
    product: 'Oversized Essential Tee — Pure White',
  },
  {
    id: 'karan',
    quote:
      'The Sand Beige colour looks even better in person. Comfortable fabric and a clean premium appearance.',
    name: 'Karan Patel',
    product: 'Oversized Essential Tee — Sand Beige',
  },
  {
    id: 'dev',
    quote:
      'Simple, comfortable and easy to style. Definitely one of my favourite everyday wardrobe essentials.',
    name: 'Dev Malhotra',
    product: 'Oversized Essential Tee — Stone Grey',
  },
]

function Stars() {
  return (
    <p className="tracking-[0.28em] text-[#171717]" aria-label="5 out of 5 stars">
      ★★★★★
    </p>
  )
}

function ReviewCard({ review, reduce }) {
  return (
    <article
      className={`border-t border-[#171717]/15 pt-5 ${
        reduce ? '' : 'transition-colors duration-[400ms] hover:border-[#171717]'
      }`}
    >
      <Stars />
      <blockquote className="mt-4 text-[15px] leading-relaxed">“{review.quote}”</blockquote>
      <p className="mt-5 text-[13px] tracking-[0.04em]">{review.name}</p>
      <p className="mt-1 text-[12px] text-[#77716A]">{review.product}</p>
      <p className="mt-3 text-[10px] tracking-[0.22em] text-[#77716A] uppercase">Sample review</p>
    </article>
  )
}

export default function CustomerReviews() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [active, setActive] = useState(0)
  const featured = REVIEWS[active]
  const supporting = REVIEWS.filter((_, index) => index !== active)
  const reveal = reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }

  const move = (direction) => {
    setActive((current) => (current + direction + REVIEWS.length) % REVIEWS.length)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    }
  }

  return (
    <section id="reviews" className="bg-[#F1EADF] px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20">
      <motion.div
        className="max-w-[40rem]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={reveal}
      >
        <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">The SNUG community</p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,4vw,4.25rem)] leading-[0.9] tracking-[-0.04em]">
          REAL PEOPLE.
          <br />
          REAL COMFORT.
        </h2>
        <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#77716A]">
          Good style feels even better when you're comfortable. Discover what people are saying about
          their SNUG WRLD essentials.
        </p>
        <p className="mt-4 text-[10px] tracking-[0.24em] text-[#77716A] uppercase">
          Worn everyday. Loved everywhere.
        </p>
        <p className="mt-3 text-[12px] text-[#77716A]">Sample demonstration reviews. Not verified purchases.</p>
      </motion.div>

      <div className="mt-12 grid items-end gap-10 border-t border-[#171717]/15 pt-10 lg:grid-cols-2 lg:gap-16">
        <blockquote>
          <Stars />
          <p
            key={featured.id}
            className="mt-6 font-display text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.2] tracking-[-0.03em]"
          >
            “{featured.quote}”
          </p>
        </blockquote>
        <div className="lg:border-l lg:border-[#171717]/15 lg:pl-10">
          <p className="text-[15px] tracking-[0.04em]">{featured.name}</p>
          <p className="mt-2 text-[13px] text-[#77716A]">{featured.product}</p>
          <p className="mt-4 text-[10px] tracking-[0.22em] text-[#77716A] uppercase">Sample review</p>
          <div className="mt-8 flex items-center gap-3" onKeyDown={onKeyDown}>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Show the previous sample review"
              className="group flex size-10 items-center justify-center border border-[#171717]/30 bg-[#F7F4EF] text-[#171717] transition-colors duration-[250ms] hover:bg-[#171717] hover:text-[#F1EADF]"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.25}
                className={reduce ? undefined : 'transition-transform duration-[400ms] group-hover:-translate-x-0.5'}
              />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Show the next sample review"
              className="group flex size-10 items-center justify-center border border-[#171717]/30 bg-[#F7F4EF] text-[#171717] transition-colors duration-[250ms] hover:bg-[#171717] hover:text-[#F1EADF]"
            >
              <ArrowRight
                size={15}
                strokeWidth={1.25}
                className={reduce ? undefined : 'transition-transform duration-[400ms] group-hover:translate-x-0.5'}
              />
            </button>
            <p className="ml-2 text-[10px] tracking-[0.22em] text-[#77716A]">
              {String(active + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
        {supporting.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} reduce={reduce} />
          </li>
        ))}
      </ul>

      <div className="mt-16 border-t border-[#171717]/15 pt-10 text-center">
        <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none tracking-[-0.03em]">
          YOUR EXPERIENCE MATTERS.
        </p>
        <p className="mx-auto mt-4 max-w-[28rem] text-[15px] leading-relaxed text-[#77716A]">
          Have you experienced the SNUG WRLD difference? We'd love to hear from you.
        </p>
        <Link
          to="/contact"
          className="group mt-6 inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase"
        >
          <span className="relative">
            Share your experience
            <span
              aria-hidden="true"
              className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#171717] ${
                reduce
                  ? 'scale-x-100'
                  : 'scale-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100'
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
                : 'transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1'
            }
          />
        </Link>
      </div>
    </section>
  )
}
