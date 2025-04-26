import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createAppointmentValidation } from "../../helpers/createAppointmentValidates";
import styles from "./CreateAppointment.module.css";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getAvailableTimes = () => {
  const times = [];
  for (let hour = 8; hour < 18; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
    times.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return times;
};

const CreateAppointment = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_Id");
    const userName = localStorage.getItem("user_name");

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
            day: "",
            month: "",
            year: "",
            time: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.day || !values.month || !values.year) {
                errors.date = "Debe seleccionar una fecha válida";
            }
            if (!values.time) {
                errors.time = "Debe seleccionar un horario";
            }
            return errors;
        },
        onSubmit: (values) => {
            // Construir fecha en formato yyyy-mm-dd
            const day = values.day.padStart(2, '0');
            const month = values.month.padStart(2, '0');
            const date = `${values.year}-${month}-${day}`;
            const appointmentData = {
                date,
                time: values.time,
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

    // Rango de años: actual y siguientes 2 años
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear + 1, currentYear + 2];
    const times = getAvailableTimes();

    return (
        <div className={styles.pageWrapper}>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <div className="barberPole" />
                <h1 className={styles.userTitle}>{userName ? userName.toUpperCase() : ''}</h1>
                <h2 className={styles.subTitle}>Crea tu turno:</h2>
                <div className={styles.formGroup} style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8}}>
                    <label className={styles.formLabel} style={{marginBottom: 0, minWidth: 56}}>Fecha:</label>
                    <select
                        className={styles.formInput}
                        name="day"
                        value={formik.values.day || ''}
                        onChange={e => formik.setFieldValue('day', e.target.value)}
                        style={{width: 70}}
                    >
                        <option value="">Día</option>
                        {[...Array(31)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                    </select>
                    <select
                        className={styles.formInput}
                        name="month"
                        value={formik.values.month || ''}
                        onChange={e => formik.setFieldValue('month', e.target.value)}
                        style={{width: 120}}
                    >
                        <option value="">Mes</option>
                        {MONTHS.map((mes, i) => (
                            <option key={mes} value={i+1}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                        ))}
                    </select>
                    <select
                        className={styles.formInput}
                        name="year"
                        value={formik.values.year || ''}
                        onChange={e => formik.setFieldValue('year', e.target.value)}
                        style={{width: 90}}
                    >
                        <option value="">Año</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <label className={styles.errorLabel}>
                    {formik.errors.date}
                </label>

                <div className={styles.formGroup} style={{marginTop: 16}}>
                    <label className={styles.formLabel}>Hora:</label>
                    <select
                        className={styles.formInput}
                        name="time"
                        value={formik.values.time || ''}
                        onChange={formik.handleChange}
                    >
                        <option value="">Seleccione un horario</option>
                        {times.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <label className={styles.errorLabel}>
                        {formik.errors.time}
                    </label>
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
        </div>
    );
};

export default CreateAppointment;