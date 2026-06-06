export type User = {
    id: number
    nombre: string
    apellido: string
    documento: string
    email: string
    telefono: string
    fechaNacimiento: string
    contactoEmergencia: string
    nombre_contacto: string
    rol: string
    estadoMembresia: string
    membresiaActiva: boolean
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

export type MembershipPlan = {
    id: number
    name: string
    description: string
    durationDays: number
    price: number
    maxGroupClasses: number | null
    includesLocker: boolean
    active: boolean
}

export type MembershipAssignment = {
    id: number
    userId: number
    memberName: string
    planName: string
    startDate: string
    endDate: string
    status: string
    paymentMethod: string
    paymentReference: string
}

export type CheckIn = {
    id: number
    userId: number
    memberName: string
    documento: string
    fecha: string
    hora_entrada: string
    hora_salida: string | null
    duracion: number | null
}
