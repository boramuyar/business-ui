import { Navigate, useParams } from "react-router-dom"
import { getDemo } from "./demo-registry"

/**
 * One demo on its own, outside the site layout. Shell previews load it in an
 * iframe so the demo's PageHeader is the only h1 in its document.
 */
export function DemoFrame() {
  const { name = "" } = useParams()
  const demo = getDemo(name)

  if (!demo) {
    return <Navigate replace to="/" />
  }

  const { Component } = demo
  return <Component />
}
