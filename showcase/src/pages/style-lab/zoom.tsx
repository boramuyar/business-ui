import { Button } from "@frontend/primitives/button"
import { ButtonGroup } from "@frontend/primitives/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@frontend/primitives/select"
import { cn } from "@frontend/utilities"
import { MinusIcon, PlusIcon } from "lucide-react"
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8]
export const MIN_ZOOM = ZOOM_LEVELS[0]
export const MAX_ZOOM = ZOOM_LEVELS[ZOOM_LEVELS.length - 1]

export function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 100) / 100))
}

function stepZoom(current: number, direction: 1 | -1) {
  const next =
    direction === 1
      ? ZOOM_LEVELS.find((level) => level > current + 0.001)
      : [...ZOOM_LEVELS].reverse().find((level) => level < current - 0.001)
  return next ?? current
}

export function ZoomControl({
  zoom,
  onChange,
}: {
  zoom: number
  onChange: (zoom: number) => void
}) {
  const percent = `${Math.round(zoom * 100)}`
  return (
    <ButtonGroup>
      <Button
        aria-label="Zoom out"
        disabled={zoom <= MIN_ZOOM}
        onClick={() => onChange(stepZoom(zoom, -1))}
        size="icon-sm"
        variant="outline"
      >
        <MinusIcon />
      </Button>
      <Select
        onValueChange={(value) => onChange(Number(value) / 100)}
        value={
          ZOOM_LEVELS.some((l) => Math.round(l * 100) === Number(percent))
            ? percent
            : undefined
        }
      >
        <SelectTrigger
          aria-label="Zoom level"
          className="h-7 w-20 justify-center font-mono"
          size="sm"
        >
          <SelectValue placeholder={`${percent}%`} />
        </SelectTrigger>
        <SelectContent>
          {ZOOM_LEVELS.map((level) => (
            <SelectItem key={level} value={`${Math.round(level * 100)}`}>
              {Math.round(level * 100)}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        aria-label="Zoom in"
        disabled={zoom >= MAX_ZOOM}
        onClick={() => onChange(stepZoom(zoom, 1))}
        size="icon-sm"
        variant="outline"
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}

/**
 * Renders children with the CSS `zoom` property, so the browser lays out and
 * paints them at the larger size (crisp text, borders and shadows, like browser
 * zoom) instead of scaling a bitmap. Content keeps its 100% layout width and
 * the frame scrolls; ctrl/⌘ + wheel or a trackpad pinch zooms around the cursor.
 */
export function ZoomFrame({
  zoom,
  onZoomChange,
  className,
  style,
  children,
}: {
  zoom: number
  onZoomChange: (zoom: number) => void
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [baseWidth, setBaseWidth] = useState<number>()
  const anchor = useRef<{ x: number; y: number; from: number } | null>(null)
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom

  // Track the frame's inner width so content keeps its 100% layout when zoomed.
  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const measure = () => {
      const styles = getComputedStyle(frame)
      setBaseWidth(
        frame.clientWidth -
          Number.parseFloat(styles.paddingLeft) -
          Number.parseFloat(styles.paddingRight)
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  // Pinch / ctrl+wheel needs a non-passive listener to stop browser zoom.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const rect = frame.getBoundingClientRect()
      const current = zoomRef.current
      const next = clampZoom(current * Math.exp(-event.deltaY * 0.003))
      if (next === current) return
      anchor.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        from: current,
      }
      onZoomChange(next)
    }
    frame.addEventListener("wheel", onWheel, { passive: false })
    return () => frame.removeEventListener("wheel", onWheel)
  }, [onZoomChange])

  // Keep the point under the cursor (or the frame center) in place.
  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const point = anchor.current ?? {
      x: frame.clientWidth / 2,
      y: frame.clientHeight / 2,
      from: Number(frame.dataset.zoom ?? zoom),
    }
    const ratio = zoom / point.from
    if (ratio !== 1) {
      frame.scrollLeft = (frame.scrollLeft + point.x) * ratio - point.x
      frame.scrollTop = (frame.scrollTop + point.y) * ratio - point.y
    }
    anchor.current = null
    frame.dataset.zoom = String(zoom)
  }, [zoom])

  return (
    <div
      className={cn("overflow-auto overscroll-contain", className)}
      ref={frameRef}
      style={style}
    >
      <div style={{ zoom, width: baseWidth }}>{children}</div>
    </div>
  )
}
