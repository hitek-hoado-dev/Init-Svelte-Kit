import axios from "axios";

export const getUsers = async (params: { limit: number, page: number } = { limit: 5, page: 1 }) => {
    const response = await axios.get(`https://api.mrparks.co.kr/api/public/v1/faqs`, { params });
    console.log("response", response?.data);
    return {
        users: response?.data?.results?.objects?.rows ?? [],
        pagination: response?.data?.pagination ?? {}
    }
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve([
    //             { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123456789' },
    //             { id: 2, name: 'Bob', email: 'bob@example.com', phone: '987654321' },
    //             { id: 3, name: 'Charlie', email: 'charlie@example.com', phone: '456789123' }
    //         ]);
    //     }, 1500); // Giả lập độ trễ 1.5 giây
    // });
}