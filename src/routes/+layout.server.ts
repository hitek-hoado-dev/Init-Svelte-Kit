// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { STORAGES } from '$lib/constants/storage';
import { APP_ROUTES } from '$lib/constants/routes';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  console.log("root load server")
  const token = cookies.get(STORAGES.ACCESS_TOKEN);
  console.log(token);
  const path  = url.pathname;
  console.log(path);
  const publicRoutes = [APP_ROUTES.LOGIN, APP_ROUTES.SIGNUP, APP_ROUTES.ABOUT];
  
  if (!token && !publicRoutes.includes(path as APP_ROUTES)) {
    console.log('redirect to login')
    throw redirect(303, '/login');
  }

  if (token && publicRoutes.includes(path as APP_ROUTES)) {
    console.log('redirect to home')
    throw redirect(303, '/');
  }

  return { token };
};
