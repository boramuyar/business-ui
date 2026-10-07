import { cn } from "@frontend/utilities/cn"
import { Link, useLocation } from "react-router-dom"
import type { NavLink, NavSection } from "./site-nav"

export function SectionNav({
  section,
  onNavigate,
}: {
  section: NavSection
  onNavigate?: () => void
}) {
  return (
    <nav aria-label={section.label} className="flex flex-col gap-6">
      {section.groups.map((group) => (
        <div className="flex flex-col gap-0.5" key={group.label}>
          <span className="px-2 pb-1.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
            {group.label}
          </span>
          {group.links.map((link) => (
            <SectionLink key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      ))}
    </nav>
  )
}

function SectionLink({
  link,
  onNavigate,
}: {
  link: NavLink
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const active = pathname === link.to

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active &&
          "bg-brand-subtle font-medium text-foreground hover:bg-brand-subtle"
      )}
      onClick={onNavigate}
      to={link.to}
    >
      {link.label}
      {link.status && link.status !== "stable" ? (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            link.status === "experimental"
              ? "bg-warning"
              : "bg-muted-foreground"
          )}
          title={link.status}
        />
      ) : null}
    </Link>
  )
}
