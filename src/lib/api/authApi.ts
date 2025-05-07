import type { LoginRequest, User } from "$lib/types/authType";
import axiosInstance from "./axiosInstance";

export const authApi = {
    login: async (data: LoginRequest) => {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    },
    updateUser: async (data: User) => {
        const response = await axiosInstance.patch('/auth/update-user', data);
        return response.data;
    }
}
