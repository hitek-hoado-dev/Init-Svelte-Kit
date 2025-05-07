import axios from "axios";
import { APP_API_URL } from "$env/static/private";

export const csr = false;
export const ssr = true;

export const load = async ({ params }) => {
    const { id } = params;
    const response = await axios.get(`${APP_API_URL}/users/${id}`);
    return {
        user: response.data
    }
}