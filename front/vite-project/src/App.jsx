import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import AllAppointments from "./views/AllAppointments/AllAppointments";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CreateAppointment from "./views/CreateAppointment/CreateAppointment";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import "./global-fonts.css";
import "./global-theme.css";

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("user_Id"));
  const [isNotFound, setIsNotFound] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al Home si no está logueado y está en rutas protegidas
    if (!isLogged && ["/misturnos", "/crear-turno"].includes(location.pathname)) {
      if (location.pathname !== "/") navigate("/");
      return;
    }
    // Redirigir a crear-turno después de registro/login exitoso
    if (isLogged && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/crear-turno");
      return;
    }
    const validateRoutes = ["/", "/login", "/register", "/misturnos", "/crear-turno"];
    if (!validateRoutes.includes(location.pathname)) setIsNotFound(true);
    else setIsNotFound(false);
  }, [isLogged, location.pathname, navigate]);

  return (
    <>
      <header>
        <Navbar setIsLogged={setIsLogged} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<Register setIsLogged={setIsLogged} />} />
          <Route path="/misturnos" element={isLogged ? <AllAppointments /> : <Navigate to="/" />} />
          <Route path="/crear-turno" element={isLogged ? <CreateAppointment /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;