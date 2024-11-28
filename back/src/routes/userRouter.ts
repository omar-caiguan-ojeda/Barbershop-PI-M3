import { Router, Request, Response, NextFunction } from "express"
import userControllers from "../controllers/usersControllers"
import { UserRegisterDTO, UserLoginDTO } from "../dtos/UserDTO"
import { validateUserResgisterData } from "../middlewares"

const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => userControllers.getUserController(req, res, next))

userRouter.get("/:id", (req: Request< { id: string } >, res: Response, next: NextFunction) => userControllers.getUserByIdController(req, res, next))

userRouter.post("/register", 
    (req: Request, res: Response, next: NextFunction) => validateUserResgisterData(req, res, next), 
    (req: Request< unknown, unknown, UserRegisterDTO >, res: Response, next: NextFunction) => userControllers.registerUserController(req, res, next))

userRouter.post("/login", (req: Request< unknown, unknown, UserLoginDTO >, res: Response, next: NextFunction) => userControllers.loginUserController(req, res, next))

export default userRouter