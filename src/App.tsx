import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ReactQueryProvider>
        <RouterProvider router={router} data-oid="_iz53c." />
      </ReactQueryProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
