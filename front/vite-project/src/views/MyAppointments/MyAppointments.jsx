// src/views/MyAppointments/MyAppointments.jsx

import Appointment from "../../components/Appointment/Appointment";
import { useState } from "react";
import myAppointments from "../../helpers/myAppointments";
import styles from "./MyAppointments.module.css"; // Asegúrate de importar correctamente tus estilos

function Appointments() {
    const [appointments, setAppointments] = useState(myAppointments);

    return (
        <div className={styles.contenedor}>
            <div className={styles.contenedorH1}>
                <h1>Mis Turnos</h1>
                <div className={styles.containerAppointments}>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <Appointment
                                key={appointment.id}
                                id={appointment.id}
                                date={appointment.date}
                                time={appointment.time}
                                status={appointment.status}
                            />
                        ))
                    ) : (
                        <h1>No hay turnos disponibles</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Appointments;
