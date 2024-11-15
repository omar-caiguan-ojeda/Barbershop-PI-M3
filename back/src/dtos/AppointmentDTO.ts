// dtos/AppointmentDTO.ts

export interface AppointmentRegisterDTO{
    date: Date
    time: string
    status: Status.Active
}

export enum Status{
    Active = "active",
    Cancelled = "cancelled"
}