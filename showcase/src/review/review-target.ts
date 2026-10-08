// Describe a clicked element well enough to find it again later, by this
// page and by whoever fixes the note.

/** Review UI marks itself with this attribute so picking skips it. */
export const reviewUiAttribute = "data-review-ui"

export function isReviewUi(element: Element) {
  return element.closest(`[${reviewUiAttribute}]`) !== null
}

function segment(element: Element) {
  const tag = element.tagName.toLowerCase()
  const slot = element.getAttribute("data-slot")
  let part = slot ? `${tag}[data-slot="${slot}"]` : tag
  const parent = element.parentElement

  if (parent) {
    const sameTag = [...parent.children].filter(
      (child) => child.tagName === element.tagName
    )
    if (sameTag.length > 1) {
      part += `:nth-of-type(${sameTag.indexOf(element) + 1})`
    }
  }

  return part
}

export function selectorFor(element: Element) {
  const parts: string[] = []
  let current: Element | null = element

  while (current && current !== document.body) {
    if (current.id && !/^(radix-|:)/.test(current.id)) {
      parts.unshift(`#${CSS.escape(current.id)}`)
      break
    }
    parts.unshift(segment(current))
    current = current.parentElement
  }

  return parts.join(" > ")
}

export function findElement(selector: string) {
  try {
    return document.querySelector(selector)
  } catch {
    return null
  }
}

function sectionFor(element: Element) {
  let section = ""
  for (const heading of document.querySelectorAll(
    "main h1, main h2, main h3"
  )) {
    const precedes =
      heading === element ||
      heading.contains(element) ||
      heading.compareDocumentPosition(element) &
        Node.DOCUMENT_POSITION_FOLLOWING
    if (!precedes) {
      break
    }
    section = heading.textContent?.trim() ?? ""
  }
  return section
}

/** Clicks on icon parts land on the button or link that holds the icon. */
export function pickable(element: Element) {
  if (element instanceof SVGElement) {
    return (
      element.closest("button, a, [data-slot]") ??
      element.closest("svg") ??
      element
    )
  }
  return element
}

/** The registry component the element is, or sits directly inside. */
function componentFor(element: Element) {
  let current: Element | null = element
  for (let depth = 0; current && depth < 3; depth += 1) {
    const slot = current.getAttribute("data-slot")
    if (slot) {
      return slot
    }
    current = current.parentElement
  }
  return element.tagName.toLowerCase()
}

export function describeElement(element: Element) {
  const text =
    (element.textContent ?? "").replace(/\s+/g, " ").trim() ||
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    ""

  return {
    selector: selectorFor(element),
    component: componentFor(element),
    text: text.length > 60 ? `${text.slice(0, 57)}...` : text,
    section: sectionFor(element),
  }
}
