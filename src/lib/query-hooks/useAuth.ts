import { createMutation } from "@tanstack/svelte-query";
import { authApi } from "../api/authApi";
import { setCookie } from "$lib/utils/cookie";
import { STORAGES } from "$lib/constants/storage";
import type { LoginResponse, User } from "$lib/types/authType";
import { APP_ROUTES } from "$lib/constants/routes";
import { goto } from "$app/navigation";
import { userStore } from "$lib/stores/userStore";

export const useLogin = () => {
    return createMutation({
        mutationFn: authApi.login,
        onSuccess: (data: LoginResponse) => {
            setCookie(STORAGES.ACCESS_TOKEN, data.token, { secure: true });
            setCookie(STORAGES.USER_INFO, data?.user)
            userStore.set(data?.user);
            console.log(data?.user);
            goto(APP_ROUTES.HOME);
        },
        onError: (error) => {
            console.log(error);
        }   
    })
}

export const useUpdateUser = () => {
    return createMutation({
        mutationFn: authApi.updateUser,
        onSuccess: (data: { message: string, user: User }) => {
            console.log(data);
            userStore.set(data?.user);
            setCookie(STORAGES.USER_INFO, data?.user);
            goto(APP_ROUTES.HOME);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}