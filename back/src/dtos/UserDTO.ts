// src/dtos/UserDTO.ts

export interface UserRegisterDTO {
    name: string
    email: string
    birthdate: Date
    nDni: number
    username: string
    password: string
}

export interface UserLoginDTO {
    username: string
    password: string
}

export interface UserDTO {
    id: number
    name: string
    email: string
    birthdate: Date
    nDni: number
}

export interface UserLoginSuccesDTO {
    login: boolean,
    user: UserDTO
}

//////////////////////////////////////////////////////