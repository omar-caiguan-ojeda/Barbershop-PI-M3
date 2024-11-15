//controllers/usersControllers.ts

import { Request, Response } from "express"
import { UserRegisterDTO, UserLoginDTO } from "../dtos/UserDTO"

export const getUserController = (req: Request, res: Response): void => {
    res.status(200).json({
        message: "Obtener el listado de todos los usuarios.",
        data: []
    })
}

export const getUserByIdController = (req: Request< { id: string } >, res: Response): void => {
    const { id } = req.params
    res.status(200).json({
        message: "Obtener el detalle de un usuario específico" + id,
        data: {}
    })
}


export const registerUserController = (req: Request< unknown, unknown, UserRegisterDTO >, res: Response): void => {
    res.status(201).json({
        message: "Registro de un nuevo usuario",
        data: req.body
    })
}

export const loginUserController = (req: Request< unknown, unknown, UserLoginDTO >, res: Response): void => {
    res.status(201).json({
        message: "Login de un usuario a la aplicación",
        data: req.body
    })
}