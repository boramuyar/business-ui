/**
 * @component File Input
 * @level composite
 * @summary Picks one or more files with a button and lists what was chosen.
 * @use Attaching files in a form: a receipt, a contract, several documents.
 * @use multiple: when people add several files; each can be removed again.
 * @avoid Plain text or numbers: use input.
 * @avoid Large uploads with progress per file: build them on this, outside
 *        the form field.
 * @related input, field, button
 */
import { FileIcon, PlusIcon, XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileInput({
  className,
  multiple = false,
  disabled,
  label,
  value,
  onValueChange,
  onChange,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value"> & {
  /** Button text. Defaults to "Choose file" or "Add files". */
  label?: React.ReactNode
  /** Controlled list of files. */
  value?: File[]
  onValueChange?: (files: File[]) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState<File[]>([])
  const files = value ?? uncontrolled

  // Keep the native input in sync so a surrounding form submits what is shown.
  const commit = (next: File[]) => {
    const input = inputRef.current
    if (input) {
      const transfer = new DataTransfer()
      for (const file of next) transfer.items.add(file)
      input.files = transfer.files
    }
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <div
      data-slot="file-input"
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <div className="flex min-w-0 items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => {
            onChange?.(event)
            const picked = Array.from(event.target.files ?? [])
            commit(multiple ? [...files, ...picked] : picked.slice(0, 1))
          }}
          {...props}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={disabled}
          aria-invalid={props["aria-invalid"]}
          onClick={() => inputRef.current?.click()}
        >
          <PlusIcon data-icon="inline-start" />
          {label ?? (multiple ? "Add files" : "Choose file")}
        </Button>
        {!multiple && (
          <span
            className={cn(
              "min-w-0 truncate text-xs",
              files[0] ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {files[0]?.name ?? "No file chosen"}
          </span>
        )}
        {!multiple && files[0] && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Remove ${files[0].name}`}
            onClick={() => commit([])}
          >
            <XIcon />
          </Button>
        )}
      </div>
      {multiple && files.length > 0 && (
        <ul
          data-slot="file-input-list"
          className="flex flex-col divide-y rounded-md border"
        >
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex min-w-0 items-center gap-2 py-1.5 pr-1.5 pl-2.5 text-xs"
            >
              <FileIcon className="text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                {formatSize(file.size)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                onClick={() => commit(files.filter((_, i) => i !== index))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileInput }
