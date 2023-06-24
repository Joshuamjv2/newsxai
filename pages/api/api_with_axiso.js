import axios from "axios";
import { url } from "./url";


export const authFetchData = (token) => axios.create(
    {
        baseURL: url,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
)

export const fetchData = axios.create(
    {
        baseURL: url,
        headers: {
            Accept: "application/json"
        }
    }
)
