import { authFetchData } from "./api_with_axiso";

export const fetchItems = async (url, token) => {
    try {
        const {data} = await authFetchData(token).get(url)
        // set dropdown items
    } catch (error) {
        console.log(error)
    }
}
