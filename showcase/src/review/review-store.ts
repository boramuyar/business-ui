import { useSyncExternalStore } from "react"

// Review notes live in this browser only (localStorage), so a reviewer can
// walk every page, collect notes, and export them in one go.

export type ReviewNote = {
  id: string
  /** Path and search of the page, e.g. "/primitives/button". */
  path: string
  /** CSS selector that found the element when the note was made. */
  selector: string
  /** Nearest registry component (its data-slot), or the tag name. */
  component: string
  /** Start of the element's visible text, to recognise it by. */
  text: string
  /** Heading the element sits under, if any. */
  section: string
  note: string
  theme: "light" | "dark"
  viewport: number
  createdAt: string
}

const enabledKey = "bui-review:enabled"
const notesKey = "bui-review:notes"
const listeners = new Set<() => void>()

let cachedRaw: string | null | undefined
let cachedNotes: ReviewNote[] = []

function read(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, value)
    }
  } catch {
    // Storage blocked: notes last until the tab closes.
  }
  emit()
}

function emit() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Keep several open tabs in step.
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

export function isReviewEnabled() {
  return read(enabledKey) === "1"
}

export function setReviewEnabled(enabled: boolean) {
  write(enabledKey, enabled ? "1" : null)
}

export function useReviewEnabled() {
  return useSyncExternalStore(subscribe, isReviewEnabled, () => false)
}

function getNotes() {
  const raw = read(notesKey)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      const parsed = raw ? JSON.parse(raw) : []
      cachedNotes = Array.isArray(parsed) ? parsed : []
    } catch {
      cachedNotes = []
    }
  }
  return cachedNotes
}

function setNotes(notes: ReviewNote[]) {
  write(notesKey, notes.length ? JSON.stringify(notes) : null)
}

export function useReviewNotes() {
  return useSyncExternalStore(subscribe, getNotes, () => cachedNotes)
}

export function addNote(note: Omit<ReviewNote, "id" | "createdAt">) {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now())
  setNotes([
    ...getNotes(),
    { ...note, id, createdAt: new Date().toISOString() },
  ])
}

export function updateNote(id: string, note: string) {
  setNotes(
    getNotes().map((entry) => (entry.id === id ? { ...entry, note } : entry))
  )
}

export function removeNote(id: string) {
  setNotes(getNotes().filter((entry) => entry.id !== id))
}

export function clearNotes() {
  setNotes([])
}

/** Notes grouped by page, in the order the pages were first noted. */
export function groupByPage(notes: ReviewNote[]) {
  const pages = new Map<string, ReviewNote[]>()
  for (const note of notes) {
    pages.set(note.path, [...(pages.get(note.path) ?? []), note])
  }
  return [...pages.entries()]
}

/** One markdown block to paste into the project chat. */
export function toMarkdown(notes: ReviewNote[], origin: string) {
  const pages = groupByPage(notes)
  const lines = [
    "## Showcase review notes",
    "",
    `${origin}: ${notes.length} ${notes.length === 1 ? "note" : "notes"} on ${pages.length} ${pages.length === 1 ? "page" : "pages"}.`,
  ]
  let index = 0

  for (const [path, pageNotes] of pages) {
    lines.push("", `### ${path}`, "")
    for (const note of pageNotes) {
      index += 1
      const label = [
        note.component,
        note.text ? `"${note.text}"` : "",
        note.section ? `under "${note.section}"` : "",
      ]
        .filter(Boolean)
        .join(" ")
      lines.push(
        `${index}. **${label}** (${note.theme}, ${note.viewport}px wide)`,
        `   \`${note.selector}\``,
        ...note.note.split("\n").map((line) => `   > ${line}`)
      )
    }
  }

  return lines.join("\n")
}
