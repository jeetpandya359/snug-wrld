import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import ClothingRack from '../product-rack/ClothingRack'

export default function HeroSection() {
  const heroRef = useRef(null)
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -28])

  return (
    <section ref={heroRef} className="relative flex h-[calc(100dvh-5rem)] flex-col overflow-hidden bg-[#F1EADF] text-ink">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[minmax(14rem,44%)_minmax(0,1fr)] md:grid-rows-1 md:items-stretch lg:grid-cols-[minmax(16rem,36%)_minmax(0,1fr)] xl:grid-cols-[minmax(18rem,32%)_minmax(0,1fr)]">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col justify-center px-5 pt-5 pb-3 md:px-6 md:py-6 lg:py-8 lg:pr-5 lg:pl-10 xl:pr-8 xl:pl-12"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[2.1rem] leading-[0.88] tracking-[-0.04em] md:text-[1.8rem] lg:text-[2.1rem] xl:text-[clamp(2.89rem,2.94vw,4.57rem)]">
              THE WORLD
              <br />
              OF OVERSIZED.
            </h1>
            <p className="mt-6 text-[11px] leading-5 tracking-[0.26em] md:mt-8">
              BUILT FOR COMFORT.
              <br />
              DESIGNED FOR EXPRESSION.
            </p>
            <p className="mt-4 max-w-[32ch] text-sm leading-6 text-stone">
              Discover premium oversized essentials designed for everyday individuality.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/#new-arrivals"
                className="border border-ink px-5 py-3 text-[10px] tracking-[0.22em] transition-colors duration-300 hover:bg-ink hover:text-[#F1EADF]"
              >
                EXPLORE COLLECTION
              </Link>
              <Link to="/shop" className="px-5 py-3 text-[10px] tracking-[0.22em]">
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div id="rack" className="min-h-0 min-w-0">
          <ClothingRack />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3 text-[10px] tracking-[0.18em] uppercase sm:grid-cols-3 md:px-8 lg:px-12">
        <span>10 Premium Colours</span>
        <span className="hidden text-center sm:block">Oversized Essentials</span>
        <Link to="/shop" className="justify-self-end transition-opacity hover:opacity-60">
          Explore the collection →
        </Link>
      </div>
    </section>
  )
}
