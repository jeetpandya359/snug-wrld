import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]

const NOTES = [
  {
    number: '01',
    title: 'Thoughtful presentation',
    copy: 'Every order deserves a considered first impression.',
  },
  {
    number: '02',
    title: 'Signature identity',
    copy: 'Recognisable details. A distinct SNUG WRLD identity.',
  },
  {
    number: '03',
    title: 'Made for everyday',
    copy: 'Essentials designed to become part of your everyday wardrobe.',
  },
]

function Frame({ src, alt, className, reduce }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${
          reduce
            ? ''
            : 'transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]'
        }`}
      />
    </div>
  )
}

export default function SnugExperience() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const reveal = reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }

  return (
    <section id="snug-experience" className="bg-[#F1EADF] px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_32rem] lg:gap-x-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reveal}
        >
          <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">The SNUG experience</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4vw,4.25rem)] leading-[0.9] tracking-[-0.04em]">
            MORE THAN WHAT
            <br />
            YOU WEAR.
          </h2>
          <p className="mt-4 font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-none tracking-[-0.03em]">
            IT'S HOW IT FEELS.
          </p>
          <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-[#77716A] lg:grid-cols-2 lg:gap-x-10">
            <p>
              From the first touch of our heavyweight cotton to the moment your order arrives, every detail
              reflects the SNUG WRLD approach to everyday streetwear.
            </p>
            <p>
              The tissue, the box and the woven label belong to the same quiet identity. Nothing is added
              for show.
            </p>
            <p>
              A relaxed fit you reach for without thinking, and a presentation that feels as considered as
              the garment itself.
            </p>
            <p>
              Open it once and the feeling is already familiar. Soft cotton, a recognisable label, and room
              to move through the day.
            </p>
          </div>
          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase"
          >
            <span className="relative">
              Discover our story
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
        </motion.div>

        <motion.div
          className="group relative w-full max-w-[32rem] justify-self-center lg:justify-self-end"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reveal}
        >
          <Frame
            src="/images/branding/packaging.png"
            alt="Black SNUG WRLD shopping bag beside an open box lined with branded tissue"
            className="aspect-[3/4]"
            reduce={reduce}
          />
          <div className="mt-4 border border-[#171717]/15 bg-[#F1EADF] p-2 md:absolute md:bottom-5 md:left-4 md:mt-0 md:w-[48%]">
            <Frame
              src="/images/branding/clothing-label.png"
              alt="Woven black SNUG WRLD clothing label"
              className="aspect-[3/1]"
              reduce={reduce}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="group mt-16 overflow-hidden md:mt-24"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reveal}
      >
        <Frame
          src="/images/collections/brand-story.png"
          alt="Clothing rail of oversized tees above folded garments and a black box"
          className="aspect-[16/9] [&>img]:object-[center_62%]"
          reduce={reduce}
        />
      </motion.div>

      <ul className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
        {NOTES.map((note, index) => (
          <motion.li
            key={note.number}
            className="border-t border-[#171717]/15 pt-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, delay: index * 0.08, ease: EASE }}
          >
            <p className="text-[10px] tracking-[0.24em] text-[#77716A]">{note.number}</p>
            <h3 className="mt-3 text-[13px] tracking-[0.16em] uppercase">{note.title}</h3>
            <p className="mt-3 max-w-[22rem] text-[15px] leading-relaxed text-[#77716A]">{note.copy}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
