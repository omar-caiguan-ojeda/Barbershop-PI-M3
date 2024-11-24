// src/interfaces/AppointmentInterface.ts

export interface Appointment {
    id: number;
    date: Date;
    time: string;
    userId: number;
    status: Status;
}

export enum Status{
    Active = "active",
    Cancelled = "cancelled"
}

//////////////////////////////////////////////////////