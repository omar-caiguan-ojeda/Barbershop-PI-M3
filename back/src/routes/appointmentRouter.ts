import { Router, Request, Response, NextFunction } from "express"
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import appointmentControllers from "../controllers/appointmentControllers"
import { validateAppointmentRegisterData } from "../middlewares"

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response, next: NextFunction) => appointmentControllers.getAppointmentsController(req, res, next))

appointmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentControllers.getAppointmentByIdController(req, res, next))

appointmentRouter.post("/schedule", 
    (req: Request, res: Response, next: NextFunction) => validateAppointmentRegisterData(req, res, next),
    (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response, next: NextFunction) => appointmentControllers.registerAppointmentController(req,res, next))

appointmentRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => appointmentControllers.cancelStatusAppointmentController(req, res, next))

export default appointmentRouter