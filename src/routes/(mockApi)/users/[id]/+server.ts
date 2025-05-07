import type { RequestHandler } from '@sveltejs/kit';

const users = [
  { id: 0, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
  { id: 1, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901' },
  { id: 2, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012' },
  { id: 3, name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123' }
];

export const GET: RequestHandler = async ({ params }) => {
  // 🌟 Lấy ID từ params
  const { id } = params;
  // 🌟 Tìm user theo ID
  const user = users.find((u) => u.id === Number(id));

  // Giả lập delay 1.5s để mô phỏng API thực tế
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 🌟 Nếu tìm thấy user
  if (user) {
    return new Response(JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } else {
    // 🌟 Nếu không tìm thấy user
    return new Response(JSON.stringify({ error: 'User not found' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 404,
    });
  }
};
