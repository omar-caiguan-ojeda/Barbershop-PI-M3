// controllers/appointmentControllers.ts

import { Request, Response } from "express"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"

export const getAppointmentsController = (req: Request, res: Response): void => {
    res.status(200).json({
        messege: "Obtener el listado de todos turnos de todos los usuarios",
        data: []
    })
}

export const getAppointmentByIdController = (req: Request<{ id: string }>, res: Response): void => {
    const { id } = req.params
    res.status(200).json({
        messege: "Obtener el detalle de un turno específico" + id,
        data: {}
    })
}

export const registerAppointmentController = (req: Request< unknown, unknown, AppointmentRegisterDTO >, res: Response): void => {
    res.status(200).json({
        messege: "Agendar un nuevo turno",
        data: req.body
    })
}

export const cancelStatusAppointmentController = (req: Request<{ id: string }>, res: Response): void => {
    const { id } = req.params
    res.status(200).json({
        messege: "Cambiar en estatus de un turno a 'cancelled': " + id,
        data: {}
    })
}