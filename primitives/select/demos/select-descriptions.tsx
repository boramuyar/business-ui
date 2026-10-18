import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const plans = [
  {
    value: "starter",
    label: "Starter",
    description: "One workspace and up to 3 people.",
  },
  {
    value: "team",
    label: "Team",
    description: "Shared workspaces, roles and an audit log.",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Single sign-on, data residency and a support plan.",
  },
]

export function SelectDescriptions() {
  return (
    <Select defaultValue="team">
      <SelectTrigger className="w-64" aria-label="Plan">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {plans.map((plan) => (
          <SelectItem
            key={plan.value}
            value={plan.value}
            description={plan.description}
          >
            {plan.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
