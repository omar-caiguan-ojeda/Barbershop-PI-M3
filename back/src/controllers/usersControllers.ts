import { Request, Response } from "express"
import { UserRegisterDTO, UserLoginDTO, UserLoginSuccesDTO } from "../dtos/UserDTO"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userServices"
import { catchErrors } from "../utils/catchErrors"

const getUserController = async (req: Request, res: Response): Promise<void> => {
        const response = await getUserService()
        res.status(200).json({
            message: "Obtener el listado de todos los usuarios.",
            data: response
        })
}

const getUserByIdController = async (req: Request< { id: string } >, res: Response): Promise<void> => {
    const { id } = req.params
        const response = await getUserByIdService(id)
        res.status(200).json(response)
}

const registerUserController =  async (req: Request< unknown, unknown, UserRegisterDTO >, res: Response): Promise<void> => {  
        await registerUserService(req.body)
        res.status(201).json({
            message: "Usuario registrado con éxito."
        })
}

const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
    const response: UserLoginSuccesDTO | null = await loginUserService(req.body)
    res.status(200).json(response)  
}

const userControllers = {
    getUserController: catchErrors(getUserController),
    getUserByIdController: catchErrors(getUserByIdController),
    registerUserController: catchErrors(registerUserController),
    loginUserController: catchErrors(loginUserController)
}

export default userControllers
