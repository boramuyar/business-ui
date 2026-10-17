import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import type * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

/**
 * @component Item
 * @level composite
 * @summary A row with media, title, description and actions.
 * @use Lists of people, files, integrations or settings rows where each entry
 *      has a title and a few details.
 * @use variant divided for full-width lists that run edge to edge, such as a
 *      narrow pane: square rows separated by a line, hover fills the row.
 * @use A row that opens something and also has its own actions: put the
 *      button or link in ItemTitle asChild. It covers the whole row, and
 *      ItemActions stay clickable above it.
 * @use data-selected on the row that is the current one, such as the record
 *      open beside the list: it takes the brand selection fill, in every
 *      variant. Mark its title with aria-current too, so screen readers
 *      announce it.
 * @use Long lists with kinds of rows (yours and shared, by source): split
 *      them into groups, each under an ItemGroupLabel, instead of a tag on
 *      every row.
 * @use ItemLoadingMore at the end of a list that loads its next page as it
 *      scrolls, while that page loads.
 * @avoid Making the whole row an anchor (Item asChild) when it has actions:
 *        links cannot contain buttons.
 * @avoid Data people compare across columns: use table.
 * @avoid Peers shown as tiles in a grid: use card.
 * @related table, card, avatar
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 has-data-[slot=item-separator]:gap-0 has-data-[variant=divided]:gap-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Names the ItemGroup that follows it. Give it an id and point the group at
 * it with aria-labelledby, so the list is announced by its name.
 */
function ItemGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group-label"
      className={cn(
        "px-3 pt-3 pb-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

// A selected row keeps its fill under the pointer: hover only tints rows that aren't selected.
const itemVariants = cva(
  "group/item relative flex w-full flex-wrap items-center rounded-md border text-xs transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 not-data-[selected=true]:has-data-[target]:hover:bg-muted has-[[data-target]:focus-visible]:border-ring has-[[data-target]:focus-visible]:ring-[3px] has-[[data-target]:focus-visible]:ring-ring/50 data-[selected=true]:bg-brand-subtle [a]:transition-colors [a]:not-data-[selected=true]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
        // Only the line below: transparent sides would push the content 1px past a 12px inset, and a top
        // border would add 1px to every row.
        divided: "rounded-none border-x-0 border-t-0 border-b-border",
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-md bg-muted text-muted-foreground group-data-[size=xs]/item:size-6 [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-0.5 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Render the row's button or link as the title; its hit area covers the row. */
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item-title"
      data-target={asChild || undefined}
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-xs font-medium underline-offset-4",
        asChild &&
          "cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-md",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-xs/relaxed font-normal text-muted-foreground group-data-[size=xs]/item:text-xs/relaxed [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-brand-emphasis",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("relative flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * The last row of a list while its next page loads: a spinner and a short label, centered. Remove it when the
 * page arrives; the first page loads as a skeleton of the rows instead.
 */
function ItemLoadingMore({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-loading-more"
      role="status"
      className={cn(
        "flex h-10 items-center justify-center gap-2 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <Spinner role="presentation" aria-label={undefined} />
      {children}
    </div>
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemGroupLabel,
  ItemHeader,
  ItemLoadingMore,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}
