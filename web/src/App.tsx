import Layout from "./components/layout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./pages/add";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/theme-provider";

import Debts from "./pages/debts";
import History from "./pages/history";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Add />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "debts",
        element: <Debts />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
