import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function CardComposition() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="card-demo-email">Email</FieldLabel>
            <Input
              id="card-demo-email"
              placeholder="you@example.com"
              type="email"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="card-demo-password">Password</FieldLabel>
            <Input id="card-demo-password" type="password" />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Sign in</Button>
        <Button className="w-full" variant="ghost">
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}
