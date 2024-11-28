import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Swal from "sweetalert2";

const Navbar = ({ setIsLogged }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "¿Estás seguro que quieres cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                
                localStorage.removeItem("user_Id");
                localStorage.removeItem("user_name");

                setIsLogged(false);
               
                navigate("/login");
            }
        });
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Barbería</div>
            <div className={styles.links}>

                <Link
                    to="/"
                    className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
                >
                    Inicio
                </Link>

                <Link
                    to="/misturnos"
                    className={`${styles.link} ${
                        location.pathname === "/misturnos" ? styles.active : ""
                    }`}
                >
                    Mis Turnos
                </Link>

                <Link
                    to="/crear-turno" 
                    className={`${styles.link} ${location.pathname === "/crear-turno" ? styles.active : ""}`}
                >
                    Agregar Turno
                </Link>

                <Link
                    to="/login" 
                    onClick={handleLogout}
                    className={`${styles.link} ${styles.logoutButton}`} 
                >
                    Cerrar Sesión
                </Link>
    
            </div>
        </nav>
    );
};

export default Navbar;