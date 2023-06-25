import axios from "axios";
import { url } from "./url";
import { setTokenExpiry } from "./api";


export const authFetchData = (token) => {
    const instance = axios.create(
    {
        baseURL: url,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
    )

    instance.interceptors.response.use(
        response => {
            return response
        },
        async error => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;

                const refresh_token = JSON.parse(localStorage.getItem("token")).refresh_token
                const user_id = JSON.parse(localStorage.getItem("user")).id

                try {
                    const {token} = await fetchData(`/auth/refresh?refresh_token=${refresh_token}&user_id=${user_id}`)
                    const token_res = setTokenExpiry(token.data)
                    localStorage.setItem("token", JSON.stringify(token_res))
                } catch (error) {
                    console.log(error.response.status, "Refresh Error")
                    window.location.href = "/"
                    return Promise.reject(refreshError);
                }
            }

            // Handle other errors
            return Promise.reject(error);
        }
    )
    return instance
}


export const fetchData = axios.create(
    {
        baseURL: url,
        headers: {
            Accept: "application/json"
        }
    }
)
