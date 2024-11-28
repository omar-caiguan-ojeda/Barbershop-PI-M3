import moment from "moment";

export const createAppointmentValidation = (input) => {
    const errors = {};

    // Validación para la fecha
    if (!input.date) {
        errors.date = "Debe seleccionar una fecha para el turno";
    } else {
        const selectedDate = moment(`${input.date} ${input.time}`, "YYYY-MM-DD HH:mm");
        const today = moment();

        
        if (selectedDate.isBefore(today)) {
            errors.date = "No se puede seleccionar un turno en una fecha u hora pasada";
        }
        
        else if (selectedDate.diff(today, "minutes") < 24 * 60) {
            errors.date = "Debe tomar el turno con al menos 24 horas de antelación";
        }
        
        else if (selectedDate.isoWeekday() === 6 || selectedDate.isoWeekday() === 7) {
            errors.date = "No se pueden tomar turnos los fines de semana";
        }
    }

    // Validación para la hora
    if (!input.time) {
        errors.time = "Debe seleccionar una hora para el turno";
    } else {
        const selectedHour = moment(input.time, "HH:mm");

        const openingTime = moment("08:00", "HH:mm");
        const closingTime = moment("18:00", "HH:mm");

        if (selectedHour.isBefore(openingTime) || selectedHour.isAfter(closingTime)) {
            errors.time = "El turno debe estar dentro del horario de atención (08:00 - 18:00)";
        }
    }

    return errors;
};