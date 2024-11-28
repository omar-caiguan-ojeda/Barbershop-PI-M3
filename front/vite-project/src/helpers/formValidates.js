

export const formValidation = (input) => {
    const errors = {};

    if (!input.username) { 
        errors.username = "El nombre de usuario es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.username)) {
        errors.username = "El nombre de usuario debe ser un correo válido";
    }
    if (!input.password) { 
        errors.password = "La contraseña es obligatoria";
    } else if (input.password.length < 8) {
        errors.password = "La contraseña debe sermayor a 8 caracteres";
    }else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(input.password)) {
        errors.password = "La contraseña debe tener letras y numeros, una mayúscula y un caracter especial";
    }
    return errors;
}
