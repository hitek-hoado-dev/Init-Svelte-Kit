import axios from "axios";
import { APP_API_URL } from "$env/static/private";

// export const csr = false;
// export const ssr = true;

export const load = async ({ params }) => {
    const { id } = params;
    const userPromise = axios.get(`${APP_API_URL}/users/${id}`).then(res => res.data);
    return {
        user: userPromise
    }
}