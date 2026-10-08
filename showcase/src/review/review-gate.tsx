import { lazy, Suspense, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { setReviewEnabled, useReviewEnabled } from "./review-store"

// Review mode is off for visitors. `?review` turns it on in this browser
// (and it stays on across pages and reloads); `?review=off` or its close
// button turns it off. The UI only downloads once it is on.
const ReviewMode = lazy(() => import("./review-mode"))

export function ReviewGate() {
  const { search } = useLocation()
  const enabled = useReviewEnabled()

  useEffect(() => {
    const value = new URLSearchParams(search).get("review")
    if (value !== null) {
      setReviewEnabled(value !== "off" && value !== "0")
    }
  }, [search])

  if (!enabled) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <ReviewMode />
    </Suspense>
  )
}
