import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Home - Evan Meehan";
        break;
      case "/about":
        document.title = "About Me - Evan Meehan";
        break;
      case "/projects":
        document.title = "Projects - Evan Meehan";
        break;
      case "/skills":
        document.title = "Skills - Evan Meehan";
        break;
      case "/experience":
        document.title = "Experience - Evan Meehan";
        break;
      case "/contact":
        document.title = "Contact - Evan Meehan";
        break;
      case "/art":
        document.title = "Art - Evan Meehan";
        break;
      case "/admin":
        document.title = "Admin - Evan Meehan";
        break;
      case "/login":
        document.title = "Login - Evan Meehan";
        break;
      default:
        document.title = "Evan Meehan's Portfolio";
        break;
    }
  }, [location.pathname]);

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
