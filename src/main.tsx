import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/home.tsx";
import { RafflePage } from "./routes/raffle.tsx";
import { ErrorPage } from "./routes/error.tsx";
import { UserPage } from "./routes/user.tsx";
import App from "./App.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/stocks/:id",
        element: <RafflePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_ID}>
      <AuthContextProvider>
        <RouterProvider router={router}  />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);