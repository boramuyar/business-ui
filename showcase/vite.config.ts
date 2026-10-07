import { fileURLToPath, URL } from "node:url"
import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import { defineConfig } from "vite"
import { businessStylePlugin } from "../scripts/style-vite-plugin.mjs"

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").pop()
const githubPagesBase = repositoryName ? `/${repositoryName}/` : "/business-ui/"

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/",
  plugins: [
    {
      // Demo globs in demo-registry.ts reach outside the showcase root;
      // watch those directories so newly added demos appear without a
      // dev-server restart.
      name: "watch-demo-directories",
      configureServer(server) {
        server.watcher.add([
          fileURLToPath(new URL("../primitives", import.meta.url)),
          fileURLToPath(new URL("../shells", import.meta.url)),
        ])
      },
    },
    businessStylePlugin(),
    mdx({
      // Only compile .mdx documents; plain .md files (e.g. USAGE.md?raw)
      // must stay importable as raw strings.
      include: /\.mdx$/,
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // MDX files live in ../primitives and ../shells where pnpm cannot resolve the
      // showcase's @mdx-js/react; pin it to this package's copy.
      "@mdx-js/react": fileURLToPath(import.meta.resolve("@mdx-js/react")),
      "@/components/shells": fileURLToPath(
        new URL("../shells", import.meta.url)
      ),
      "@/components/ui": fileURLToPath(
        new URL("../primitives", import.meta.url)
      ),
      "@/hooks/use-mobile": fileURLToPath(
        new URL("../hooks/use-mobile.ts", import.meta.url)
      ),
      "@/lib/utils": fileURLToPath(
        new URL("../utilities/index.ts", import.meta.url)
      ),
    },
  },
})
