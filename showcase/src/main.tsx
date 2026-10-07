import { ThemeProvider } from "next-themes"
import * as React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { App } from "./app"
import "./styles.css"
import { TooltipProvider } from "@frontend/primitives"
import { Toaster } from "@frontend/primitives/sonner"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element was not found.")
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <App />
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
