import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request }) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // 👈 Delay 1.5s

  const { name, email } = await request.json();

  // Kiểm tra đơn giản
  if (!name || !email || !email.includes('@')) {
    return new Response(JSON.stringify({ message: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Trả về user đã được "cập nhật"
  return new Response(
    JSON.stringify({
      message: 'User updated successfully',
      user: { name, email }
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
