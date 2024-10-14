import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PDFWForm from "./pdf/PDFWForm.tsx";
import App from "./App.tsx";
import HistogramCard from "./graphs/HistogramCard.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
