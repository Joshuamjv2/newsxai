import { getUpdateDeleteRequest, setTokenExpiry } from "@/pages/api/api";
import { createContext, useState, useEffect } from "react";
import { url } from "@/pages/api/url";

export const UserContext = createContext({})

export const UserContexProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState( null);
    const [isAuth, setIsAuth] = useState(false);
    const [tokens, setTokens] = useState(null);
    const [projects, setProjects] = useState(null)
    const [current_project, setCurrentProject] = useState(null)

    useEffect(()=>{
        setUserInfo(()=>localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")): null)
        setTokens(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")): null)
        setIsAuth(()=>localStorage.getItem('authenticated') ? JSON.parse(localStorage.getItem("authenticated")): false)
        setProjects(()=>localStorage.getItem('projects') ? JSON.parse(localStorage.getItem("projects")): null)
        setCurrentProject(()=>localStorage.getItem('current_project') ? JSON.parse(localStorage.getItem("current_project")): null)
    }, [])


    async function init_auth(){
        getUpdateDeleteRequest(`${url}/auth`, "GET").then((res)=>{
            window.location.assign(res.url)
        }).then(()=>console.log(window.location, "window"))
    }


    async function login(id){
        getUpdateDeleteRequest(`${url}/auth/login?user_id=${id}`, "GET").then((res)=>{
            if (res.user_info.email !== localStorage.getItem("email")){
                localStorage.setItem("user", JSON.stringify(res.user_info))
                localStorage.setItem("projects", JSON.stringify(res.projects))
                localStorage.setItem("current_project", JSON.stringify(res.projects[0]))
                setCurrentProject(res.projects[0])
                setProjects(res.projects)
                setUserInfo(res.user_info)
            }
            const token_to_save = setTokenExpiry(res.token)
            localStorage.setItem("token", JSON.stringify(token_to_save))
            setTokens(token_to_save)

            localStorage.setItem("authenticated", "true")
            setIsAuth("true")


    })
    }


    async function logout(){
        const user_id = JSON.parse(localStorage.getItem("user")).id
        getUpdateDeleteRequest(`${url}/auth/logout?user_id=${user_id}`, "GET").then(
            ()=>localStorage.clear()
        );
        setTokens(null)
        setIsAuth(false)
        setUserInfo(null)
    }


    const value = {
        userInfo,
        isAuth,
        tokens,
        setIsAuth,
        setIsAuth,
        setTokens,
        login,
        logout,
        init_auth,
        projects,
        current_project,
        setCurrentProject,
        setProjects
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
