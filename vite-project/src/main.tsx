import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routers/App.tsx";
import ErrorPage from "./routers/ErrorPage.tsx";
import LoginPage from "./routers/LoginPage.tsx";
import RegisterPage from "./routers/RegisterPage.tsx";
import "./index.css";
import BoradsProvider from "./Context/BoardsContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Board from "./routers/Board.tsx";

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
  {
    path: "/board/:boardId",
    element: <Board/>,
  },
]);
createRoot(document.getElementById("root")!).render(
  
  <QueryClientProvider client={queryClient}>
    <BoradsProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </BoradsProvider>
  </QueryClientProvider>
  
);
