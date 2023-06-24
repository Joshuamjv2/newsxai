import { getUpdateDeleteRequest, setTokenExpiry } from "@/pages/api/api";
import { createContext, useState, useEffect } from "react";
import { url } from "@/pages/api/url";
import { fetchData } from "@/pages/api/api_with_axiso";
import axios from "axios";

export const UserContext = createContext({})

export const UserContexProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState( null);
    const [isAuth, setIsAuth] = useState(false);
    const [tokens, setTokens] = useState(null);
    const [projects, setProjects] = useState(null)
    const [current_project, setCurrentProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [popup, setPopup] = useState(false)
    const [projectPopup, setProjectPopup] = useState(false)


    useEffect(()=>{
        setUserInfo(()=>localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")): null)
        setTokens(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")): null)
        setIsAuth(()=>localStorage.getItem('authenticated') ? JSON.parse(localStorage.getItem("authenticated")): false)
        setProjects(()=>localStorage.getItem('projects') ? JSON.parse(localStorage.getItem("projects")): null)
        setCurrentProject(()=>localStorage.getItem('current_project') ? JSON.parse(localStorage.getItem("current_project")): null)
    }, [])


    // async function init_auth(){
    //     getUpdateDeleteRequest(`${url}/auth`, "GET").then((res)=>{
    //         window.location.assign(res.url)
    //     }).then(()=>console.log(window.location, "window"))
    // }

    async function init_auth(){
        try {
            const {data} = await fetchData.get("/auth")
            window.location.assign(data.url)
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }


    // async function login(id){
    //     getUpdateDeleteRequest(`${url}/auth/login?user_id=${id}`, "GET").then((res)=>{
    //         if (res.user_info.email !== localStorage.getItem("email")){
    //             localStorage.setItem("user", JSON.stringify(res.user_info))
    //             localStorage.setItem("projects", JSON.stringify(res.projects))
    //             localStorage.setItem("current_project", JSON.stringify(res.projects[0]))
    //             setCurrentProject(res.projects[0])
    //             setProjects(res.projects)
    //         }
    //         const token_to_save = setTokenExpiry(res.token)
    //         localStorage.setItem("token", JSON.stringify(token_to_save))
    //         setTokens(token_to_save)

    //         localStorage.setItem("authenticated", "true")
    //         setUserInfo(res.user_info)
    //         setIsAuth("true")
    //         setLoading(false)
    // })
    // }

    async function login(id){
        try {
            const {data} = await fetchData.get(`/auth/login?user_id=${id}`)
            if (data.user_info.email !== localStorage.getItem("email")){
                localStorage.setItem("user", JSON.stringify(data.user_info))
                localStorage.setItem("projects", JSON.stringify(data.projects))
                localStorage.setItem("current_project", JSON.stringify(data.projects[0]))
                setCurrentProject(data.projects[0])
                setProjects(data.projects)
            }
            const token_to_save = setTokenExpiry(data.token)
            localStorage.setItem("token", JSON.stringify(token_to_save))
            setTokens(token_to_save)

            localStorage.setItem("authenticated", "true")
            setUserInfo(data.user_info)
            setIsAuth("true")
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    // async function logout(){
    //     const user_id = JSON.parse(localStorage.getItem("user")).id
    //     getUpdateDeleteRequest(`${url}/auth/logout?user_id=${user_id}`, "GET").then(
    //         ()=>localStorage.clear()
    //     );
    //     setTokens(null)
    //     setIsAuth(false)
    //     setUserInfo(null)
    // }

    async function logout(){
        const user_id = userInfo.id
        try {
            const {data} = await fetchData.get(`/auth/logout?user_id=${user_id}`)
            localStorage.clear()
            setTokens(null)
            setIsAuth(false)
            setUserInfo(null)
        } catch (error) {
            console.log(error.response)
        }
    }


    const value = {
        userInfo,
        isAuth,
        tokens,
        setIsAuth,
        setTokens,
        login,
        logout,
        init_auth,
        projects,
        current_project,
        setCurrentProject,
        setProjects,
        loading,
        setLoading,
        popup,
        setPopup,
        projectPopup,
        setProjectPopup
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
