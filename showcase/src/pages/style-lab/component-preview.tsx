import { Alert, AlertDescription, AlertTitle } from "@frontend/primitives/alert"
import { Avatar, AvatarFallback } from "@frontend/primitives/avatar"
import { Badge } from "@frontend/primitives/badge"
import { Button } from "@frontend/primitives/button"
import { ButtonGroup } from "@frontend/primitives/button-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@frontend/primitives/card"
import { Checkbox } from "@frontend/primitives/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@frontend/primitives/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@frontend/primitives/dropdown-menu"
import { Field, FieldLabel } from "@frontend/primitives/field"
import { Input } from "@frontend/primitives/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@frontend/primitives/input-group"
import { Kbd } from "@frontend/primitives/kbd"
import { Label } from "@frontend/primitives/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@frontend/primitives/popover"
import { Progress } from "@frontend/primitives/progress"
import { RadioGroup, RadioGroupItem } from "@frontend/primitives/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@frontend/primitives/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@frontend/primitives/sheet"
import { Skeleton } from "@frontend/primitives/skeleton"
import { Slider } from "@frontend/primitives/slider"
import { Switch } from "@frontend/primitives/switch"
import { Tabs, TabsList, TabsTrigger } from "@frontend/primitives/tabs"
import { Textarea } from "@frontend/primitives/textarea"
import { Toggle } from "@frontend/primitives/toggle"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@frontend/primitives/tooltip"
import { cn } from "@frontend/utilities"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  CopyIcon,
  InfoIcon,
  LogOutIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"
import type { ReactNode } from "react"
import { toast } from "sonner"

const PREVIEW_SECTIONS = [
  { id: "colors", label: "Color tokens" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Form controls" },
  { id: "selection", label: "Selection" },
  { id: "surfaces", label: "Cards & feedback" },
  { id: "overlays", label: "Overlays" },
] as const
type PreviewSectionId = (typeof PREVIEW_SECTIONS)[number]["id"]

function Section({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        {description ? (
          <p className="text-muted-foreground text-xs">{description}</p>
        ) : null}
      </div>
      <div className={cn("flex flex-wrap items-start gap-4", className)}>
        {children}
      </div>
    </section>
  )
}

function Buttons() {
  return (
    <Section
      description="shadow-control on filled, outline and secondary buttons."
      title="Buttons"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon-xs" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Copy">
          <CopyIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <SettingsIcon />
        </Button>
        <Button size="icon-lg" variant="destructive" aria-label="Delete">
          <Trash2Icon />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ButtonGroup>
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button>Deploy</Button>
          <Button aria-label="More deploy options" size="icon">
            <ChevronDownIcon />
          </Button>
        </ButtonGroup>
        <Button disabled>Disabled</Button>
      </div>
    </Section>
  )
}

function Forms() {
  return (
    <Section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      description="Inputs, select triggers and input groups use shadow-control."
      title="Form controls"
    >
      <Field>
        <FieldLabel htmlFor="lab-email">Email</FieldLabel>
        <Input id="lab-email" placeholder="you@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="lab-invalid">Invalid</FieldLabel>
        <Input aria-invalid defaultValue="not-an-email" id="lab-invalid" />
      </Field>
      <Field>
        <FieldLabel>Region</FieldLabel>
        <Select defaultValue="frankfurt">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frankfurt">Frankfurt</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="lab-search">Search</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput id="lab-search" placeholder="Search customers" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="lab-notes">Notes</FieldLabel>
        <Textarea id="lab-notes" placeholder="Anything we should know?" />
      </Field>
    </Section>
  )
}

function Selection() {
  return (
    <Section
      description="Checkboxes, radios, switches, sliders and toggles."
      title="Selection"
    >
      <div className="flex flex-col gap-3">
        <Label className="flex items-center gap-2">
          <Checkbox defaultChecked /> Email me receipts
        </Label>
        <Label className="flex items-center gap-2">
          <Checkbox /> Weekly summary
        </Label>
        <Label className="flex items-center gap-2">
          <Switch defaultChecked /> Live mode
        </Label>
        <Label className="flex items-center gap-2">
          <Switch /> Test mode
        </Label>
      </div>
      <RadioGroup defaultValue="monthly">
        <Label className="flex items-center gap-2">
          <RadioGroupItem value="monthly" /> Monthly
        </Label>
        <Label className="flex items-center gap-2">
          <RadioGroupItem value="yearly" /> Yearly
        </Label>
        <Label className="flex items-center gap-2">
          <RadioGroupItem value="custom" /> Custom
        </Label>
      </RadioGroup>
      <div className="flex w-56 flex-col gap-4">
        <Slider defaultValue={[40]} max={100} />
        <Progress value={64} />
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col items-start gap-3">
        <ToggleGroup defaultValue="left" type="single" variant="outline">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <Toggle aria-label="Bold" defaultPressed>
          <BoldIcon />
        </Toggle>
        <div className="flex flex-wrap gap-1.5">
          <Badge>Default</Badge>
          <Badge variant="success">Paid</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Failed</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>
    </Section>
  )
}

function Surfaces() {
  return (
    <Section
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      description="Cards use shadow-raised. Alerts and skeletons follow the radius."
      title="Cards & feedback"
    >
      <Card>
        <CardHeader>
          <CardTitle>Gross volume</CardTitle>
          <CardDescription>Compared to the previous month.</CardDescription>
          <CardAction>
            <Badge variant="success">+12%</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-3xl tracking-tight">€24,810.00</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm" variant="outline">
            View report
          </Button>
          <Button size="sm" variant="ghost">
            Export
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardDescription>People with access to this account.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[
            ["BU", "Boram Uyar", "Owner"],
            ["AK", "Alex Kim", "Developer"],
          ].map(([initials, name, role]) => (
            <div className="flex items-center gap-3" key={name}>
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-xs">{name}</p>
                <p className="text-muted-foreground text-xs">{role}</p>
              </div>
              <Button size="xs" variant="outline">
                Manage
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Alert>
        <InfoIcon />
        <AlertTitle>Payouts are paused</AlertTitle>
        <AlertDescription>
          Verify your bank account to resume payouts.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Invoice sent</AlertTitle>
        <AlertDescription>
          The customer will receive it within a minute.
        </AlertDescription>
      </Alert>
    </Section>
  )
}

/** Inline copies of overlay surfaces, so they can be judged without opening them. */
function OverlayReplicas() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex w-52 flex-col gap-0.5 rounded-md bg-popover p-1 text-popover-foreground shadow-overlay ring-1 ring-foreground/10">
        <p className="px-2 py-1.5 font-medium text-muted-foreground text-xs">
          My account
        </p>
        <div className="flex items-center gap-2 rounded-sm bg-accent px-2 py-2 text-accent-foreground text-xs">
          <UserIcon /> Profile{" "}
          <span className="ml-auto text-muted-foreground">⇧⌘P</span>
        </div>
        <div className="flex items-center gap-2 rounded-sm px-2 py-2 text-xs">
          <SettingsIcon /> Settings
        </div>
        <div className="-mx-1 my-1 h-px bg-border" />
        <div className="flex items-center gap-2 rounded-sm px-2 py-2 text-destructive text-xs">
          <LogOutIcon /> Log out
        </div>
      </div>
      <div className="flex w-64 flex-col gap-2.5 rounded-md bg-popover p-2.5 text-popover-foreground text-xs shadow-overlay ring-1 ring-foreground/10">
        <p className="font-medium">Dimensions</p>
        <div className="grid grid-cols-[4rem_1fr] items-center gap-2">
          <Label>Width</Label>
          <Input className="h-7" defaultValue="100%" />
          <Label>Height</Label>
          <Input className="h-7" defaultValue="25px" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-6">
        <div className="rounded-md bg-foreground px-3 py-1.5 text-background text-xs shadow-overlay">
          Copied to clipboard
        </div>
        <div className="flex w-72 items-center gap-2 rounded-md border bg-popover p-4 text-popover-foreground text-xs shadow-overlay">
          <CircleCheckIcon className="size-4" />
          Payment of €120.00 captured.
        </div>
      </div>
      <div className="grid w-full max-w-md gap-4 rounded-md bg-popover p-4 text-popover-foreground text-xs shadow-modal ring-1 ring-foreground/10">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-sm">Refund payment</p>
          <p className="text-muted-foreground">
            Refunds take 5 to 10 days to appear on the customer's statement.
          </p>
        </div>
        <Input defaultValue="€120.00" />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Refund</Button>
        </div>
      </div>
    </div>
  )
}

function LiveOverlays() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Dropdown <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="font-medium">Popover</p>
          <p className="text-muted-foreground">Uses shadow-overlay.</p>
        </PopoverContent>
      </Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>Uses shadow-overlay</TooltipContent>
      </Tooltip>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refund payment</DialogTitle>
            <DialogDescription>Uses shadow-modal.</DialogDescription>
          </DialogHeader>
          <Input defaultValue="€120.00" />
          <DialogFooter>
            <Button>Refund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Customer</SheetTitle>
            <SheetDescription>Uses shadow-modal.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Button
        onClick={() => toast.success("Payment captured")}
        variant="outline"
      >
        Toast
      </Button>
    </div>
  )
}

function Overlays() {
  return (
    <Section
      className="flex-col"
      description="Static copies below stay open for comparison; the buttons open the real components."
      title="Overlays"
    >
      <LiveOverlays />
      <OverlayReplicas />
    </Section>
  )
}

const INTENTS = [
  "primary",
  "brand",
  "destructive",
  "success",
  "warning",
  "info",
]
const SHADES = ["", "-subtle", "-border", "-strong", "-emphasis"]

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-10 rounded-sm border"
        style={{ background: `var(--${token})` }}
      />
      <span className="truncate font-mono text-[10px] text-muted-foreground">
        {token}
      </span>
    </div>
  )
}

function ColorTokens() {
  return (
    <Section
      className="flex-col items-stretch"
      description="Every intent with its derived shades, plus neutrals and chart colors."
      title="Color tokens"
    >
      <div className="grid grid-cols-5 gap-2">
        {INTENTS.flatMap((intent) =>
          SHADES.map((shade) => (
            <Swatch key={intent + shade} token={intent + shade} />
          ))
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[
          "background",
          "card",
          "secondary",
          "muted",
          "border",
          "foreground",
          "muted-foreground",
          "ring",
          "sidebar",
          "sidebar-accent",
        ].map((token) => (
          <Swatch key={token} token={token} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Swatch key={n} token={`chart-${n}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {INTENTS.map((intent) => (
          <span
            className="rounded-sm border px-2 py-1 font-medium text-xs"
            key={intent}
            style={{
              background: `var(--${intent}-subtle)`,
              borderColor: `var(--${intent}-border)`,
              color: `var(--${intent}-strong)`,
            }}
          >
            {intent} subtle text
          </span>
        ))}
      </div>
    </Section>
  )
}

const SECTION_COMPONENTS: Record<PreviewSectionId, () => ReactNode> = {
  colors: ColorTokens,
  buttons: Buttons,
  forms: Forms,
  selection: Selection,
  surfaces: Surfaces,
  overlays: Overlays,
}

export function ComponentPreview() {
  return (
    <div className="flex flex-col gap-10">
      {PREVIEW_SECTIONS.map((s) => {
        const Component = SECTION_COMPONENTS[s.id]
        return <Component key={s.id} />
      })}
    </div>
  )
}
