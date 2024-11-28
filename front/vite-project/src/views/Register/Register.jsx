import { useFormik } from "formik";
import { registerFormValidation } from "../../helpers/registerValidates";
import styles from "./Register.module.css"
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";



const Register = () => {
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: ""
        }, 
        validate: registerFormValidation,
        initialErrors: {
            name: "Se requiere que ingrese su nombre",
            email: "Se requiere que ingrese su correo electrónico",
            birthdate: "Se requiere que ingrese su fecha de nacimiento",
            nDni: "Se requiere que ingrese su número de DNI",
            username: "Se requiere que ingrese su nombre de usuario",
            password: "Se requiere que ingrese su contraseña"
        }, onSubmit: (values) => {
            axios.post("http://localhost:3002/users/register", values)                
                .then((res) => {
                    if(res.status === 201) {
                        Swal.fire({
                            title: 'Registro exitoso',
                            text: 'Gracias por registrarte',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        })
                    }
                })
                .catch((err) => {
                    if(err.response.data.details.includes("email")) {
                        Swal.fire({
                            title: 'Error',
                            text: `El email: ${formik.values.email}, ya esta registrado `,
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        })
                    }
                    else if(err.response.data.details.includes("username")) {
                        Swal.fire({
                            title: 'Error',
                            text: `El nombre de usuario: ${formik.values.username}, ya esta registrado`,
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        })
                    }
                    else if(err.response.data.details.includes("nDni")) {
                        Swal.fire({
                            title: 'Error',
                            text: `El número de DNI: ${formik.values.nDni}, ya esta registrado`,
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        })
                    }
                })
        }
    })

    return (

        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>

            <h2 className={styles.formTitle}>Registro de Turnos</h2>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre y Apellido:</label>
                <input 
                    type="text" 
                    className={styles.formInput} 
                    name="name" 
                    placeholder="Tu nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <label className={styles.errorLabel}>{formik.errors.name ? formik.errors.name : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email:</label>
                <input 
                    type="text" 
                    className={styles.formInput} 
                    name="email" 
                    placeholder="mail@mail.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <label className={styles.errorLabel}>{formik.errors.email ? formik.errors.email : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Fecha de Nacimiento:</label>
                <input 
                    type="date"
                    className={styles.formInput} 
                    name="birthdate" 
                    onChange={formik.handleChange}
                    value={formik.values.birthdate}
                />
                <label className={styles.errorLabel}>{formik.errors.birthdate ? formik.errors.birthdate : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nro de DNI:</label>
                <input 
                    type="number" 
                    className={styles.formInput} 
                    name="nDni" 
                    onChange={formik.handleChange}
                    value={formik.values.nDni}
                />
                <label className={styles.errorLabel}>{formik.errors.nDni ? formik.errors.nDni : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre de Usuario:</label>
                <input 
                    type="text" 
                    className={styles.formInput} 
                    name="username"
                    placeholder="Tu nombre de usuario"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <label className={styles.errorLabel}>{formik.errors.username ? formik.errors.username : ""}</label>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contraseña:</label>
                <input 
                    type="password"
                    className={styles.formInput} 
                    name="password"
                    placeholder="********"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <label className={styles.errorLabel}>{formik.errors.password ? formik.errors.password : ""}</label>
            </div>

            <button
                className={styles.formButton}
                type="submit"
                disabled={
                    formik.errors.name ||
                    formik.errors.email ||
                    formik.errors.birthdate ||
                    formik.errors.nDni ||
                    formik.errors.username ||
                    formik.errors.password
                }
            >Registrar</button>
            
            <br />
                <label>
                    Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
                </label>    

        </form>

    )
}

export default Register