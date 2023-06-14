import { getUpdateDeleteRequest, setTokenExpiry } from "@/pages/api/api";
import { createContext, useState, useEffect } from "react";

export const ContentContext = createContext({})

export const ContentContexProvider = ({children}) => {
    const [popup, setPopup] = useState(false)

    const value = {
        popup,
        setPopup
    }

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentContext;
