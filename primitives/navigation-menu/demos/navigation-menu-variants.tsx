import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuVariants() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-2 p-2">
              <NavigationMenuLink href="#variants">
                <span className="font-medium">Installation</span>
                <span className="text-muted-foreground">
                  Authenticate with GitHub and install directly.
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="#variants">
                <span className="font-medium">Theming</span>
                <span className="text-muted-foreground">
                  Colors, tokens, and dark mode.
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Primitives</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-2 p-2">
              <NavigationMenuLink href="#variants">
                <span className="font-medium">Forms</span>
                <span className="text-muted-foreground">
                  Inputs, selects, and field scaffolding.
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="#variants">
                <span className="font-medium">Overlays</span>
                <span className="text-muted-foreground">
                  Dialogs, sheets, menus, and tooltips.
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="#variants"
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
