import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Swal from "sweetalert2";
import BarberFaceIcon from "./BarberFaceIcon";

function Navbar({ setIsLogged }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogged = Boolean(localStorage.getItem("user_Id"));

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
                navigate("/"); // Redirige al Home al cerrar sesión
            }
        });
    };

    const handlePedirTurno = () => {
        if (!isLogged) {
            navigate("/login");
        } else {
            navigate("/crear-turno");
        }
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
                <div className={styles.leftGroup}>
                    <div className={styles.logo} onClick={() => navigate("/")}> <BarberFaceIcon size={40} /> </div>
                    <div className={styles.links}>
                        <button className={styles.link} onClick={() => navigate('/')}>Inicio</button>
                        <button className={styles.link} onClick={() => scrollToSection('historia')}>Quiénes Somos</button>
                        <button className={styles.link} onClick={() => scrollToSection('barberos')}>Barberos</button>
                        <button className={styles.link} onClick={() => scrollToSection('contacto')}>Contacto</button>
                    </div>
                </div>
                <div className={styles.rightGroup}>
                    <button className={styles.actionBtn} onClick={handlePedirTurno}>Pedir Turno</button>
                    {isLogged && (
                        <>
                            <Link to="/misturnos" className={styles.actionBtn} style={{ textDecoration: 'none' }}>Mis Turnos</Link>
                            <button className={styles.logoutBtn} onClick={handleLogout}>Cerrar Sesión</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;