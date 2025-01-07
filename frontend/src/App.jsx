import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-[#1e1e1e]">
          {/* Loader Animation */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
        </div>
      ) : (
        <>
          <ToastContainer position="top-center" />
          <Navigation />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};

export default App;
