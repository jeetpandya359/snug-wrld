import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import HeroProductInfo from './HeroProductInfo'
import RackItem from './RackItem'
import { beginRackFlight } from './rackFlight'

const RAIL_IMAGE_WIDTH = 2172
const RAIL_IMAGE_HEIGHT = 724
const RAIL_CROP_TOP = 274
const RAIL_CROP_HEIGHT = 179
const SHIRT_RATIO = 1536 / 1024

export default function ClothingRack() {
  const navigate = useNavigate()
  const slotRef = useRef(null)
  const [slot, setSlot] = useState({ width: 900, height: 560 })
  const [hoveredId, setHoveredId] = useState(null)
  const [pinnedId, setPinnedId] = useState(null)
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const compact = useMediaQuery('(max-width: 767px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const node = slotRef.current
    if (!node) return undefined

    const measure = () => {
      setSlot({ width: node.clientWidth, height: node.clientHeight })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const focusId = hoveredId ?? pinnedId
  const focusIndex = products.findIndex((product) => product.id === focusId)
  const pinned = products.find((product) => product.id === pinnedId) ?? null
  const count = products.length
  const span = Math.max(1, count - 1)
  const labelSpace = 76

  const fittedRail = Math.max(280, slot.width)
  const flange = fittedRail * 0.055
  const usable = Math.max(240, fittedRail - flange * 2)
  const visibleSlice = 0.46
  const scale = 1.065
  let itemWidth = usable / (1 + visibleSlice * span)
  const maxShirtHeight = Math.max(220, slot.height - labelSpace - 48)
  itemWidth = Math.min(itemWidth, maxShirtHeight / SHIRT_RATIO, 250) * scale
  itemWidth = Math.min(itemWidth, maxShirtHeight / SHIRT_RATIO)

  const scrollLayout = compact || itemWidth < 140
  if (scrollLayout) {
    const target = (slot.height - labelSpace - 48) / SHIRT_RATIO
    itemWidth = Math.min(340, Math.max(192, target * 0.78 * scale))
  }

  const shirtHeight = itemWidth * SHIRT_RATIO
  let step = scrollLayout ? itemWidth * 0.58 : (usable - itemWidth) / span
  if (!scrollLayout && step > itemWidth * 0.68) step = itemWidth * 0.68
  const spread = focusIndex === -1 ? 0 : scrollLayout ? 14 : Math.min(22, step * 0.28)

  const railWidth = scrollLayout ? 32 + span * step + itemWidth + spread + 32 : fittedRail
  const railHeight = railWidth * (RAIL_CROP_HEIGHT / RAIL_IMAGE_WIDTH)
  const cluster = span * step + itemWidth
  const clusterStart = scrollLayout ? 24 : Math.max(flange * 0.35, (railWidth - cluster) / 2)
  const groupHeight = railHeight * 0.5 + shirtHeight * 0.94
  const centered = (slot.height - labelSpace - groupHeight) / 2
  const drop = scrollLayout
    ? Math.min(24, Math.max(12, slot.height * 0.035))
    : Math.min(74, Math.max(58, slot.height * 0.095))
  const lowest = slot.height - labelSpace - groupHeight - 20
  const railTop = Math.max(8, Math.min(lowest, centered + drop))
  const barCenter = railTop + railHeight * 0.5

  function place(index) {
    let left = clusterStart + index * step
    if (focusIndex !== -1) {
      if (index < focusIndex) left -= spread
      if (index > focusIndex) left += spread
    }
    return left
  }

  function openProduct(id) {
    const node = document.querySelector(`[data-product="${id}"]`)
    const image = node
      ? [...node.querySelectorAll('img')].find((item) => Number(getComputedStyle(item).opacity) > 0.4)
      : null
    const box = (image || node)?.getBoundingClientRect()
    const src = image?.currentSrc || image?.src || ''
    if (box && src && box.width > 0 && !reduce) {
      beginRackFlight({
        id,
        src,
        from: { top: box.top, left: box.left, width: box.width, height: box.height },
      })
      window.requestAnimationFrame(() => navigate(`/product/${id}`))
      return
    }
    navigate(`/product/${id}`)
  }

  function activate(id) {
    openProduct(id)
  }

  function move(direction) {
    const current = focusIndex === -1 ? 0 : focusIndex
    const next = products[Math.min(count - 1, Math.max(0, current + direction))]
    if (!next) return
    setPinnedId(next.id)
    setHoveredId(null)
    document.querySelector(`[data-product="${next.id}"]`)?.focus()
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div
        ref={slotRef}
        className={
          scrollLayout
            ? 'rack-scroll min-h-0 flex-1 overflow-x-auto overflow-y-hidden'
            : 'min-h-0 flex-1 overflow-hidden'
        }
      >
        <div
          role="list"
          aria-label="Hanging collection"
          onMouseLeave={() => setHoveredId(null)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              move(1)
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              move(-1)
            }
          }}
          className="relative h-full"
          style={{ width: scrollLayout ? railWidth : '100%', minHeight: shirtHeight + railTop }}
        >
          <div
            className="pointer-events-none absolute left-0 z-[1] overflow-hidden"
            style={{ top: railTop, width: scrollLayout ? railWidth : '100%', height: railHeight }}
          >
            <img
              src="/images/rack/clothing-rail.png"
              alt=""
              draggable="false"
              className="absolute left-0 w-full max-w-none select-none"
              style={{
                height: `${(RAIL_IMAGE_HEIGHT / RAIL_CROP_HEIGHT) * 100}%`,
                top: `${(-RAIL_CROP_TOP / RAIL_CROP_HEIGHT) * 100}%`,
              }}
            />
          </div>

          {products.map((product, index) => (
            <RackItem
              key={product.id}
              product={product}
              index={index}
              active={product.id === focusId}
              hovered={product.id === hoveredId}
              x={place(index)}
              width={itemWidth}
              barCenter={barCenter}
              reduce={reduce}
              onHover={(id) => {
                if (canHover) setHoveredId(id)
              }}
              onFocus={(id) => setPinnedId(id)}
              onActivate={activate}
            />
          ))}
        </div>
      </div>

      <div className="flex h-[4.75rem] shrink-0 items-center justify-center">
        {pinned && !hoveredId ? (
          <motion.div
            key={pinned.id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroProductInfo product={pinned} onView={openProduct} />
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
