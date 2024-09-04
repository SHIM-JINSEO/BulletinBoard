import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routers/App.tsx";
import ErrorPage from "./routers/ErrorPage.tsx";
import LoginPage from "./routers/LoginPage.tsx";
import RegisterPage from "./routers/RegisterPage.tsx";
import "./index.css";
import TokensProvider from "./Context/TokensContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/loginpage",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registerpage",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
  <TokensProvider>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </TokensProvider>
  </QueryClientProvider>
);
