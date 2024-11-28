import Styles from './Appointment.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function Appointment({ id, status, date, time, onCancel }) {
    const handleCancel = () => {
        Swal.fire({
            title: "¿Estás seguro de cancelar el turno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`http://localhost:3002/appointments/cancel/${id}`)
                    .then(() => {
                        Swal.fire(
                            "Cancelado",
                            "El turno ha sido cancelado correctamente.",
                            "success"
                        );
                        onCancel(id);
                    })
                    .catch((err) => {
                        console.error("Error al cancelar el turno:", err);
                        Swal.fire(
                            "Error",
                            "Hubo un problema al cancelar el turno. Inténtalo de nuevo más tarde.",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentHeader}>
                <h3>Turno #{id}</h3>
                <span className={status === "active" ? Styles.statusActive : Styles.statusInactive}>
                    {status === "active" ? "Activo" : "Inactivo"}
                </span>
            </div>
            <div className={Styles.appointmentDetails}>
                <p><strong>Fecha:</strong> {date}</p>
                <p><strong>Hora:</strong> {time}</p>
            </div>
            {status === "active" && (
                <button 
                    className={Styles.cancelButton} 
                    onClick={handleCancel}
                >
                    Cancelar Turno
                </button>
            )}
        </div>
    );
}

export default Appointment;