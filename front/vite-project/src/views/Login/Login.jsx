import { useFormik } from "formik";
import { loginFormValidation } from "../../helpers/loginValidates";
import styles from "./Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLogged }) => {      
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginFormValidation,
    initialErrors: {
      email: "Se requiere que ingrese su correo electrónico",
      password: "Se requiere que ingrese su contraseña",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:3002/users/login", values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Inicio de Sesión Exitoso",
              text: `¡Bienvenido, ${res.data.user.name}!`,
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(() => {
              localStorage.setItem("user_Id", res.data.user.id);
              localStorage.setItem("user_name", res.data.user.name);
              setIsLogged(true);
              navigate("/appointments/create"); // Redirige a crear turno
            });
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
    <div className={styles.pageWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className="barberPole" />
        <h1 className={styles.userTitle}>INICIAR SESIÓN</h1>
        <h2 className={styles.subTitle}>Accede a tu cuenta:</h2>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Correo electrónico:</label>
          <input
            type="text"
            className={styles.formInput}
            name="email"
            placeholder="mail@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label className={styles.errorLabel}>
            {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
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
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <label className={styles.errorLabel}>
            {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          </label>
        </div>
        <button
          className={styles.formButton}
          type="submit"
          disabled={formik.errors.email || formik.errors.password}
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
    </div>
  );
};

export default Login;