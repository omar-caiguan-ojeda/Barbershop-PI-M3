// src/controllers/appointmentControllers.ts

import { Request, Response } from "express"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppointmentService, registerAppointmentService } from "../services/appointmentServices"
import { catchErrors } from "../utils/catchErrors"


const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    const response = await getAppointmentService()
     res.status(200).json({
        messege: "Obtener el listado de todos turnos de todos los usuarios",
        data: response
    })
}

const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    const response = await getAppointmentByIdService(id)
    res.status(200).json({
        messege: "Obtener el detalle de un turno específico: " + id,
        data: response
    })  
}

const registerAppointmentController = async (req: Request< unknown, unknown, AppointmentRegisterDTO >, res: Response): Promise<void> => {
    const response = await registerAppointmentService(req.body)
    res.status(201).json({
        messege: "Cita creada con éxito",
        data: response
    })
}

const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    const response = await cancelStatusAppointmentService(id)
    res.status(200).json({
        messege: `Cambiar en estatus del turno con id: ${id}, a 'cancelled'`,
        data: response
    })
}

const appointmentControllers = {
    getAppointmentsController: catchErrors(getAppointmentsController),
    getAppointmentByIdController: catchErrors(getAppointmentByIdController),
    registerAppointmentController: catchErrors(registerAppointmentController),
    cancelStatusAppointmentController: catchErrors(cancelStatusAppointmentController)
}

export default appointmentControllers

//////////////////////////////////////////////////////