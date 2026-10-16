import { ChevronDownIcon, XIcon } from "lucide-react"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/**
 * @component MultiSelect
 * @level composite
 * @summary Picks several values from a list; the picked values show as tags
 *          under the field.
 * @use Several choices from a list too long to show as checkboxes, such as
 *      the sheets a workbook shows: the trigger opens a searchable list of
 *      checkbox rows, and each picked value becomes a removable tag below the
 *      trigger, never inside it.
 * @use selectAllLabel when people often want every option.
 * @use Inside a field with a label: spread useFieldControl() onto it.
 * @avoid One value: use select or combobox.
 * @avoid A few options that fit on screen: use checkboxes.
 * @avoid Category filters in a toolbar: use toggle-group with variant chip.
 * @related select, combobox, checkbox, badge, field
 * @guide https://ui.uyar.design/design/patterns/selection-controls.md
 */
type MultiSelectOption = {
  value: string
  label: string
  /** Can't be picked or removed: its row is dimmed and its tag has no remove button. */
  disabled?: boolean
}

type MultiSelectProps = Omit<
  React.ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "children" | "className"
> & {
  options: MultiSelectOption[]
  /** The picked option values. Tags follow the order of options. */
  value: string[]
  onValueChange: (value: string[]) => void
  /** The trigger's text while nothing is picked. */
  placeholder?: string
  searchPlaceholder?: string
  /** Adds a first row that picks every enabled option, or clears them when all are picked. */
  selectAllLabel?: string
  emptyText?: string
  /** The trigger's text once values are picked, such as "3 of 7 sheets". */
  summary?: (pickedCount: number, optionCount: number) => string
  /** The accessible name of a tag's remove button. */
  removeLabel?: (label: string) => string
  /** Announces the field as required (aria-required on the trigger), as useFieldControl() passes it. */
  required?: boolean
  /** Styles the wrapper of the trigger and the tags. Every other prop goes to the trigger. */
  className?: string
}

const SELECT_ALL = "multi-select:select-all"

// Filters by label only, so typing never matches an option's internal value.
function matchLabel(_value: string, search: string, keywords?: string[]) {
  const label = keywords?.join(" ").toLowerCase() ?? ""
  return label.includes(search.trim().toLowerCase()) ? 1 : 0
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  searchPlaceholder = "Search",
  selectAllLabel,
  emptyText = "No results",
  summary = (pickedCount, optionCount) =>
    `${pickedCount} of ${optionCount} selected`,
  removeLabel = (label) => `Remove ${label}`,
  className,
  disabled,
  required,
  onKeyDown,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const picked = new Set(value)
  const pickedOptions = options.filter((option) => picked.has(option.value))
  const enabledValues = options
    .filter((option) => !option.disabled)
    .map((option) => option.value)
  const allPicked = enabledValues.every((item) => picked.has(item))
  const somePicked = enabledValues.some((item) => picked.has(item))

  const toggle = (optionValue: string) =>
    onValueChange(
      picked.has(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue]
    )

  const toggleAll = () => {
    const enabled = new Set(enabledValues)
    onValueChange(
      allPicked
        ? value.filter((item) => !enabled.has(item))
        : [...value, ...enabledValues.filter((item) => !picked.has(item))]
    )
  }

  const changeOpen = (next: boolean) => {
    setOpen(next)
    if (!next) setSearch("")
  }

  return (
    <div
      data-slot="multi-select"
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <Popover open={open} onOpenChange={changeOpen}>
        <PopoverTrigger
          {...props}
          data-slot="multi-select-trigger"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-required={required || undefined}
          data-placeholder={pickedOptions.length === 0 || undefined}
          disabled={disabled}
          className="flex h-8 w-full items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-left text-xs whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return
            // The arrow keys open the list, as they do on a select.
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
            event.preventDefault()
            changeOpen(true)
          }}
        >
          <span className="truncate">
            {pickedOptions.length === 0
              ? placeholder
              : summary(pickedOptions.length, options.length)}
          </span>
          <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <Command filter={matchLabel} label={searchPlaceholder}>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={searchPlaceholder}
            />
            <CommandList aria-multiselectable>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {selectAllLabel && search === "" && (
                <>
                  <CommandItem
                    value={SELECT_ALL}
                    aria-checked={allPicked}
                    onSelect={toggleAll}
                  >
                    <OptionCheckbox
                      checked={
                        allPicked ? true : somePicked ? "indeterminate" : false
                      }
                    />
                    {selectAllLabel}
                  </CommandItem>
                  <CommandSeparator />
                </>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label]}
                  disabled={option.disabled}
                  aria-checked={picked.has(option.value)}
                  onSelect={() => toggle(option.value)}
                >
                  <OptionCheckbox checked={picked.has(option.value)} />
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {pickedOptions.length > 0 && (
        <ul data-slot="multi-select-tags" className="flex flex-wrap gap-1">
          {pickedOptions.map((option) => (
            <li key={option.value} className="flex max-w-full">
              <Badge
                variant="secondary"
                size="sm"
                className="max-w-full pr-0.5"
              >
                <span className="truncate">{option.label}</span>
                {!option.disabled && (
                  <button
                    type="button"
                    aria-label={removeLabel(option.label)}
                    disabled={disabled}
                    onClick={() => toggle(option.value)}
                    className="flex size-4 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** The row's checkbox, for show only: the row itself is the option that toggles. */
function OptionCheckbox({
  checked,
}: {
  checked: React.ComponentProps<typeof Checkbox>["checked"]
}) {
  return (
    <Checkbox
      checked={checked}
      tabIndex={-1}
      aria-hidden="true"
      className="pointer-events-none"
    />
  )
}

export { MultiSelect, type MultiSelectOption }
