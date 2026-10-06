import { Navigate, Route, Routes } from "react-router-dom"
import { SiteLayout } from "./layout/site-layout"
import { HomePage } from "./pages/home-page"
import { InstallationPage } from "./pages/installation-page"
import { PrimitivePage } from "./pages/primitive-page"
import { PrimitivesIndexPage } from "./pages/primitives-index-page"
import { StyleLabPage } from "./pages/style-lab/style-lab-page"
import { StylePage } from "./pages/style-page"

export function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <SiteLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/installation" element={<InstallationPage />} />
              <Route path="/primitives" element={<PrimitivesIndexPage />} />
              <Route path="/primitives/:name" element={<PrimitivePage />} />
              <Route path="/style" element={<StylePage />} />
              <Route path="/style-lab" element={<StyleLabPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SiteLayout>
        }
      />
    </Routes>
  )
}
