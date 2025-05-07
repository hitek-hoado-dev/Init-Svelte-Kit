import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {

    await new Promise((resolve) => setTimeout(resolve, 1500)); // 👈 Delay 1.5 giây
    
  const { email, password } = await request.json();

  if (email === '123@gmail.com' && password === '123456aA@') {
    return new Response(JSON.stringify({
      token: 'mock-token-123',
      user: { name: 'Mock User', email }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
};
