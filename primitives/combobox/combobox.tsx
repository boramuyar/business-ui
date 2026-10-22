import { ChevronDownIcon } from "lucide-react"
import * as React from "react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/**
 * @component Combobox
 * @level primitive
 * @summary A searchable select: type to filter, then pick a value.
 * @use More than about 15 options, or options people know by name: customers,
 *      countries, accounts, the folder a service goes in.
 * @use onSearchChange when the options live on a server: search there as
 *      people type and pass the matches as options, with loading while they
 *      load and knownOptions for the picked value the matches leave out.
 * @use Inside a field with a label: spread useFieldControl() onto it.
 * @avoid Fewer than 6 options: use radio-group or toggle-group.
 * @avoid 6 to 15 options people scan rather than search: use select.
 * @avoid Several values: use multi-select.
 * @avoid Running commands: use command.
 * @related select, multi-select, command, field
 * @guide https://ui.uyar.design/design/patterns/selection-controls.md
 */
type ComboboxOption = {
  value: string
  label: string
  /** Can't be picked: its row is dimmed. */
  disabled?: boolean
}

type ComboboxProps = Omit<
  React.ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "children"
> & {
  options: ComboboxOption[]
  /** The picked option's value, or null while nothing is picked. */
  value: string | null
  onValueChange: (value: string) => void
  /** The trigger's text while nothing is picked. */
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Announces the field as required (aria-required on the trigger), as useFieldControl() passes it. */
  required?: boolean
  /**
   * Searches on a server: called with the search as people type (debounce it),
   * and with "" when the list closes. The options are then the matches; they
   * aren't filtered here.
   */
  onSearchChange?: (search: string) => void
  /** The matches for the search are loading. */
  loading?: boolean
  loadingText?: string
  /** Options already known, such as the picked one, so it keeps its label while the matches leave it out. */
  knownOptions?: ComboboxOption[]
}

// Filters by label only, so typing never matches an option's internal value.
function matchLabel(_value: string, search: string, keywords?: string[]) {
  const label = keywords?.join(" ").toLowerCase() ?? ""
  return label.includes(search.trim().toLowerCase()) ? 1 : 0
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  searchPlaceholder = "Search",
  emptyText = "No results",
  onSearchChange,
  loading = false,
  loadingText = "Loading…",
  knownOptions,
  className,
  disabled,
  required,
  onKeyDown,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const searching = onSearchChange !== undefined
  // A server search only returns its matches, so the labels of every option
  // seen are kept for a picked value the matches leave out.
  const seen = React.useRef(new Map<string, ComboboxOption>())
  for (const option of [...(knownOptions ?? []), ...options])
    seen.current.set(option.value, option)
  const picked =
    value === null ? null : (seen.current.get(value) ?? { value, label: value })

  const changeSearch = (next: string) => {
    setSearch(next)
    onSearchChange?.(next)
  }

  const changeOpen = (next: boolean) => {
    setOpen(next)
    if (!next && search !== "") changeSearch("")
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <PopoverTrigger
        {...props}
        data-slot="combobox-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required || undefined}
        data-placeholder={picked === null || undefined}
        disabled={disabled}
        className={cn(
          "flex h-8 w-full items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-left text-xs whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          // The arrow keys open the list, as they do on a select.
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
          event.preventDefault()
          changeOpen(true)
        }}
      >
        <span className="truncate">{picked?.label ?? placeholder}</span>
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
      >
        <Command
          filter={matchLabel}
          shouldFilter={!searching}
          label={searchPlaceholder}
          // Opens on the picked option, so the arrow keys move on from there.
          defaultValue={value ?? undefined}
        >
          <CommandInput
            value={search}
            onValueChange={changeSearch}
            placeholder={searchPlaceholder}
          />
          <CommandList aria-busy={loading || undefined}>
            {loading && options.length === 0 ? (
              <div
                role="status"
                className="py-6 text-center text-xs text-muted-foreground"
              >
                {loadingText}
              </div>
            ) : (
              <CommandEmpty>{emptyText}</CommandEmpty>
            )}
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                keywords={[option.label]}
                disabled={option.disabled}
                data-checked={option.value === value}
                onSelect={() => {
                  onValueChange(option.value)
                  changeOpen(false)
                }}
              >
                <span className="truncate">{option.label}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption }
