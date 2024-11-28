import { NextFunction, Request, Response } from "express";

export const validateUserResgisterData = (req: Request, res: Response, next: NextFunction): void => {
    const  campos: string[] = ["birthdate", "email", "nDni", "name", "password", "username"]

    const camposFiltrados: string[] | undefined = campos.filter(campo => !req.body[campo])
    
    if(camposFiltrados.length > 0) {
        res.status(400).json({
            message: `Falta información para poder registrar al ususario :${camposFiltrados.join(", ")}`
        })
    } else next()
} 


export const validateAppointmentRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const  campos: string[] = ["date", "time", "userId"]

    const camposFiltrados: string[] | undefined = campos.filter(campo => !req.body[campo])
    
    if(camposFiltrados.length > 0) {
        res.status(400).json({
            message: `Falta información para poder registrar la cita: ${camposFiltrados.join(", ")}`
        })
    } else next()
}