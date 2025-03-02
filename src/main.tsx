import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PDFWForm from "./pdf/PDFWForm.tsx";
import App from "./App.tsx";
import HistogramCard from "./graphs/HistogramCard.tsx";
import Congratulations from "./pages/Congratulations.tsx";
import WelcomeBack from "./modals/WelcomeBack.tsx";
import Certificates from "./tables/Certificates.tsx";

import "regenerator-runtime/runtime";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pdf-w-form",
    element: <PDFWForm />,
  },
  {
    path: "/histogram-card",
    element: <HistogramCard />,
  },
  {
    path: "/congratulations",
    element: <Congratulations />,
  },
  {
    path: "/welcome-back",
    element: <WelcomeBack />,
  },
  {
    path: "/certificates",
    element: <Certificates />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
