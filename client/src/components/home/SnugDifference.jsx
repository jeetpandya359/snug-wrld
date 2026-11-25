import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]
const DETAIL = '/images/products/tshirt-03/detail.png'
const SHEET = { width: 1448, height: 1086 }

const FEATURES = [
  {
    number: '01',
    title: 'Heavyweight feel',
    copy: 'A substantial cotton feel designed to bring comfort and structure to your everyday wardrobe.',
    alt: 'Close view of the sand beige tee fabric',
    crop: { x: 80, y: 730, size: 340 },
  },
  {
    number: '02',
    title: 'Relaxed silhouette',
    copy: 'Dropped shoulders and roomy proportions create the oversized fit that moves naturally with you.',
    alt: 'Dropped shoulder and wide sleeve of the oversized tee',
    crop: { x: 980, y: 40, size: 430 },
  },
  {
    number: '03',
    title: 'Thoughtful details',
    copy: 'A considered crew neckline, clean stitching and carefully finished edges complete the essential.',
    alt: 'Ribbed crew neckline and stitching of the oversized tee',
    crop: { x: 160, y: 90, size: 560 },
  },
]

function DetailCrop({ feature, reduce }) {
  const { x, y, size } = feature.crop
  const width = `${(SHEET.width / size) * 100}%`
  const height = `${(SHEET.height / size) * 100}%`

  return (
    <span className="relative block aspect-[4/3] overflow-hidden bg-[#E7E0D4]">
      <img
        src={DETAIL}
        alt={feature.alt}
        style={{
          width,
          height,
          left: `${(-x / size) * 100}%`,
          top: `${(-y / size) * 100}%`,
        }}
        className={`absolute max-w-none ${
          reduce
            ? ''
            : 'origin-center transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-[.is-open]:scale-[1.04]'
        }`}
      />
    </span>
  )
}

export default function SnugDifference() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [open, setOpen] = useState(null)
  const reveal = reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }

  return (
    <section id="snug-difference" className="bg-[#F1EADF] px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] md:gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
        <motion.div
          className="md:sticky md:top-24 md:self-start"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={reveal}
        >
          <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">The SNUG difference</p>
          <h2 className="mt-4 font-display text-[clamp(2.15rem,3.6vw,3.8rem)] leading-[0.92] tracking-[-0.04em]">
            COMFORT IS IN
            <br />
            THE DETAILS.
          </h2>
          <p className="mt-5 max-w-[26rem] text-[15px] leading-relaxed text-[#77716A]">
            Thoughtfully designed oversized essentials. Made for everyday movement, effortless comfort
            and individual expression.
          </p>
          <a
            href="#snug-details"
            className="group mt-7 inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="relative">
              Explore the details
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
          </a>
        </motion.div>

        <motion.div
          className="overflow-hidden"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        >
          <img
            src="/images/products/tshirt-07/lifestyle.png"
            alt="Model in the chocolate brown oversized tee, turned slightly with one hand in a pocket"
            className="h-auto w-full"
          />
        </motion.div>
      </div>

      <ul id="snug-details" className="mt-12 grid scroll-mt-28 gap-8 md:mt-16 md:grid-cols-3 md:gap-x-8 lg:gap-x-10">
        {FEATURES.map((feature, index) => {
          const active = open === index
          return (
            <motion.li
              key={feature.number}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, delay: index * 0.08, ease: EASE }}
            >
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setOpen(active ? null : index)}
                className={`group w-full border-t border-[#171717]/15 pt-4 text-left ${active ? 'is-open' : ''}`}
              >
                <DetailCrop feature={feature} reduce={reduce} />
                <p className="mt-4 text-[10px] tracking-[0.24em] text-[#77716A]">{feature.number}</p>
                <h3 className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] text-[#2c2a26] uppercase transition-colors duration-300 group-hover:text-[#171717] group-[.is-open]:text-[#171717]">
                  <span className="relative">
                    {feature.title}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#171717] ${
                        reduce
                          ? 'scale-x-100'
                          : 'scale-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-[.is-open]:scale-x-100'
                      }`}
                    />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    size={13}
                    strokeWidth={1.25}
                    className={
                      reduce
                        ? 'opacity-0'
                        : 'opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:opacity-100 group-[.is-open]:translate-x-0.5 group-[.is-open]:opacity-100'
                    }
                  />
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#77716A]">{feature.copy}</p>
              </button>
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-12 border-t border-[#171717]/15 pt-6 sm:mt-14">
        <p className="flex flex-col gap-3 text-[12px] tracking-[0.28em] text-[#171717] uppercase sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
          <span>Less restriction.</span>
          <span>More expression.</span>
          <span>Everyday comfort.</span>
        </p>
      </div>
    </section>
  )
}
