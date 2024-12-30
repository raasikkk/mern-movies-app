import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
