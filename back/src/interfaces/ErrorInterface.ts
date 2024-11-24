// src/interface/ErrorInterface.ts

export interface PostgresError{
    detail?: string,
    code: number,
    message: string
}

//////////////////////////////////////////////////////