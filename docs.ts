//@ts-ignore
type RouteConfig = {
    path: string;          // Đường dẫn của route
    type: 'public' | 'private';  // Phân loại Public hoặc Private Route
    method: 'SSG' | 'SSR' | "CSR" | 'SSR and CSR'; // Phương thức render
    api?: string;  
    errorHandle?: string; // File error handle (nếu có)
    description?: string;  // Mô tả ngắn gọn
};
  
  type ProjectStructure = {
    routes: RouteConfig[];
    authFlow: {
      loginPath: string;      // Đường dẫn tới trang đăng nhập
      logoutPath?: string;    // Đường dẫn tới trang đăng xuất (nếu có)
      redirectAfterLogin: string; // Trang redirect sau khi đăng nhập
      useRefreshToken?: boolean;  // Có dùng refresh token không?
      storageMethod: 'localStorage' | 'sessionStorage' | 'cookie';
    };
    loadingState: {
      global?: boolean;       // Có loading spinner global không?
      componentLevel?: boolean; // Có loading theo từng component không?
    };
  };

  const myProjectConfig: ProjectStructure = {
    routes: [
      {
        path: '/(auth)/login',
        type: 'public',
        method: 'SSR and CSR',
        api: "/(mockApi)/auth/login",
        description: 'Trang đăng nhập',
      },
      {
        path: '/(auth)/signup',
        type: 'public',
        method: 'SSR and CSR',
        description: 'Trang đăng ký',
      },
      {
        path: '/(private)/',
        type: 'private',
        method: 'SSR and CSR',
        description: 'Trang chủ, yêu cầu đăng nhập trước'
      },
      {
        path: '/(private)/about',
        type: 'private',
        method: 'SSG',
        description: 'Trang thông tin, sử dụng SSG',
      },
      {
        path: '/(private)/profile',
        type: 'private',
        method: 'SSR and CSR',
        api: '/(mockApi)/update-user',
        description: 'Trang update thông tin cá nhân',
      },
      {
        path: '/(private)/user',
        type: 'private',
        method: 'CSR',
        api: '/(mockApi)/users',
        description: 'Trang list user, sử dụng CSR',
      },
      {
        path: '/(private)/user/[id]',
        type: 'private',
        method: 'SSR',
        api: '/(mockApi)/users/[id]',
        errorHandle: "+error.svelte",
        description: 'Trang user detail, sử dụng SSR',
      },
    ],
    
    authFlow: {
      loginPath: '/login',
      redirectAfterLogin: '/',
      storageMethod: 'cookie'
    },
  };

  
  