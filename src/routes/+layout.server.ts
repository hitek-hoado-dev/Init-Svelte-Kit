// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { STORAGES } from '$lib/constants/storage';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  console.log("root load server")
  const token = cookies.get(STORAGES.ACCESS_TOKEN);
  const path  = url.pathname;
  const publicRoutes = ['/login','/signup'];
  
  if (!token && !publicRoutes.includes(path)) {
    console.log('redirect to login')
    throw redirect(303, '/login');
  }

  if (token && publicRoutes.includes(path)) {
    console.log('redirect to home')
    throw redirect(303, '/');
  }

  return { token };
};
