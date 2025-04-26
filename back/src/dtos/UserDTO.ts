export interface UserRegisterDTO {
    name: string
    email: string
    birthdate: Date
    nDni: number
    password: string
    confirmPassword: string
}

export interface UserLoginDTO {
    email: string
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