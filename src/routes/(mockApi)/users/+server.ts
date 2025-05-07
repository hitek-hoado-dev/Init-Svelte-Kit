import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  // 🕒 Delay 1.5 giây để mô phỏng tải dữ liệu
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 🔄 Mock data
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123' }
  ];

  // 📝 Trả về JSON response
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
};
