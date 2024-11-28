import { useFormik } from "formik";
import { loginFormValidation } from "../../helpers/loginValidates";
import styles from "./Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = ({ setIsLogged }) => {      

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidation,
    initialErrors: {
      username: "Se requiere que ingrese su nombre de usuario",
      password: "Se requiere que ingrese su contraseña",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:3002/users/login", values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Inicio de Sesión Exitoso",
              text: `¡Bienvenido, ${values.username}!`,
              icon: "success",
              confirmButtonText: "Aceptar",
            });

            localStorage.setItem("user_Id", res.data.user.id);
            localStorage.setItem("user_name", res.data.user.name);
            
            setIsLogged(true);
          }
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message;
          if (errorMessage === "Usuario o contraseña incorrecta") {
            Swal.fire({
              title: "Error",
              text: "Usuario o contraseña incorrecta.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          } else if (errorMessage?.startsWith("El usuario")) {
            Swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Ocurrió un error inesperado. Inténtalo nuevamente.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        });
    },
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Iniciar Sesión</h2>

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
        <label className={styles.errorLabel}>
          {formik.errors.username ? formik.errors.username : ""}
        </label>
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
        <label className={styles.errorLabel}>
          {formik.errors.password ? formik.errors.password : ""}
        </label>
      </div>

      <button
        className={styles.formButton}
        type="submit"
        disabled={formik.errors.username || formik.errors.password}
      >
        Iniciar Sesión
      </button>

      <br />
      <label>
        ¿Aún no tienes cuenta?{" "}
        <Link to="/register" className={styles.link}>
          Regístrate
        </Link>
      </label>
    </form>
  );
};

export default Login;