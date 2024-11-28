export const loginFormValidation = (input) => {
    const errors = {};

    if (!input.username) {
        errors.username = "El nombre de usuario es obligatorio";
    }

    if (!input.password) errors.password = "La contraseña es obligatoria";
    // } else if (input.password.length < 8 || input.password.length > 12) {
    //     errors.password = "La contraseña debe tener entre 8 y 12 caracteres";
    // }

    return errors;
};
