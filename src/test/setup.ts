import '@testing-library/jest-dom'
import { vi, beforeEach, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
})

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true
})

// Mock HTMLCanvasElement getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: [] })),
  putImageData: vi.fn(),
  createImageData: vi.fn(() => ({ data: [] })),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  fillText: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  translate: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  transform: vi.fn(),
  rect: vi.fn(),
  clip: vi.fn(),
})

// Helper function to filter out animation props
const filterProps = (props: any) => {
  const {
    initial,
    animate,
    whileInView,
    whileHover,
    whileTap,
    whileFocus,
    transition,
    variants,
    custom,
    viewport,
    ...filteredProps
  } = props
  return filteredProps
}

// Mock framer-motion globally
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (target, prop) => {
      return ({ children, ...props }: any) => {
        const Tag = prop as string
        const filteredProps = filterProps(props)
        return React.createElement(Tag, filteredProps, children)
      }
    }
  }),
  AnimatePresence: ({ children }: any) => children,
}))