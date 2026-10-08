import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const plans = [
  {
    name: "Starter plan",
    description: "For freelancers sending a few invoices.",
    price: "€9 per month",
  },
  {
    name: "Growth plan",
    description: "For small teams with recurring billing.",
    price: "€29 per month",
  },
]

export function CardComposition() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.name}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="tabular-nums">{plan.price}</CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              Choose plan
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
