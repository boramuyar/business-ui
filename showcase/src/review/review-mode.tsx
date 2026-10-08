import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@frontend/primitives/alert-dialog"
import { Badge } from "@frontend/primitives/badge"
import { Button } from "@frontend/primitives/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@frontend/primitives/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@frontend/primitives/item"
import { Kbd } from "@frontend/primitives/kbd"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@frontend/primitives/popover"
import { Separator } from "@frontend/primitives/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@frontend/primitives/sheet"
import { Textarea } from "@frontend/primitives/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@frontend/primitives/tooltip"
import {
  CopyIcon,
  ListIcon,
  MessageSquarePlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"
import {
  addNote,
  clearNotes,
  groupByPage,
  type ReviewNote,
  removeNote,
  setReviewEnabled,
  toMarkdown,
  updateNote,
  useReviewNotes,
} from "./review-store"
import {
  describeElement,
  findElement,
  isReviewUi,
  pickable,
  reviewUiAttribute,
} from "./review-target"

const ui = { [reviewUiAttribute]: "" }

type Draft = {
  element: Element
  /** Set when editing an existing note. */
  noteId?: string
  note: string
}

/** The current page, without the ?review switch. */
function usePagePath() {
  const { pathname, search } = useLocation()
  const params = new URLSearchParams(search)
  params.delete("review")
  const rest = params.toString()
  return rest ? `${pathname}?${rest}` : pathname
}

/** Re-render while the page scrolls, resizes or shifts under the overlay. */
function useLayoutTick(active: boolean) {
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!active) {
      return
    }
    let frame = 0
    const bump = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTick((tick) => tick + 1))
    }
    window.addEventListener("scroll", bump, { capture: true, passive: true })
    window.addEventListener("resize", bump)
    const interval = window.setInterval(bump, 1000)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", bump, { capture: true })
      window.removeEventListener("resize", bump)
      window.clearInterval(interval)
    }
  }, [active])
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement)
  )
}

export default function ReviewMode() {
  const notes = useReviewNotes()
  const path = usePagePath()
  const { resolvedTheme } = useTheme()
  const [picking, setPicking] = useState(false)
  const [hovered, setHovered] = useState<Element | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [listOpen, setListOpen] = useState(false)

  const numbers = useMemo(() => {
    const map = new Map<string, number>()
    for (const [, pageNotes] of groupByPage(notes)) {
      for (const note of pageNotes) {
        map.set(note.id, map.size + 1)
      }
    }
    return map
  }, [notes])

  const pageNotes = notes.filter((note) => note.path === path)
  useLayoutTick(picking || pageNotes.length > 0 || draft !== null)

  // Leave picking and drop a half-made note when the page changes.
  useEffect(() => {
    setPicking(false)
    setDraft(null)
  }, [path])

  // C starts picking, Escape stops it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      if (event.key === "Escape") {
        setPicking(false)
        return
      }
      if (event.key === "c" && !isTyping(event.target)) {
        event.preventDefault()
        setDraft(null)
        setPicking((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  // While picking, the page underneath does not react to the pointer.
  useEffect(() => {
    if (!picking) {
      setHovered(null)
      return
    }

    function target(event: Event) {
      const element = event.target
      return element instanceof Element && !isReviewUi(element)
        ? pickable(element)
        : null
    }
    function onMove(event: PointerEvent) {
      setHovered(target(event))
    }
    function block(event: Event) {
      if (target(event)) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    function onClick(event: MouseEvent) {
      const element = target(event)
      if (!element) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      setPicking(false)
      setDraft({ element, note: "" })
    }

    const blocked = ["pointerdown", "mousedown", "pointerup", "mouseup"]
    document.addEventListener("pointermove", onMove, true)
    document.addEventListener("click", onClick, true)
    for (const type of blocked) {
      document.addEventListener(type, block, true)
    }
    document.documentElement.style.cursor = "crosshair"
    return () => {
      document.removeEventListener("pointermove", onMove, true)
      document.removeEventListener("click", onClick, true)
      for (const type of blocked) {
        document.removeEventListener(type, block, true)
      }
      document.documentElement.style.cursor = ""
    }
  }, [picking])

  function saveDraft() {
    if (!draft) {
      return
    }
    const note = draft.note.trim()
    if (draft.noteId) {
      if (note) {
        updateNote(draft.noteId, note)
      } else {
        removeNote(draft.noteId)
      }
    } else if (note) {
      addNote({
        ...describeElement(draft.element),
        path,
        note,
        theme: resolvedTheme === "dark" ? "dark" : "light",
        viewport: window.innerWidth,
      })
    }
    setDraft(null)
  }

  function editNote(note: ReviewNote) {
    const element = findElement(note.selector)
    if (element) {
      setDraft({ element, noteId: note.id, note: note.note })
    }
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(
        toMarkdown(notes, window.location.origin)
      )
      toast.success(
        `Copied ${notes.length} ${notes.length === 1 ? "note" : "notes"}`,
        { description: "Paste them into the project chat to get them fixed." }
      )
    } catch {
      toast.error("Could not copy to clipboard")
    }
  }

  function exitReview() {
    setReviewEnabled(false)
    toast("Review mode is off", {
      description: "Your notes are kept. Add ?review to a URL to come back.",
    })
  }

  return (
    <>
      {hovered && <Highlight element={hovered} />}

      {pageNotes.map((note) => (
        <Pin
          key={note.id}
          note={note}
          number={numbers.get(note.id) ?? 0}
          onSelect={() => editNote(note)}
        />
      ))}

      <NoteEditor
        draft={draft}
        onCancel={() => setDraft(null)}
        onChange={(note) => setDraft((value) => value && { ...value, note })}
        onDelete={() => {
          if (draft?.noteId) {
            removeNote(draft.noteId)
          }
          setDraft(null)
        }}
        onSave={saveDraft}
      />

      <div
        {...ui}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-md bg-popover p-1 text-popover-foreground shadow-overlay ring-1 ring-foreground/10"
      >
        <Button
          aria-pressed={picking}
          className={picking ? "bg-brand-subtle text-brand-emphasis" : ""}
          onClick={() => {
            setDraft(null)
            setPicking((value) => !value)
          }}
          size="sm"
          variant="ghost"
        >
          <MessageSquarePlusIcon />
          {picking ? "Click an element" : "Add note"}
          <Kbd className="hidden sm:inline-flex">C</Kbd>
        </Button>
        <Separator className="mx-0.5 h-5" orientation="vertical" />
        <Button onClick={() => setListOpen(true)} size="sm" variant="ghost">
          <ListIcon />
          Notes
          <Badge size="sm" variant="secondary">
            {notes.length}
          </Badge>
        </Button>
        <Button
          aria-label="Copy all notes"
          disabled={notes.length === 0}
          onClick={copyAll}
          size="icon-sm"
          tooltip="Copy all notes as markdown"
          variant="ghost"
        >
          <CopyIcon />
        </Button>
        <Button
          aria-label="Turn off review mode"
          onClick={exitReview}
          size="icon-sm"
          tooltip="Turn off review mode"
          variant="ghost"
        >
          <XIcon />
        </Button>
      </div>

      <NotesSheet
        currentPath={path}
        notes={notes}
        numbers={numbers}
        onCopy={copyAll}
        onOpenChange={setListOpen}
        open={listOpen}
      />
    </>
  )
}

function Highlight({ element }: { element: Element }) {
  const rect = element.getBoundingClientRect()
  const { component } = describeElement(element)

  return (
    <div
      {...ui}
      className="pointer-events-none fixed z-50 rounded-sm bg-brand/10 ring-2 ring-brand"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    >
      <span className="absolute bottom-full left-0 mb-1 rounded-sm bg-brand px-1.5 py-0.5 font-medium text-[11px] text-brand-foreground">
        {component}
      </span>
    </div>
  )
}

function Pin({
  note,
  number,
  onSelect,
}: {
  note: ReviewNote
  number: number
  onSelect: () => void
}) {
  const element = findElement(note.selector)
  if (!element) {
    return null
  }
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          {...ui}
          aria-label={`Note ${number}: ${note.note}`}
          className="fixed z-50 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand font-semibold text-[11px] text-brand-foreground shadow-overlay outline-none ring-2 ring-background focus-visible:ring-ring"
          onClick={onSelect}
          style={{ top: rect.top, left: rect.right }}
          type="button"
        >
          {number}
        </button>
      </TooltipTrigger>
      <TooltipContent {...ui} className="max-w-64 whitespace-pre-wrap">
        {note.note}
      </TooltipContent>
    </Tooltip>
  )
}

function NoteEditor({
  draft,
  onCancel,
  onChange,
  onDelete,
  onSave,
}: {
  draft: Draft | null
  onCancel: () => void
  onChange: (note: string) => void
  onDelete: () => void
  onSave: () => void
}) {
  const anchor = useRef<Element | null>(null)
  anchor.current = draft?.element ?? null
  const described = draft ? describeElement(draft.element) : null

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) {
          onCancel()
        }
      }}
      open={draft !== null}
    >
      <PopoverAnchor virtualRef={anchor} />
      <PopoverContent
        {...ui}
        align="start"
        className="w-80"
        collisionPadding={16}
        onInteractOutside={(event) => {
          // Keep a note that has text in it; Escape or Cancel still close.
          if (draft?.note.trim()) {
            event.preventDefault()
          }
        }}
      >
        <PopoverHeader>
          <PopoverTitle>
            {draft?.noteId ? "Edit note" : "Add a note"}
          </PopoverTitle>
          <PopoverDescription className="truncate">
            {described?.component}
            {described?.text ? ` · ${described.text}` : ""}
          </PopoverDescription>
        </PopoverHeader>
        <Textarea
          aria-label="Note"
          autoFocus
          className="min-h-20"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              onSave()
            }
          }}
          placeholder="What should change here?"
          value={draft?.note ?? ""}
        />
        <div className="flex items-center gap-1.5">
          {draft?.noteId && (
            <Button onClick={onDelete} size="sm" variant="ghost">
              Delete
            </Button>
          )}
          <Button
            className="ml-auto"
            onClick={onCancel}
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button onClick={onSave} size="sm">
            Save note
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function NotesSheet({
  currentPath,
  notes,
  numbers,
  onCopy,
  onOpenChange,
  open,
}: {
  currentPath: string
  notes: ReviewNote[]
  numbers: Map<string, number>
  onCopy: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
}) {
  const pages = groupByPage(notes)

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent {...ui} className="w-96 gap-0">
        <SheetHeader>
          <SheetTitle>Review notes</SheetTitle>
          <SheetDescription>
            {notes.length === 0
              ? "Nothing yet."
              : `${notes.length} ${notes.length === 1 ? "note" : "notes"} on ${pages.length} ${pages.length === 1 ? "page" : "pages"}, saved in this browser.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4">
          {pages.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No notes yet</EmptyTitle>
                <EmptyDescription>
                  Press <Kbd>C</Kbd> or choose Add note, then click anything on
                  the page.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            pages.map(([path, pageNotes]) => (
              <section className="flex flex-col gap-1.5" key={path}>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium">{path}</span>
                  {path !== currentPath && (
                    <Button asChild size="xs" variant="link">
                      <Link onClick={() => onOpenChange(false)} to={path}>
                        Open page
                      </Link>
                    </Button>
                  )}
                </div>
                <ItemGroup className="gap-1.5">
                  {pageNotes.map((note) => (
                    <NoteItem
                      key={note.id}
                      note={note}
                      number={numbers.get(note.id) ?? 0}
                    />
                  ))}
                </ItemGroup>
              </section>
            ))
          )}
        </div>

        <SheetFooter className="flex-row border-t">
          <ClearAll disabled={notes.length === 0} />
          <Button
            className="ml-auto"
            disabled={notes.length === 0}
            onClick={onCopy}
          >
            <CopyIcon />
            Copy all as markdown
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function NoteItem({ note, number }: { note: ReviewNote; number: number }) {
  return (
    <Item size="sm" variant="outline">
      <ItemContent>
        <ItemTitle className="whitespace-pre-wrap">
          <span className="text-muted-foreground tabular-nums">{number}.</span>{" "}
          {note.note}
        </ItemTitle>
        <ItemDescription className="truncate">
          {note.component}
          {note.text ? ` · ${note.text}` : ""}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          aria-label="Delete note"
          onClick={() => removeNote(note.id)}
          size="icon-xs"
          variant="ghost"
        >
          <Trash2Icon />
        </Button>
      </ItemActions>
    </Item>
  )
}

function ClearAll({ disabled }: { disabled: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} variant="ghost">
          Clear all
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent {...ui}>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear every review note?</AlertDialogTitle>
          <AlertDialogDescription>
            Copy them first if you have not sent them yet. This cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep notes</AlertDialogCancel>
          <AlertDialogAction onClick={clearNotes} variant="destructive">
            Clear all
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
