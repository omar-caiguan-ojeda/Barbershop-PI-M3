// src/views/Home/Home.jsx

import Appointments from "../MyAppointments/MyAppointments"; // Ajusta la ruta si es necesario
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.homeContainer}>
            {/* Encabezado con foto */}
            <header className={styles.header}>
                <h1 className={styles.title}>Bienvenidos a la Barbería Clásica</h1>
                <img
                    src=  "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg" //"/assets/barber-shop.jpg" Cambia esto por la ruta de tu imagen
                    alt="Barbería Clásica"
                    className={styles.headerImage}
                />
            </header>

            {/* Contenedor de citas */}
            <section className={styles.appointmentsSection}>
                <h2 className={styles.sectionTitle}>Turnos Disponibles</h2>
                <Appointments />
            </section>
        </div>
    );
}

export default Home;



