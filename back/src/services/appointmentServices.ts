import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/AppointmentInterface";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { CustomError } from "../utils/customError";
import { getUserByIdService } from "./userServices";


export const registerAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<Appointment> => {
    await getUserByIdService(appointment.userId.toString())
    AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time)
    await AppointmentRepository.validateExistingAppoint(appointment.userId, appointment.date, appointment.time)
    const newAppointment = AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId }
    })
    return await AppointmentRepository.save(newAppointment)
}

export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find()
    if(appointments.length > 0) return appointments
    else throw new CustomError(404, "No se encontraron citas.")
}

export const getAppointmentByIdService = async (id: string): Promise<Appointment> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })
    if (!appointmentFound) throw new CustomError(404, `La cita con id: ${id}, no fué encontrada`)
    else return appointmentFound
}

export const cancelStatusAppointmentService = async (id: string): Promise<Appointment> => {
    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })
    if (!appointmentFound) throw new CustomError (404, `La cita con id: ${id}, no fué encontrada`)
    appointmentFound.status = Status.Cancelled
    return await AppointmentRepository.save(appointmentFound) 
}