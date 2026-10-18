"use client"

import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

/**
 * @component Number Field
 * @level primitive
 * @summary A compact number input for parameters people tune: type a value,
 *          shorthand (25k) or an expression (=base+0.5), step with the arrow
 *          keys, or drag the glyph sideways.
 * @use Rates, sizes, limits and counts in a dense settings row, with a glyph
 *      such as r or an icon inside as the drag handle and the full name as
 *      its tooltip.
 * @use ScrubLabel with useNumberScrub to make a field's own label drag the
 *      value, in a label column or above the field.
 * @use unit for the value's unit (%, bps, s), shown after the value.
 * @avoid A few usual values with the odd custom one: use
 *        preset-number-field.
 * @avoid Text, codes or ids: use input.
 * @avoid A value chosen by feel along a track: use slider.
 * @related input, input-group, preset-number-field, slider
 */

/** The range and precision of one number field. */
interface NumberSpec {
  min: number
  max: number
  /** One arrow key press or one drag step. */
  step: number
  decimals: number
  /** Writes only the decimals a value has, up to `decimals`, for values typed freely such as range bounds. */
  trimDecimals?: boolean
  /** Shows a + in front of positive values, for shocks and offsets. */
  signed?: boolean
}

/** How whole numbers are written: 25,000,000, 25M or 25000000. */
type NumberFormat = "grouped" | "compact" | "plain"

/** Keeps a value inside the field's range and rounds it to the field's precision. */
function clampToSpec(value: number, spec: NumberSpec): number {
  const precision = 10 ** spec.decimals
  return (
    Math.round(Math.min(spec.max, Math.max(spec.min, value)) * precision) /
    precision
  )
}

/** Writes a value the way the field shows it when nobody is typing. */
function formatNumber(
  value: number,
  spec: NumberSpec,
  format: NumberFormat = "grouped"
): string {
  const wholeNumber =
    spec.decimals === 0 || (spec.trimDecimals && Number.isInteger(value))
  const text = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: spec.trimDecimals ? 0 : spec.decimals,
    maximumFractionDigits: spec.decimals,
    // Grouping and compact notation are for whole numbers; 4.25 stays 4.25.
    useGrouping: wholeNumber && format === "grouped",
    notation: wholeNumber && format === "compact" ? "compact" : "standard",
  }).format(value)
  return spec.signed && value > 0 ? `+${text}` : text
}

const SUFFIX_MULTIPLIERS: Record<string, number> = { k: 1e3, m: 1e6, b: 1e9 }
const UNIT_PATTERN = /(%|bps|yrs?|×|\$|€|£|¥|kr)/gi

type Token =
  | { kind: "number"; value: number }
  | { kind: "name"; value: string }
  | { kind: "symbol"; value: string }

function tokenize(text: string): Token[] | null {
  const tokens: Token[] = []
  const pattern =
    /\s*(?:(\d*\.?\d+(?:e[+-]?\d+)?)([kmb](?![a-z]))?|([a-z_][a-z0-9_]*)|([-+*/()]))/giy
  let index = 0
  while (index < text.length) {
    pattern.lastIndex = index
    const match = pattern.exec(text)
    if (!match || match[0].length === 0) {
      return text.slice(index).trim() === "" ? tokens : null
    }
    index = pattern.lastIndex
    const [, digits, suffix, name, symbol] = match
    if (digits) {
      const multiplier = suffix ? SUFFIX_MULTIPLIERS[suffix.toLowerCase()] : 1
      tokens.push({ kind: "number", value: Number(digits) * multiplier })
    } else if (name) {
      tokens.push({ kind: "name", value: name.toLowerCase() })
    } else if (symbol) {
      tokens.push({ kind: "symbol", value: symbol })
    }
  }
  return tokens
}

/** A small recursive-descent reader for + - * / and brackets, so typed text never reaches eval. */
function evaluateTokens(
  tokens: Token[],
  variables: Readonly<Record<string, number>>
): number | null {
  let position = 0
  const takeSymbol = (symbol: string) => {
    const token = tokens[position]
    if (token?.kind !== "symbol" || token.value !== symbol) return false
    position += 1
    return true
  }

  const factor = (): number | null => {
    if (takeSymbol("-")) {
      const value = factor()
      return value === null ? null : -value
    }
    if (takeSymbol("+")) return factor()
    if (takeSymbol("(")) {
      const value = sum()
      return value !== null && takeSymbol(")") ? value : null
    }
    const token = tokens[position]
    if (!token || token.kind === "symbol") return null
    position += 1
    if (token.kind === "number") return token.value
    return variables[token.value] ?? null
  }

  const product = (): number | null => {
    let value = factor()
    while (value !== null) {
      if (takeSymbol("*")) {
        const right = factor()
        value = right === null ? null : value * right
      } else if (takeSymbol("/")) {
        const right = factor()
        value = right === null ? null : value / right
      } else break
    }
    return value
  }

  const sum = (): number | null => {
    let value = product()
    while (value !== null) {
      if (takeSymbol("+")) {
        const right = product()
        value = right === null ? null : value + right
      } else if (takeSymbol("-")) {
        const right = product()
        value = right === null ? null : value - right
      } else break
    }
    return value
  }

  const result = sum()
  return result !== null &&
    position === tokens.length &&
    Number.isFinite(result)
    ? result
    : null
}

/**
 * Reads what someone typed into a number field: plain numbers, shorthand such
 * as 25k or 1.5m, a trailing unit, and arithmetic with named values such as
 * =base+0.5. Returns null when the text is not a number.
 */
function evaluateNumberExpression(
  text: string,
  variables: Readonly<Record<string, number>> = {}
): number | null {
  const cleaned = text
    .trim()
    .replace(/,/g, "")
    .replace(/^=/, "")
    .replace(/−/g, "-")
    .replace(UNIT_PATTERN, "")
  if (cleaned.trim() === "") return null
  const tokens = tokenize(cleaned)
  return tokens ? evaluateTokens(tokens, variables) : null
}

interface NumberScrub {
  scrubbing: boolean
  /** Spread on the element people drag: a label or the glyph inside a field. */
  handleProps: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void
    "data-scrubbing": boolean
  }
}

/**
 * Drag sideways to change a number, one step per `pixelsPerStep` pixels.
 * Shift makes each step ten times bigger, Alt ten times smaller, and the value
 * stays inside the field's range.
 */
function useNumberScrub({
  value,
  spec,
  pixelsPerStep = 2,
  onValueChange,
}: Readonly<{
  value: number
  spec: NumberSpec
  pixelsPerStep?: number
  onValueChange: (value: number) => void
}>): NumberScrub {
  const [scrubbing, setScrubbing] = useState(false)
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => () => stopRef.current?.(), [])

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    const startX = event.clientX
    const startValue = value
    const move = (each: PointerEvent) => {
      const multiplier = each.shiftKey ? 10 : each.altKey ? 0.1 : 1
      const steps = Math.round(
        (each.clientX - startX) / Math.max(1, pixelsPerStep)
      )
      onValueChange(
        clampToSpec(startValue + steps * spec.step * multiplier, spec)
      )
    }
    const stop = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", stop)
      document.body.style.cursor = ""
      stopRef.current = null
      setScrubbing(false)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", stop)
    // The cursor stays a resize arrow while the pointer wanders off the handle mid-drag.
    document.body.style.cursor = "ew-resize"
    stopRef.current = stop
    setScrubbing(true)
  }

  return {
    scrubbing,
    handleProps: { onPointerDown, "data-scrubbing": scrubbing },
  }
}

interface NumberFieldProps {
  /** The full name: the field's accessible name, and the tooltip on its glyph. */
  label: string
  value: number
  spec: NumberSpec
  onValueChange: (value: number) => void
  /** A short symbol inside the field, such as r or an icon, that is also the drag handle. */
  glyph?: React.ReactNode
  unit?: string
  format?: NumberFormat
  pixelsPerStep?: number
  /** Names an expression can use, such as base in =base+0.5. */
  variables?: Readonly<Record<string, number>>
  /** A small button at the end of the field, such as preset-number-field's way back to its dropdown. */
  trailing?: React.ReactNode
  /** Takes focus when it appears, for a field that replaces the control just used. */
  autoFocus?: boolean
  /** Set by a ScrubLabel outside the field, so the field shows the drag. */
  scrubbing?: boolean
  invalid?: boolean
  disabled?: boolean
  /** A derived value people read but cannot change; drawn with a dashed edge. */
  readOnly?: boolean
  align?: "start" | "end"
  className?: string
}

function NumberField({
  label,
  value,
  spec,
  onValueChange,
  glyph,
  unit,
  format = "grouped",
  pixelsPerStep = 2,
  variables,
  trailing,
  autoFocus = false,
  scrubbing = false,
  invalid = false,
  disabled = false,
  readOnly = false,
  align = "start",
  className,
}: Readonly<NumberFieldProps>) {
  const [draft, setDraft] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)
  const dropDraft = useRef(false)
  const selectOnMouseUp = useRef(false)
  const glyphScrub = useNumberScrub({
    value,
    spec,
    pixelsPerStep,
    onValueChange,
  })
  const isScrubbing = scrubbing || glyphScrub.scrubbing

  const typed =
    draft === null ? null : evaluateNumberExpression(draft, variables)
  const draftInvalid = draft !== null && draft.trim() !== "" && typed === null
  const text = draft ?? formatNumber(value, spec, format)
  const typedResult =
    typed === null ? null : formatNumber(clampToSpec(typed, spec), spec, format)
  const preview =
    focused &&
    draft !== null &&
    typedResult !== null &&
    typedResult !== draft.trim()
      ? `= ${typedResult}`
      : null

  const commit = () => {
    if (!dropDraft.current && typed !== null) {
      onValueChange(clampToSpec(typed, spec))
    }
    dropDraft.current = false
    selectOnMouseUp.current = false
    setDraft(null)
    setFocused(false)
  }

  const stepBy = (direction: 1 | -1, multiplier: number) => {
    const from = typed ?? value
    onValueChange(clampToSpec(from + direction * spec.step * multiplier, spec))
    setDraft(null)
  }

  return (
    <InputGroup
      data-slot="number-field"
      data-scrubbing={isScrubbing}
      className={cn(
        "data-[scrubbing=true]:border-ring",
        readOnly && "border-dashed",
        disabled && "pointer-events-none bg-input/50 opacity-50",
        className
      )}
    >
      {glyph !== undefined && (
        <InputGroupAddon
          data-slot="number-field-glyph"
          title={`${label} · drag to adjust`}
          {...(readOnly || disabled ? {} : glyphScrub.handleProps)}
          className={cn(
            "min-w-7 self-stretch rounded-l-[5px] px-1.5 py-0 font-normal [&>svg:not([class*='size-'])]:size-3.5",
            !readOnly &&
              "cursor-ew-resize touch-none hover:bg-muted hover:text-foreground",
            isScrubbing &&
              "bg-brand-subtle text-brand-emphasis hover:bg-brand-subtle hover:text-brand-emphasis"
          )}
        >
          {glyph}
        </InputGroupAddon>
      )}
      <InputGroupInput
        aria-label={label}
        autoFocus={autoFocus}
        aria-invalid={invalid || draftInvalid}
        spellCheck={false}
        inputMode="decimal"
        readOnly={readOnly}
        disabled={disabled}
        value={text}
        className={cn(
          "tabular-nums",
          glyph !== undefined && "pl-0",
          align === "end" && "text-right",
          readOnly && "text-muted-foreground"
        )}
        onFocus={(event) => {
          setFocused(true)
          event.currentTarget.select()
          selectOnMouseUp.current = true
        }}
        onMouseUp={(event) => {
          // The mouseup of the click that focused the field would drop the selection and leave a caret instead.
          if (!selectOnMouseUp.current) return
          selectOnMouseUp.current = false
          event.preventDefault()
        }}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (readOnly) return
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault()
            stepBy(
              event.key === "ArrowUp" ? 1 : -1,
              event.shiftKey ? 10 : event.altKey ? 0.1 : 1
            )
          } else if (event.key === "Enter") {
            event.currentTarget.blur()
          } else if (event.key === "Escape") {
            dropDraft.current = true
            event.currentTarget.blur()
          }
        }}
      />
      {preview && (
        <InputGroupAddon
          align="inline-end"
          className="pr-0 font-normal text-brand-emphasis tabular-nums"
        >
          {preview}
        </InputGroupAddon>
      )}
      {unit && (
        <InputGroupAddon
          align="inline-end"
          className={cn("pl-1 font-normal", trailing !== undefined && "pr-0")}
        >
          <InputGroupText>{unit}</InputGroupText>
        </InputGroupAddon>
      )}
      {trailing !== undefined && (
        <InputGroupAddon align="inline-end">{trailing}</InputGroupAddon>
      )}
    </InputGroup>
  )
}

/**
 * A field's name that is also its drag handle. `strong` is the label above a
 * field; the muted default sits in a label column.
 */
function ScrubLabel({
  scrub,
  strong = false,
  children,
}: Readonly<{
  scrub: NumberScrub
  strong?: boolean
  children: React.ReactNode
}>) {
  return (
    <span
      data-slot="scrub-label"
      {...scrub.handleProps}
      title="Drag to adjust"
      className={cn(
        "cursor-ew-resize touch-none truncate text-xs select-none data-[scrubbing=true]:text-brand-emphasis",
        strong
          ? "self-start font-medium text-foreground"
          : "text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

export type { NumberFieldProps, NumberFormat, NumberScrub, NumberSpec }
export {
  clampToSpec,
  evaluateNumberExpression,
  formatNumber,
  NumberField,
  ScrubLabel,
  useNumberScrub,
}
