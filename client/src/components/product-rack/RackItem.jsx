import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCutout } from '../../hooks/useCutout'
import { rackFrontSrc } from './rackFronts'

const SPRING = { type: 'spring', stiffness: 140, damping: 24, mass: 1 }
const FULL_HANGER_PEAK = 0.062
const FADE = 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)'

export default function RackItem({
  product,
  index,
  active,
  hovered,
  x,
  width,
  barCenter,
  reduce,
  onHover,
  onFocus,
  onActivate,
}) {
  const hanging = useCutout(product.images.hanging)
  const front = useCutout(rackFrontSrc(product.id), true)
  const [ratio, setRatio] = useState(1536 / 1024)
  const cropped = Boolean(hanging && hanging.startsWith('blob:'))
  const height = width * ratio
  const peak = cropped ? 0.018 : FULL_HANGER_PEAK
  const showFront = Boolean(hovered && front)
  const fade = reduce ? 'none' : FADE

  return (
    <motion.button
      type="button"
      data-product={product.id}
      aria-pressed={active}
      aria-label={`${product.name}, ${product.colorName}`}
      onMouseEnter={() => onHover(product.id)}
      onFocus={() => onFocus(product.id)}
      onClick={() => onActivate(product.id)}
      className="absolute cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
      style={{
        left: 0,
        top: barCenter - height * peak,
        width,
        zIndex: active ? 30 : index + 2,
        transformOrigin: '50% 6%',
      }}
      initial={false}
      animate={{
        x,
        scale: active ? 1.06 : 1,
      }}
      transition={reduce ? { duration: 0 } : SPRING}
    >
      <span className="relative block">
        <img
          src={hanging || undefined}
          alt=""
          draggable="false"
          decoding="async"
          onLoad={(event) => {
            const image = event.currentTarget
            if (image.naturalWidth) setRatio(image.naturalHeight / image.naturalWidth)
          }}
          className="pointer-events-none block h-auto w-full select-none"
          style={{
            opacity: showFront ? 0 : 1,
            transition: fade,
            filter: 'drop-shadow(0 16px 12px rgba(36, 28, 20, 0.1))',
          }}
        />
        <img
          src={front || undefined}
          alt=""
          draggable="false"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-top select-none"
          style={{
            opacity: showFront ? 1 : 0,
            transition: fade,
            filter: 'drop-shadow(0 16px 12px rgba(36, 28, 20, 0.1))',
          }}
        />
      </span>
    </motion.button>
  )
}
