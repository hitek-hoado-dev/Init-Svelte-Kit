import axios from "axios";

export const csr = false;
export const ssr = true;

export const load = async ({ params }) => {
    const { id } = params;
    const response = await axios.get(`http://localhost:5173/users/${id}`);
    return {
        user: response.data
    }
}