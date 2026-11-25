import { useEffect, useRef, useState } from 'react'
import { clearRackFlight, finishRackFlight, useRackFlight } from './rackFlight'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function RackFlight() {
  const flight = useRackFlight()
  const node = useRef(null)
  const [to, setTo] = useState(null)

  useEffect(() => {
    setTo(null)
  }, [flight.id])

  useEffect(() => {
    if (flight.phase !== 'moving' || !flight.from) return undefined

    let frame = 0
    const started = performance.now()

    const look = () => {
      const stage = document.querySelector('[data-product-stage]')
      const box = stage?.getBoundingClientRect()
      if (box && box.width > 8 && box.height > 8) {
        const padX = box.width * 0.07
        const padY = box.height * 0.06
        setTo({
          top: box.top + padY,
          left: box.left + padX,
          width: box.width - padX * 2,
          height: box.height - padY * 2,
        })
        return
      }
      if (performance.now() - started > 1600) {
        clearRackFlight()
        return
      }
      frame = requestAnimationFrame(look)
    }

    frame = requestAnimationFrame(look)
    return () => cancelAnimationFrame(frame)
  }, [flight.phase, flight.id, flight.from])

  useEffect(() => {
    const image = node.current
    if (!image || !to || !flight.from) return undefined

    const animation = image.animate(
      [
        {
          top: `${flight.from.top}px`,
          left: `${flight.from.left}px`,
          width: `${flight.from.width}px`,
          height: `${flight.from.height}px`,
          opacity: 1,
        },
        {
          top: `${to.top}px`,
          left: `${to.left}px`,
          width: `${to.width}px`,
          height: `${to.height}px`,
          opacity: 1,
        },
      ],
      { duration: 760, easing: EASE, fill: 'forwards' },
    )

    animation.onfinish = () => finishRackFlight()
    return () => animation.cancel()
  }, [to, flight.id, flight.from])

  useEffect(() => {
    const image = node.current
    if (!image || flight.phase !== 'landed') return undefined
    const animation = image.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 280,
      easing: 'ease',
      fill: 'forwards',
    })
    return () => animation.cancel()
  }, [flight.phase])

  if (flight.phase === 'idle' || !flight.from || !flight.src) return null

  const place = flight.phase === 'landed' && to ? to : flight.from

  return (
    <img
      ref={node}
      src={flight.src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className="pointer-events-none fixed z-40 object-contain object-top"
      style={{
        top: place.top,
        left: place.left,
        width: place.width,
        height: place.height,
      }}
    />
  )
}
