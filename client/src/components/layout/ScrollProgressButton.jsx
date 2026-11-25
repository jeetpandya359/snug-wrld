import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const SIZE = 54
const STROKE = 3.6
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function scrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
  const distance = document.documentElement.scrollHeight - window.innerHeight
  if (distance <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / distance))
}

export default function ScrollProgressButton() {
  const { pathname } = useLocation()
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [progress, setProgress] = useState(0)
  const [lifted, setLifted] = useState(false)
  const frame = useRef(0)

  useEffect(() => {
    const read = () => {
      const next = scrollProgress()
      setProgress((current) => (Math.abs(current - next) < 0.001 ? current : next))
      const bar = document.querySelector('.fixed.inset-x-0.bottom-0')
      setLifted((current) => {
        const nextLifted = Boolean(bar)
        return current === nextLifted ? current : nextLifted
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const observer = new MutationObserver(onScroll)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
    }
  }, [pathname])

  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      className={`group fixed z-[45] grid size-[46px] place-items-center rounded-full bg-[#F7F2EA] p-0 text-[#111111] right-[18px] md:right-8 md:size-[54px] ${
        lifted ? 'bottom-24 md:bottom-8' : 'bottom-5 md:bottom-8'
      } ${
        reduce
          ? ''
          : 'transition-[background-color,scale] duration-300 ease-out hover:scale-105 hover:bg-[#F1E9DD]'
      } focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#111111]`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#222222"
          strokeOpacity="0.22"
          strokeWidth={STROKE}
        />
        {progress > 0.004 && (
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#111111"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        )}
      </svg>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={`size-[22px] md:size-6 ${reduce ? '' : 'transition-transform duration-300 ease-out group-hover:-translate-y-0.5'}`}
      >
        <path
          d="M16 23.6V11.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
        <path
          d="M7.4 16.8C9.8 12.4 12.8 9.2 16 7.4C19.2 9.2 22.2 12.4 24.6 16.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] hidden -translate-y-1/2 bg-[#111111] px-2.5 py-1 text-[10px] tracking-[0.16em] whitespace-nowrap text-[#F7F2EA] uppercase opacity-0 md:block md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
        Back to top
      </span>
    </button>
  )
}
