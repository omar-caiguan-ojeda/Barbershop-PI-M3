export const loginFormValidation = (input) => {
    const errors = {};

    if (!input.email) {
        errors.email = "El correo electrónico es obligatorio";
    } else if (!/^(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(input.email)) {
        errors.email = "Debe ingresar un correo electrónico válido";
    }

    if (!input.password) errors.password = "La contraseña es obligatoria";

    return errors;
};
