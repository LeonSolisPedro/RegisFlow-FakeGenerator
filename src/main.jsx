import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./views/index"
import "./axios"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  }
]);

//Bootstrap
import "./customStyle.scss"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
