import { useEffect, useState } from "react"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

const firstNames = ["Alex", "Dana", "Priya", "Sam", "Jordan", "Mei", "Omar", "Lena"]
const lastNames = ["Chen", "Ito", "Shah", "Rivera", "Lee", "Novak", "Haddad", "Berg"]

/** A directory too big to load up front, as a server would hold it. */
const people: ComboboxOption[] = firstNames.flatMap((first) =>
  lastNames.map((last) => ({ value: `${first}.${last}`.toLowerCase(), label: `${first} ${last}` }))
)

/** The server's search: the first matches only, after a short wait. */
function searchPeople(search: string): Promise<ComboboxOption[]> {
  const needle = search.trim().toLowerCase()
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(people.filter((person) => person.label.toLowerCase().includes(needle)).slice(0, 8)),
      400
    )
  )
}

export function ComboboxSearch() {
  const [value, setValue] = useState<string | null>("dana.ito")
  const [search, setSearch] = useState("")
  const [matches, setMatches] = useState<ComboboxOption[]>([])
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
    <Combobox
      className="max-w-sm"
      options={matches}
      knownOptions={[{ value: "dana.ito", label: "Dana Ito" }]}
      value={value}
      onValueChange={setValue}
      onSearchChange={setSearch}
      loading={loading}
      placeholder="Pick an owner"
      searchPlaceholder="Search people"
    />
  )
}
