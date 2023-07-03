import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authFetchData } from "@/pages/api/api_with_axiso";
import { useRouter } from "next/router";
import UserContext from "@/contextapi/AuthAndUsers";
import { useContext } from "react";


export default function TableActionIcons({value, path, icon="trash"}){
    const router = useRouter()

    const {tokens} = useContext(UserContext);
    const handleDelete = async (id) => {
        try {
            const {data} = await authFetchData(tokens.access_token).delete(`/${path}/${id}`)
            router.reload(router.asPath)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="flex gap-6 mx-4">
            <div className="text-red-800" onClick={()=>handleDelete(value)}>
                <FontAwesomeIcon icon={["fas", icon]} />
            </div>
            {/* <FontAwesomeIcon icon={["fas", "trash"]} /> */}
        </div>
    )
}
