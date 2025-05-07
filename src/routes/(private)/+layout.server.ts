import { STORAGES } from '$lib/constants/storage';
import { decryptServerCookie } from '$lib/server/crypto';
// import { getCookie } from '$lib/utils/cookie';
import type { LayoutServerLoad } from '../$types';

// Disable server side rendering để lấy data từ cookie
// export const csr = true;
// export const prerender = false;
// export const ssr = false;

// export const load: LayoutLoad = async () => {
//   const user = getCookie(STORAGES.USER_INFO)

//   return { user }
// }

export const load: LayoutServerLoad = async ({ cookies }) => {
  const encrypted = cookies.get(STORAGES.USER_INFO);
  let user = null;

  if (encrypted) {
    user = decryptServerCookie(encrypted);
  }

  return {
    user
  };
};
