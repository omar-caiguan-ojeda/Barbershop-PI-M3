import { useNavigate } from "react-router-dom";
import styles from "./AllAppointments.module.css";
import Appointment from "../../components/Appointment/Appointment";
import axios from "axios";
import { useEffect, useState } from "react";

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_Id");

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:3002/users/${userId}`)
                .then((response) => {
                    setAppointments(response.data.appointment || []);
                })
                .catch((err) => console.error("Error al obtener los turnos:", err));
        } else {
            console.error("No se encontró el userId en localStorage");
        }
    }, [userId]);

    const handleCancel = (id) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, status: "inactive" } : appointment
            )
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Mis Turnos</h1>
            </div>
            <div className={styles.appointmentsContainer}>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Appointment
                            key={appointment.id}
                            id={appointment.id}
                            date={appointment.date}
                            time={appointment.time}
                            status={appointment.status}
                            onCancel={handleCancel}
                        />
                    ))
                ) : (
                    <h2 className={styles.noAppointments}>No hay turnos disponibles</h2>
                )}
            </div>
        </div>
    );
}

export default AllAppointments;