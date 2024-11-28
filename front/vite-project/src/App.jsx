import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import AllAppointments from "./views/AllAppointments/AllAppointments";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CreateAppointment from "./views/CreateAppointment/CreateAppointment";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("user_Id"));
  const [isNotFound, setIsNotFound] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {

    if (!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");


    } else if (isLogged && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/"); 
    }

    const validateRoutes = ["/","/login","/register","/misturnos","/crear-turno"] 
    if(!validateRoutes.includes(location.pathname)) setIsNotFound(true)
    else setIsNotFound(false)

  }, [isLogged, location.pathname, navigate]);
  

  return (
    <>
      {!isLogged ? (
        <main>
          <Routes>
            <Route path="/login" element={<Login setIsLogged={setIsLogged}/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          {!isNotFound && (
            <header>
              <Navbar setIsLogged={setIsLogged} />
            </header>
          )}

          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/misturnos" element={<AllAppointments />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/crear-turno" element={<CreateAppointment />} />
              
            </Routes>
          </main> 
        </>
      )}
    </>
  );
}

export default App;