import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createAppointmentValidation } from "../../helpers/createAppointmentValidates";
import styles from "./CreateAppointment.module.css";

const CreateAppointment = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
        Swal.fire({
            title: "Error de autenticación",
            text: "No estás autenticado. Por favor, inicia sesión nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
        }).then(() => navigate("/login"));
        return null; 
    }

    const formik = useFormik({
        initialValues: {
            date: "",
            time: "",
        },
        validate: createAppointmentValidation, 
        onSubmit: (values) => {
            const appointmentData = {
                ...values,
                userId: Number(userId), 
            };

            axios
                .post("http://localhost:3002/appointments/schedule", appointmentData)
                .then((res) => {
                    if (res.status === 201) {
                        Swal.fire({
                            title: "Turno creado con éxito",
                            text: "Tu turno se agregó con éxito",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                        navigate("/misturnos");
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al intentar registrar el turno. Intenta nuevamente.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                });
        },
    });

    const handleCancel = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas salir del registro de nuevos turnos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/misturnos");
            }
        });
    };

    return (
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={styles.formTitle}>Crear Turno</h2>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Fecha:</label>
                <input
                    type="date"
                    className={styles.formInput}
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                
                {formik.touched.date && formik.errors.date && ( 
                <span className={styles.errorLabel}>{formik.errors.date}</span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Hora:</label>
                <input
                    type="time"
                    className={styles.formInput}
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                />
                <label className={styles.errorLabel}>{formik.errors.time}</label>
            </div>

            <div className={styles.buttonGroup}>
                <button
                    type="submit"
                    className={styles.formButton}
                    disabled={formik.errors.date || formik.errors.time}
                >
                    Aceptar
                </button>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default CreateAppointment;