// src/services/credentialServices.ts

import { EntityManager } from "typeorm"
import { Credential } from "../entities/Credentials.entity"
import { CredentialModel } from "../config/data.source"
import { CustomError } from "../utils/customError"

const cryPass = async (password: string): Promise<string> => {
    const encoder = new TextEncoder() 
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hash))
    const passCrypt = hashArray.map( b => b.toString(16).padStart(2, "0")).join("")
    return passCrypt
}

export const createCredentialService: (entityManager: EntityManager, a: string, b:string) => Promise<Credential> = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    const passwordEncripted: string = await cryPass(password)
    const credentials: Credential =entityManager.create(Credential, {
        username,
        password: passwordEncripted
    })
    return await entityManager.save(credentials)
}

export const checkCredentials = async (username: string, password: string): Promise<number | undefined> => {
    const usernameFound: Credential | null = await CredentialModel.findOne({
        where: {
            username: username
        }
    })
    const cryPassword: string = await cryPass(password)
    if (!usernameFound) throw new CustomError(400, `El usuario ${username} no fué encontrado`)
    if (usernameFound.password !== cryPassword) throw new CustomError(400, `Usuario o contraseña incorrecta`)
    else return usernameFound.id
}

//////////////////////////////////////////////////////