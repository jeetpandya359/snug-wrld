import { useEffect, useState } from 'react'

const cache = new Map()

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Could not load ${src}`))
    image.src = src
  })
}

function hasTransparentGround(image) {
  const sample = document.createElement('canvas')
  sample.width = 4
  sample.height = 4
  const context = sample.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0, 4, 4)
  return context.getImageData(0, 0, 1, 1).data[3] < 16
}

function cutoutNearWhite(image, tight) {
  if (hasTransparentGround(image)) return Promise.resolve(image.src)

  const maxEdge = 1100
  const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight))
  const width = Math.max(1, Math.round(image.naturalWidth * scale))
  const height = Math.max(1, Math.round(image.naturalHeight * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0, width, height)

  const frame = context.getImageData(0, 0, width, height)
  const pixels = frame.data
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  const count = width * height
  const ground = new Uint8Array(count)

  for (let pixel = 0; pixel < count; pixel += 1) {
    const index = pixel * 4
    const red = pixels[index]
    const green = pixels[index + 1]
    const blue = pixels[index + 2]
    const min = Math.min(red, green, blue)
    const chroma = Math.max(red, green, blue) - min
    const limit = tight ? 248 : 196
    const maxChroma = tight ? 12 : 20
    if (chroma < maxChroma && min >= limit) ground[pixel] = 1
  }

  const stack = []
  const mark = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const pixel = y * width + x
    if (ground[pixel] !== 1) return
    ground[pixel] = 2
    stack.push(pixel)
  }

  for (let x = 0; x < width; x += 1) {
    mark(x, 0)
    mark(x, height - 1)
  }
  for (let y = 0; y < height; y += 1) {
    mark(0, y)
    mark(width - 1, y)
  }

  while (stack.length) {
    const pixel = stack.pop()
    const x = pixel % width
    const y = (pixel - x) / width
    pixels[pixel * 4 + 3] = 0
    mark(x + 1, y)
    mark(x - 1, y)
    mark(x, y + 1)
    mark(x, y - 1)
  }

  for (let pixel = 0; pixel < count; pixel += 1) {
    if (pixels[pixel * 4 + 3] <= 20) continue
    const x = pixel % width
    const y = (pixel - x) / width
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }

  if (maxX <= minX || maxY <= minY) {
    return Promise.resolve(image.src)
  }

  context.putImageData(frame, 0, 0)
  const cropWidth = maxX - minX + 1
  const cropHeight = maxY - minY + 1
  const cropped = document.createElement('canvas')
  cropped.width = cropWidth
  cropped.height = cropHeight
  cropped
    .getContext('2d')
    .drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

  return new Promise((resolve) => {
    cropped.toBlob((blob) => {
      resolve(blob ? URL.createObjectURL(blob) : image.src)
    }, 'image/png')
  })
}

function getCutout(src, tight) {
  const key = tight ? `tight:${src}` : src
  if (!cache.has(key)) {
    cache.set(
      key,
      loadImage(src)
        .then((image) => cutoutNearWhite(image, tight))
        .catch(() => src),
    )
  }

  return cache.get(key)
}

export function useCutout(src, tight = false) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    let cancelled = false

    getCutout(src, tight).then((next) => {
      if (!cancelled) setUrl(next)
    })

    return () => {
      cancelled = true
    }
  }, [src, tight])

  return url
}
