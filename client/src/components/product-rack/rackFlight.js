import { useSyncExternalStore } from 'react'

const IDLE = { id: null, src: '', from: null, phase: 'idle' }

let state = IDLE
let token = 0
const listeners = new Set()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function beginRackFlight(flight) {
  token += 1
  state = { id: flight.id, src: flight.src, from: flight.from, phase: 'moving' }
  emit()
}

export function finishRackFlight() {
  if (state.phase !== 'moving') return
  const current = token
  state = { ...state, phase: 'landed' }
  emit()
  window.setTimeout(() => {
    if (current !== token) return
    state = IDLE
    emit()
  }, 340)
}

export function clearRackFlight() {
  token += 1
  state = IDLE
  emit()
}

export function useRackFlight() {
  return useSyncExternalStore(subscribe, () => state, () => IDLE)
}
