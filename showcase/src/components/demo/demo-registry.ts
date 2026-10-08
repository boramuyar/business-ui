import type { ComponentType } from "react"

type Demo = {
  Component: ComponentType
  source: string
  /** Shell demos render a whole screen, so they preview in an iframe. */
  isShell: boolean
}

type DemoModule = Record<string, unknown> & {
  default?: ComponentType
}

const componentModules = import.meta.glob<DemoModule>(
  ["../../../../primitives/*/demos/*.tsx", "../../../../shells/*/demos/*.tsx"],
  { eager: true }
)

const sourceModules = import.meta.glob<string>(
  ["../../../../primitives/*/demos/*.tsx", "../../../../shells/*/demos/*.tsx"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  }
)

const demos = buildDemos()

export function getDemo(name: string) {
  return demos[name]
}

function buildDemos() {
  const entries: Record<string, Demo | undefined> = {}

  for (const [path, module] of Object.entries(componentModules)) {
    const name = getDemoName(path)
    const Component = getDemoComponent(module)
    const source = sourceModules[path]

    if (!name || !Component || !source) {
      continue
    }

    entries[name] = {
      Component,
      source,
      isShell: path.startsWith("../../../../shells/"),
    }
  }

  return entries
}

function getDemoName(path: string) {
  return path.match(/\/([^/]+)\.tsx$/)?.[1]
}

function getDemoComponent(module: DemoModule) {
  if (module.default) {
    return module.default
  }

  for (const [name, value] of Object.entries(module)) {
    if (name[0] === name[0]?.toUpperCase() && typeof value === "function") {
      return value as ComponentType
    }
  }

  return undefined
}
