import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { CredentialModel } from "../config/data.source";
import { CustomError } from "../utils/customError";
import bcrypt from "bcrypt";

// Función para encriptar contraseñas
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Función para comparar contraseñas generadas.
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const createCredentialService: (
    entityManager: EntityManager,
    username: string,
    password: string
) => Promise<Credential> = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    const passwordEncrypted: string = await hashPassword(password);
    const credentials: Credential = entityManager.create(Credential, {
        username,
        password: passwordEncrypted,
    });
    return await entityManager.save(credentials);
};

export const checkCredentials = async (username: string, password: string): Promise<number | undefined> => {
    const usernameFound: Credential | null = await CredentialModel.findOne({
        where: {
            username: username,
        },
    });
    if (!usernameFound) throw new CustomError(400, `El usuario ${username} no fue encontrado`);
    const isPasswordValid = await comparePassword(password, usernameFound.password);
    if (!isPasswordValid) throw new CustomError(400, `Usuario o contraseña incorrecta`);
    else return usernameFound.id;
};