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
  DialogClose,
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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@frontend/primitives/field"
import { Input } from "@frontend/primitives/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@frontend/primitives/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@frontend/primitives/item"
import { Kbd } from "@frontend/primitives/kbd"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@frontend/primitives/tabs"
import { Textarea } from "@frontend/primitives/textarea"
import { Toggle } from "@frontend/primitives/toggle"
import { ToggleGroup, ToggleGroupItem } from "@frontend/primitives/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@frontend/primitives/tooltip"
import { PageSection } from "@frontend/shells/page"
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
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
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
    <PageSection description={description} title={title}>
      <div className={cn("flex flex-wrap items-start gap-4", className)}>
        {children}
      </div>
    </PageSection>
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
        <Button size="icon-lg" variant="outline" aria-label="More actions">
          <MoreHorizontalIcon />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
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
        <FieldLabel htmlFor="lab-region">Region</FieldLabel>
        <Select defaultValue="frankfurt">
          <SelectTrigger className="w-full" id="lab-region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frankfurt">Frankfurt</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="stockholm">Stockholm</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
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
      <FieldGroup className="w-48">
        <Field orientation="horizontal">
          <Checkbox defaultChecked id="lab-receipts" />
          <FieldLabel htmlFor="lab-receipts">Email me receipts</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="lab-summary" />
          <FieldLabel htmlFor="lab-summary">Weekly summary</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch defaultChecked id="lab-live" />
          <FieldLabel htmlFor="lab-live">Live mode</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="lab-test" />
          <FieldLabel htmlFor="lab-test">Test mode</FieldLabel>
        </Field>
      </FieldGroup>
      <FieldSet className="w-40">
        <FieldLegend variant="label">Billing period</FieldLegend>
        <RadioGroup defaultValue="monthly">
          {[
            ["monthly", "Monthly"],
            ["yearly", "Yearly"],
            ["custom", "Custom"],
          ].map(([value, label]) => (
            <Field key={value} orientation="horizontal">
              <RadioGroupItem id={`lab-${value}`} value={value} />
              <FieldLabel htmlFor={`lab-${value}`}>{label}</FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      </FieldSet>
      <FieldGroup className="w-56">
        <Field>
          <FieldLabel htmlFor="lab-volume">Volume</FieldLabel>
          <Slider defaultValue={[40]} id="lab-volume" max={100} />
        </Field>
        <Progress aria-label="Upload progress" value={64} />
      </FieldGroup>
      <div className="flex flex-col items-start gap-3">
        <ToggleGroup defaultValue="week" type="single" variant="outline">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
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
        <div className="flex flex-wrap gap-1">
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
          <p className="font-semibold text-2xl tabular-nums">€24,810.00</p>
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
        <CardContent>
          <ItemGroup>
            {[
              ["BU", "Boram Uyar", "Owner"],
              ["AK", "Alex Kim", "Developer"],
            ].map(([initials, name, role]) => (
              <Item key={name} size="sm">
                <ItemMedia>
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>{role}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="xs" variant="outline">
                    Manage
                  </Button>
                </ItemActions>
              </Item>
            ))}
            <Item size="sm">
              <ItemMedia>
                <Skeleton className="size-8 rounded-full" />
              </ItemMedia>
              <ItemContent>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </ItemContent>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
      <Tabs className="md:col-span-2" defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        <TabsContent className="text-muted-foreground text-xs" value="overview">
          Gross volume, payouts and disputes for this month.
        </TabsContent>
        <TabsContent className="text-muted-foreground text-xs" value="usage">
          API requests and seats used this month.
        </TabsContent>
        <TabsContent className="text-muted-foreground text-xs" value="logs">
          Every request made with this account's keys.
        </TabsContent>
      </Tabs>
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
          <Field>
            <FieldLabel htmlFor="lab-refund">Amount</FieldLabel>
            <Input defaultValue="€120.00" id="lab-refund" />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Refund payment</Button>
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
      description="Each button opens the real component."
      title="Overlays"
    >
      <LiveOverlays />
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
      <span className="truncate font-mono text-muted-foreground text-xs">
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
        <Badge>Primary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
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
    <div className="flex flex-col gap-6">
      {PREVIEW_SECTIONS.map((s) => {
        const Component = SECTION_COMPONENTS[s.id]
        return <Component key={s.id} />
      })}
    </div>
  )
}
