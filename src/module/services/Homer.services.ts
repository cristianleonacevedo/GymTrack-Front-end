import { apiClient } from "../../core/api/api-client"
import { ENDPOINTS } from "../../core/api/api-config"
import type { GymClass } from "../types/class.types"
import type { Membership } from "../types/user.types"
import type { Activity } from "../types/user.types"

export const getClasses = async (): Promise<GymClass[]> => {
    const res = await apiClient.get(ENDPOINTS.CLASSES)
    return res.data
}

export const getMembership = async (): Promise<Membership> => {
    const res = await apiClient.get(ENDPOINTS.MEMBERSHIP)
    return res.data
}

export const getActivity = async (): Promise<Activity> => {
    const res = await apiClient.get(ENDPOINTS.ACTIVITY)
    return res.data
}