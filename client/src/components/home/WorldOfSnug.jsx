import { motion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]

const FRAMES = [
  {
    src: '/images/brand/snug-lifestyle-campaign.png',
    alt: 'Model in a sand beige oversized tee and brown trousers, leaning against a sunlit concrete wall',
    label: '01 — The SNUG lifestyle',
    frame: 'lg:col-span-7 aspect-[16/9]',
  },
  {
    src: '/images/brand/snug-colour-collection.png',
    alt: 'Folded oversized tees in white, black, beige, olive, brown, navy, charcoal and dusty pink',
    label: '02 — Colours that speak',
    frame: 'lg:col-span-5 lg:self-end aspect-[16/9]',
  },
  {
    src: '/images/brand/snug-unboxing-packaging.png',
    alt: 'Open SNUG WRLD box with a sand beige tee, tissue paper and a black shopping bag',
    label: '03 — The unboxing experience',
    frame: 'md:col-span-2 lg:col-span-12 aspect-[16/9] lg:aspect-[2/1]',
  },
]

function EditorialFrame({ item, reduce, index }) {
  return (
    <motion.figure
      className={item.frame}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <div className="group relative h-full overflow-hidden">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${
            reduce
              ? ''
              : 'transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]'
          }`}
        />
        <figcaption
          className={`absolute bottom-4 left-4 bg-[#F1EADF]/92 px-3 py-2 text-[10px] tracking-[0.2em] text-[#171717] uppercase ${
            reduce ? '' : 'transition-opacity duration-[400ms] group-hover:opacity-100'
          }`}
        >
          {item.label}
        </figcaption>
      </div>
    </motion.figure>
  )
}

export default function WorldOfSnug() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const reveal = reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }

  return (
    <section id="world-of-snug" className="bg-[#F1EADF] px-5 py-14 text-[#171717] md:px-8 md:py-16 lg:px-12 lg:py-20">
      <motion.div
        className="max-w-[40rem]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={reveal}
      >
        <p className="text-[10px] tracking-[0.28em] text-[#77716A] uppercase">The world of SNUG</p>
        <h2 className="mt-4 font-display text-[clamp(2.15rem,3.8vw,3.9rem)] leading-[0.92] tracking-[-0.04em]">
          MORE THAN WHAT YOU WEAR.
          <br />
          IT'S HOW IT FEELS.
        </h2>
        <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#77716A]">
          From thoughtfully chosen colours to the details of every package, discover the little things that
          make the SNUG WRLD experience special.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-end lg:gap-5">
        {FRAMES.map((item, index) => (
          <EditorialFrame key={item.src} item={item} reduce={reduce} index={index} />
        ))}
      </div>

      <div className="mt-14 border-t border-[#171717]/15 pt-10 md:mt-16">
        <p className="font-display text-[clamp(1.6rem,2.8vw,2.5rem)] leading-none tracking-[-0.03em]">
          MADE FOR COMFORT. DESIGNED FOR EXPRESSION.
        </p>
        <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-[#77716A]">
          Every colour, every detail and every experience — welcome to SNUG WRLD.
        </p>
      </div>
    </section>
  )
}
