declare module "*.mdx" {
  import type { ComponentType } from "react"

  export const frontmatter: Record<string, unknown>

  const MdxComponent: ComponentType
  export default MdxComponent
}
