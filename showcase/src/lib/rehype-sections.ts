type Node = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

/**
 * Wraps each top-level h2 and the content after it in a <section>, so doc
 * pages can space sections with gap instead of heading margins.
 */
export function rehypeSections() {
  return (tree: Node) => {
    const children: Node[] = []
    let section: Node | undefined

    for (const node of tree.children ?? []) {
      if (node.type === "element" && node.tagName === "h2") {
        section = {
          type: "element",
          tagName: "section",
          properties: {},
          children: [],
        }
        children.push(section)
      }
      if (section) {
        section.children?.push(node)
      } else {
        children.push(node)
      }
    }

    tree.children = children
  }
}
