export interface Credential {
    id: number;
    username: string; // Este campo se mantiene por compatibilidad, pero ahora almacena el email
    password: string;
}
