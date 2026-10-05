import { resolve } from "node:path"
import { generateStyle, styleSourceFiles } from "./style-generator.mjs"

export function businessStylePlugin() {
  let root = process.cwd()
  const watchedFiles = new Set()

  async function generate() {
    await generateStyle({ cwd: root })
  }

  return {
    name: "business-style-generator",
    async configResolved(config) {
      root = config.root ? resolve(config.root, "..") : process.cwd()
      for (const file of styleSourceFiles) {
        watchedFiles.add(resolve(root, file))
      }
      await generate()
    },
    async buildStart() {
      for (const file of watchedFiles) {
        this.addWatchFile(file)
      }
    },
    configureServer(server) {
      for (const file of watchedFiles) {
        server.watcher.add(file)
      }

      server.watcher.on("change", async (path) => {
        if (!watchedFiles.has(resolve(path))) {
          return
        }

        await generate()
        server.ws.send({ type: "full-reload" })
      })
    },
  }
}
