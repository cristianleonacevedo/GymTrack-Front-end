export type User = {
    id: number
    nombre: string
    apellido: string
    email: string
}

export type AuthResponse = {
    access_token: string
    refresh_token: string
}

export type Membership = {
    id: number
    plan: string
    fecha_inicio: string
    fecha_fin: string
    dias_restantes: number
    clases_disponibles: number
    clases_usadas: number
    estado: "ACTIVA" | "VENCIDA" | "CANCELADA"
}

export type Activity = {
    total_visitas: number
    visitas: {
        fecha: string
        duracion: number
    }[]
}