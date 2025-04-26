// src/helpers/validates.js

export const registerFormValidation = (input) => {
    const errors = {};
    if (!input.name.trim()) errors.name = "Se requiere que ingrese su nombre"
    else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(input.name)) errors.name = "Debe contener un nombre válido"

    if(!input.email.trim()) errors.email = "Se requiere que ingrese su correo electrónico"
    else if(!/^(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(input.email)) errors.email = "El correo electrónico debe ser válido"

    // Validación para fecha en formato dd/mm/yyyy desde selects
    if (!input.birthDay || !input.birthMonth || !input.birthYear) {
        errors.birthdate = "Debe completar día, mes y año";
    } else {
        const day = Number(input.birthDay);
        const month = Number(input.birthMonth);
        const year = Number(input.birthYear);
        // Comprobación de fecha válida
        const birthDate = new Date(year, month - 1, day);
        if (isNaN(birthDate.getTime()) || birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
            errors.birthdate = "Fecha inválida";
        } else {
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const is18OrOlder =
                age > 18 ||
                (age === 18 &&
                    (today.getMonth() > birthDate.getMonth() ||
                        (today.getMonth() === birthDate.getMonth() &&
                            today.getDate() >= birthDate.getDate())));
            if (!is18OrOlder) {
                errors.birthdate = "Debe tener al menos 18 años para registrarse";
            }
        }
    }

    if (!input.nDni) errors.nDni = "El número de DNI es obligatorio"
    else if (!/^\d{7,8}$/.test(input.nDni)) errors.nDni = "Debe contener un DNI válido (7 u 8 dígitos)"

    // Validación para el campo "password"
    if (!input.password) {
        errors.password = "Se requiere que ingrese su contraseña"
    } else {
        if (input.password.length < 8 || input.password.length > 12) {
            errors.password = "La contraseña debe tener entre 8 y 12 caracteres"
        }
        else if (!/[A-Z]/.test(input.password)) {
            errors.password = "La contraseña debe contener al menos una letra mayúscula"
        }
        else if (!/[a-z]/.test(input.password)) {
            errors.password = "La contraseña debe contener al menos una letra minúscula"
        }
        else if (!/\d/.test(input.password)) {
            errors.password = "La contraseña debe contener al menos un número"
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
            errors.password = "La contraseña debe contener al menos un carácter especial"
        }
        else if (/\s/.test(input.password)) {
            errors.password = "La contraseña no debe contener espacios"
        }
    }

    // Validación para el campo "confirmPassword"
    if (!input.confirmPassword) {
        errors.confirmPassword = "Debe reingresar su contraseña"
    } else if (input.password && input.confirmPassword !== input.password) {
        errors.confirmPassword = "Las contraseñas no coinciden"
    }

    return errors;
}   

////////////////////////////////////////////////////////