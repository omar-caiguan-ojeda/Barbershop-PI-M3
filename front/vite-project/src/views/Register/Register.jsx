import { useFormik } from "formik";
import { registerFormValidation } from "../../helpers/registerValidates";
import styles from "./Register.module.css"
import axios from "axios";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UsersContext } from "../../context/UserContext";

const Register = ({ setIsLogged }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            nDni: "",
            password: "",
            confirmPassword: ""
        }, 
        validate: registerFormValidation,
        initialErrors: {
            name: "Se requiere que ingrese su nombre",
            email: "Se requiere que ingrese su correo electrónico",
            birthdate: "Se requiere que ingrese su fecha de nacimiento",
            nDni: "Se requiere que ingrese su número de DNI",
            password: "Se requiere que ingrese su contraseña",
            confirmPassword: "Debe reingresar su contraseña"
        }, onSubmit: async (values) => {
            setLoading(true);
            // Convertir a formato yyyy-mm-dd
            let birthdate = '';
            if (values.birthDay && values.birthMonth && values.birthYear) {
                const day = values.birthDay.padStart(2, '0');
                const month = values.birthMonth.padStart(2, '0');
                birthdate = `${values.birthYear}-${month}-${day}`;
            }
            try {
                const res = await axios.post("http://localhost:3002/users/register", {...values, birthdate});
                if(res.status === 201) {
                    // Login automático tras registro exitoso
                    try {
                        const loginRes = await axios.post("http://localhost:3002/users/login", {
                            email: values.email,
                            password: values.password
                        });
                        if (loginRes.status === 200) {
                            Swal.fire({
                                title: 'Registro exitoso',
                                text: '¡Bienvenido! Ahora puedes pedir tu turno.',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                            }).then(() => {
                                localStorage.setItem("user_Id", loginRes.data.user.id);
                                localStorage.setItem("user_name", loginRes.data.user.name);
                                if (setIsLogged) setIsLogged(true);
                                navigate("/appointments/create");
                            });
                        }
                    } catch (loginError) {
                        console.error("Error en login automático:", loginError);
                        Swal.fire({
                            title: 'Error',
                            text: 'El registro fue exitoso pero hubo un problema al iniciar sesión automáticamente. Intenta iniciar sesión manualmente.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        });
                    }
                }
            } catch (err) {
                if(err.response?.data?.details?.includes("email")) {
                    Swal.fire({
                        title: 'Error',
                        text: `El email: ${formik.values.email}, ya esta registrado `,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
                else if(err.response?.data?.details?.includes("nDni")) {
                    Swal.fire({
                        title: 'Error',
                        text: `El número de DNI: ${formik.values.nDni}, ya esta registrado`,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
                else if(err.response?.data?.message === "Las contraseñas no coinciden.") {
                    Swal.fire({
                        title: 'Error',
                        text: `Las contraseñas no coinciden` ,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
                else {
                    console.error("Error inesperado en registro:", err);
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error inesperado. Revisa la consola para más detalles.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    })

    return (
        <div className={styles.pageWrapper}>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <div className="barberPole" />
                <h1 className={styles.userTitle}>REGISTRO</h1>
                <h2 className={styles.subTitle}>Crea tu cuenta:</h2>
                {loading && <div style={{textAlign: 'center', marginBottom: 12, color: '#4e9cff'}}>Procesando...</div>}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre y Apellido:</label>
                    <input 
                        type="text" 
                        className={styles.formInput} 
                        name="name" 
                        placeholder="Tu nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    <label className={styles.errorLabel}>{formik.touched.name && formik.errors.name ? formik.errors.name : ""}</label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email:</label>
                    <input 
                        type="text" 
                        className={styles.formInput} 
                        name="email" 
                        placeholder="mail@mail.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <label className={styles.errorLabel}>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</label>
                </div>
                <div className={styles.formGroup} style={{display: 'flex', flexDirection: 'column'}}>
                    <label className={styles.formLabel} style={{marginBottom: 4}}>
                        Fecha de Nacimiento:
                    </label>
                    <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4}}>
                        <select
                            className={styles.formInput}
                            name="birthDay"
                            value={formik.values.birthDay || ''}
                            onChange={e => formik.setFieldValue('birthDay', e.target.value)}
                            style={{width: 70}}
                        >
                            <option value="">Día</option>
                            {[...Array(31)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                        </select>
                        <select
                            className={styles.formInput}
                            name="birthMonth"
                            value={formik.values.birthMonth || ''}
                            onChange={e => formik.setFieldValue('birthMonth', e.target.value)}
                            style={{width: 120}}
                        >
                            <option value="">Mes</option>
                            {['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'].map((mes, i) => (
                                <option key={mes} value={i+1}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                            ))}
                        </select>
                        <select
                            className={styles.formInput}
                            name="birthYear"
                            value={formik.values.birthYear || ''}
                            onChange={e => formik.setFieldValue('birthYear', e.target.value)}
                            style={{width: 90}}
                        >
                            <option value="">Año</option>
                            {Array.from({length: 83}, (_, i) => new Date().getFullYear() - 18 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <span style={{marginLeft: 8, color: '#888'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </span>
                    </div>
                    <label className={styles.errorLabel}>{formik.touched.birthDay && formik.errors.birthdate ? formik.errors.birthdate : ""}</label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nro de DNI:</label>
                    <input 
                        type="number" 
                        className={styles.formInput} 
                        name="nDni" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nDni}
                    />
                    <label className={styles.errorLabel}>{formik.touched.nDni && formik.errors.nDni ? formik.errors.nDni : ""}</label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Contraseña:</label>
                    <input 
                        type="password"
                        className={styles.formInput} 
                        name="password"
                        placeholder="********"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <label className={styles.errorLabel}>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Reingrese Contraseña:</label>
                    <input 
                        type="password"
                        className={styles.formInput} 
                        name="confirmPassword"
                        placeholder="********"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    <label className={styles.errorLabel}>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</label>
                </div>
                <button
                    className={styles.formButton}
                    type="submit"
                    disabled={
                        formik.errors.name ||
                        formik.errors.email ||
                        formik.errors.birthdate ||
                        formik.errors.nDni ||
                        formik.errors.password ||
                        formik.errors.confirmPassword
                    }
                >Registrar</button>
                <br />
                <label className={styles.formFooter}>
                    Ya tienes una cuenta?   
                    <Link to="/login" className={styles.formFooterLink}>Iniciar Sesión</Link>
                </label>    
            </form>
        </div>
    )
}

export default Register