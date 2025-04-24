import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {!isHomePage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
