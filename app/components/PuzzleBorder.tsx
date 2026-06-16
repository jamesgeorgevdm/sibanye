'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Edge = 'flat' | 'tab' | 'blank'

type Edges = {
  top: Edge
  right: Edge
  bottom: Edge
  left: Edge
}

type ColorSet = { fill: string; stroke: string }

type PuzzleBorderProps = {
  /** Full hero edges, or a tight frame around a card/parent */
  scope?: 'viewport' | 'card'
  className?: string
}

const PIECE_SIZE = 44
const TAB_RADIUS = 8
const TAB_DEPTH = 9
const OVERLAP = TAB_DEPTH
const STEP = PIECE_SIZE - OVERLAP

const GALLERY_COLORS: ColorSet[] = [
  { fill: '#4ade80', stroke: '#15803d' },
  { fill: '#22c55e', stroke: '#14532d' },
  { fill: '#86efac', stroke: '#166534' },
  { fill: '#16a34a', stroke: '#052e16' },
  { fill: '#bbf7d0', stroke: '#15803d' },
]

function opposite(edge: Edge): Edge {
  if (edge === 'tab') return 'blank'
  if (edge === 'blank') return 'tab'
  return 'flat'
}

function outwardEdge(r: number, c: number): Edge {
  return (r + c) % 2 === 0 ? 'tab' : 'blank'
}

function getEdges(r: number, c: number, rows: number, cols: number): Edges {
  return {
    top: r === 0 ? 'flat' : opposite(outwardEdge(r - 1, c)),
    left: c === 0 ? 'flat' : opposite(outwardEdge(r, c - 1)),
    bottom: r === rows - 1 ? 'flat' : outwardEdge(r, c),
    right: c === cols - 1 ? 'flat' : outwardEdge(r, c),
  }
}

function horizontalEdge(
  y: number,
  x1: number,
  x2: number,
  edge: Edge,
  side: 'top' | 'bottom'
): string {
  if (edge === 'flat') return `L ${x2} ${y} `

  const mid = (x1 + x2) / 2
  const s = mid - TAB_RADIUS
  const e = mid + TAB_RADIUS
  const ltr = x2 > x1
  const outward =
    edge === 'tab'
      ? side === 'top'
        ? 'up'
        : 'down'
      : side === 'top'
        ? 'down'
        : 'up'
  const d = outward === 'up' ? -TAB_DEPTH : TAB_DEPTH

  if (ltr) return `L ${s} ${y} Q ${mid} ${y + d} ${e} ${y} L ${x2} ${y} `
  return `L ${e} ${y} Q ${mid} ${y + d} ${s} ${y} L ${x2} ${y} `
}

function verticalEdge(
  x: number,
  y1: number,
  y2: number,
  edge: Edge,
  side: 'left' | 'right'
): string {
  if (edge === 'flat') return `L ${x} ${y2} `

  const mid = (y1 + y2) / 2
  const s = mid - TAB_RADIUS
  const e = mid + TAB_RADIUS
  const downward = y2 > y1
  const outward =
    edge === 'tab'
      ? side === 'left'
        ? 'left'
        : 'right'
      : side === 'left'
        ? 'right'
        : 'left'
  const d = outward === 'left' ? -TAB_DEPTH : TAB_DEPTH

  if (downward) return `L ${x} ${s} Q ${x + d} ${mid} ${x} ${e} L ${x} ${y2} `
  return `L ${x} ${e} Q ${x + d} ${mid} ${x} ${s} L ${x} ${y2} `
}

function buildPath(edges: Edges, size: number): string {
  let d = `M 0 0 `
  d += horizontalEdge(0, 0, size, edges.top, 'top')
  d += verticalEdge(size, 0, size, edges.right, 'right')
  d += horizontalEdge(size, size, 0, edges.bottom, 'bottom')
  d += verticalEdge(0, size, 0, edges.left, 'left')
  d += 'Z'
  return d
}

function spanCount(length: number): number {
  return Math.max(3, Math.ceil((length - PIECE_SIZE) / STEP) + 1)
}

type PlacedPiece = {
  r: number
  c: number
  x: number
  y: number
  key: string
}

function buildBorderPieces(cols: number, rows: number): PlacedPiece[] {
  const pieces: PlacedPiece[] = []

  for (let c = 0; c < cols; c++) {
    pieces.push({ r: 0, c, x: c * STEP, y: 0, key: `t-${c}` })
    pieces.push({ r: rows - 1, c, x: c * STEP, y: (rows - 1) * STEP, key: `b-${c}` })
  }

  for (let r = 1; r < rows - 1; r++) {
    pieces.push({ r, c: 0, x: 0, y: r * STEP, key: `l-${r}` })
    pieces.push({ r, c: cols - 1, x: (cols - 1) * STEP, y: r * STEP, key: `r-${r}` })
  }

  return pieces
}

function PuzzlePiece({
  edges,
  color,
  stroke,
}: {
  edges: Edges
  color: string
  stroke: string
}) {
  const pad = TAB_DEPTH + 1
  const view = PIECE_SIZE + pad * 2

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${view} ${view}`}
      width={PIECE_SIZE}
      height={PIECE_SIZE}
      className="block"
      aria-hidden="true"
    >
      <path
        d={buildPath(edges, PIECE_SIZE)}
        fill={color}
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PuzzleBorder({
  scope = 'viewport',
  className = '',
}: PuzzleBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setSize({ width: el.clientWidth, height: el.clientHeight })
  }, [])

  useEffect(() => {
    measure()
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const { width, height } = size
  const cols = width > 0 ? spanCount(width) : 0
  const rows = height > 0 ? spanCount(height) : 0
  const pieces = width > 0 && height > 0 ? buildBorderPieces(cols, rows) : []
  const palette = GALLERY_COLORS

  const positionClass =
    scope === 'viewport'
      ? 'absolute top-16 left-0 right-0 bottom-0 hidden md:block'
      : 'absolute inset-0 hidden sm:block'

  return (
    <div
      ref={containerRef}
      className={`${positionClass} pointer-events-none overflow-hidden z-[5] ${className}`}
      aria-hidden="true"
    >
      {pieces.map(({ r, c, x, y, key }, index) => {
        const edges = getEdges(r, c, rows, cols)
        const colors = palette[(r + c + index) % palette.length]

        return (
          <div
            key={key}
            className="absolute"
            style={{ left: x, top: y, width: PIECE_SIZE, height: PIECE_SIZE }}
          >
            <PuzzlePiece edges={edges} color={colors.fill} stroke={colors.stroke} />
          </div>
        )
      })}
    </div>
  )
}

/** Padding to keep content inside a card puzzle frame */
export const PUZZLE_CARD_INSET = 'p-[38px] sm:p-[42px]'
