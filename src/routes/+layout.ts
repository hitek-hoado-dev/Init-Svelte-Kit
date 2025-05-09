// // src/routes/+layout.ts
// import { browser } from '$app/environment';
// import type { LayoutLoad } from './$types';
// import { redirect } from '@sveltejs/kit';

// export const load: LayoutLoad = async ({ data, url }) => {
//   console.log("root load client")
//   // `data.token` is whatever you returned in +layout.server.ts
//   const token = data.token as string | undefined;
//   const path  = url.pathname;
//   const publicRoutes = ['/login','/signup'];
//   // This only runs in the browser, after hydration / on SPA nav
//   if (browser) {
//     if (!token && !publicRoutes.includes(path)) {
//       console.log('redirect to login')
//       throw redirect(303, '/login');
//     }
//     if (token && publicRoutes.includes(path)) {
//       console.log('redirect to home')
//       throw redirect(303, '/');
//     }
//   }

//   // You can also return the token back into your layout component
//   return { token };
// };
