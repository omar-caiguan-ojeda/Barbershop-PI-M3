// src/controllers/usersControllers.ts

import { Request, Response } from "express"
import { UserRegisterDTO, UserLoginDTO, UserLoginSuccesDTO } from "../dtos/UserDTO"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userServices"
//import { PostgresError } from "../interfaces/ErrorInterface"
import { catchErrors } from "../utils/catchErrors"

const getUserController = async (req: Request, res: Response): Promise<void> => {
    // try {
        const response = await getUserService()
        res.status(200).json({
            message: "Obtener el listado de todos los usuarios.",
            data: response
        })
    // } catch (error) {
    //     res.status(400).json({
    //         message: "Error en el servidor.",
    //         data: error instanceof Error ? error.message : "Error desconocido."
    //     })
    // }
}


const getUserByIdController = async (req: Request< { id: string } >, res: Response): Promise<void> => {
    const { id } = req.params
    // try {
        const response = await getUserByIdService(id)
        res.status(200).json(response)
    // } catch (error) {
    //     res.status(404).json({
    //         message: "Error en el servidor.",
    //         data: error instanceof Error ? error.message : "Error desconocido."
    //     })
    // }
}


const registerUserController =  async (req: Request< unknown, unknown, UserRegisterDTO >, res: Response): Promise<void> => {  
    // try {
        await registerUserService(req.body)
        res.status(201).json({
            message: "Usuario registrado con éxito."
        })
    // } catch (error) {
    //     const postgresError = error as PostgresError
    //     res.status(400).json({
    //         message: "Error en el servidor.",
    //         data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail : postgresError.message : "Error Deconocido."
    //     })
    // }  
}


const loginUserController = async (req: Request< unknown, unknown, UserLoginDTO >, res: Response): Promise<void> => {
    // try {
        const response: UserLoginSuccesDTO | null = await loginUserService(req.body)
        res.status(200).json(response)
    // } catch (error) {
    //     res.status(400).json({
    //         message: "Error en el servidor.",
    //         data: error instanceof Error ? error.message : "Error desconocido."
    //     })
    // }
}

const userControllers = {
    getUserController: catchErrors(getUserController),
    getUserByIdController: catchErrors(getUserByIdController),
    registerUserController: catchErrors(registerUserController),
    loginUserController: catchErrors(loginUserController)
}

export default userControllers

//////////////////////////////////////////////////////