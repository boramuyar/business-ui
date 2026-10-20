import { useEffect, useState } from "react"
import { Field, FieldLabel, useFieldControl } from "@/components/ui/field"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select"

const firstNames = ["Alex", "Dana", "Priya", "Sam", "Jordan", "Mei", "Omar", "Lena"]
const lastNames = ["Chen", "Ito", "Shah", "Rivera", "Lee", "Novak", "Haddad", "Berg"]

/** A directory too big to load up front, as a server would hold it. */
const people: MultiSelectOption[] = firstNames.flatMap((first) =>
  lastNames.map((last) => ({
    value: `${first}.${last}`.toLowerCase(),
    label: `${first} ${last}`,
  }))
)

/** The server's search: the first matches only, after a short wait. */
function searchPeople(search: string): Promise<MultiSelectOption[]> {
  const needle = search.trim().toLowerCase()
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          people
            .filter((person) => person.label.toLowerCase().includes(needle))
            .slice(0, 8)
        ),
      400
    )
  )
}

export function MultiSelectSearch() {
  const [value, setValue] = useState(["dana.ito"])
  const [search, setSearch] = useState("")
  const [matches, setMatches] = useState<MultiSelectOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let current = true
    setLoading(true)
    const timer = setTimeout(() => {
      searchPeople(search).then((found) => {
        if (!current) return
        setMatches(found)
        setLoading(false)
      })
    }, 250)
    return () => {
      current = false
      clearTimeout(timer)
    }
  }, [search])

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Reviewers</FieldLabel>
      <ReviewersSelect
        value={value}
        onValueChange={setValue}
        options={matches}
        loading={loading}
        onSearchChange={setSearch}
      />
    </Field>
  )
}

function ReviewersSelect(
  props: Pick<
    React.ComponentProps<typeof MultiSelect>,
    "value" | "onValueChange" | "options" | "loading" | "onSearchChange"
  >
) {
  return (
    <MultiSelect
      {...useFieldControl()}
      {...props}
      knownOptions={[{ value: "dana.ito", label: "Dana Ito" }]}
      placeholder="Choose reviewers"
      searchPlaceholder="Search people"
      loadingText="Searching…"
      emptyText="No one matches"
    />
  )
}
