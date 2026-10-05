import { Input } from "@/components/ui/input"

export function InputVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Text" type="text" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Input placeholder="Number" type="number" />
      <Input type="file" />
    </div>
  )
}
