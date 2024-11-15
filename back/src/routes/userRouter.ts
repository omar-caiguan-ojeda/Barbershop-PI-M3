// routes/userRouter.ts

import { Router, Request, Response } from "express"
import { getUserController, getUserByIdController, registerUserController, loginUserController } from "../controllers/usersControllers"
import { UserRegisterDTO, UserLoginDTO } from "../dtos/UserDTO"

const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response) => getUserController(req, res))

userRouter.get("/:id", (req: Request< { id: string } >, res: Response) => getUserByIdController(req, res))

userRouter.post("/register", (req: Request< unknown, unknown, UserRegisterDTO >, res: Response) => registerUserController(req, res))

userRouter.post("/login", (req: Request< unknown, unknown, UserLoginDTO >, res: Response) => loginUserController(req, res))

export default userRouter