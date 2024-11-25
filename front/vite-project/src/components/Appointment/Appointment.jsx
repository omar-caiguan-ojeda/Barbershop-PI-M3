// src/components/Appointment/Appointment.jsx

import Styles from './Appointment.module.css'; // Archivo de estilos para la barbería

function Appointment({ id, status, date, time }) {
    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentHeader}>
                <h3>Turno #{id}</h3>
                <span className={status === 'Active' ? Styles.statusActive : Styles.statusInactive}>
                    {status === 'Active' ? 'Activo' : 'Inactivo'}
                </span>
            </div>
            <div className={Styles.appointmentDetails}>
                <p><strong>Fecha: {date}</strong></p>
                <p><strong>Hora: {time}</strong></p>
            </div>
        </div>
    );
}

export default Appointment;
