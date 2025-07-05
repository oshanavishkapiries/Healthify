import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Lazy load the App component
const App = lazy(() => import("./App.tsx"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// App wrapper to hide initial loader
const AppWrapper = () => {
  useEffect(() => {
    // Hide the initial loader once React app is mounted
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.display = "none";
    }
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <AppWrapper />
    </Suspense>
  </StrictMode>
);
