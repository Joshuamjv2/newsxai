import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../button"
import UserContext from "@/contextapi/AuthAndUsers"
import ArticleGenerator from "./ArticleGenerator"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { authFetchData } from "@/pages/api/api_with_axiso"
import { useRouter } from "next/router"

export default function Navigation({image}){
    const {current_project, logout, projects, setCurrentProject, projectPopup, setProjectPopup, tokens, setProjects} = useContext(UserContext)
    const [showProjects, setShowProjects] = useState(false)
    const router = useRouter()

    const updateProject = (project) =>{
        localStorage.setItem("current_project", JSON.stringify({
            name: project.name,
            id: project.id,
            owner: project.owner,
            generate_articles: project.generate_articles,
            created: project.created,
            updated: project.updated
        }))
        setCurrentProject(project)
        setShowProjects(false)
        router.reload(router.asPath)
    }

    const handleLogout = () => {
        logout()
        router.push({
            pathname: '/settings'
        });
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(current_project.id)
        alert(`Project ID ${current_project.id} copied!`)
    }
    const handleDelete = async (id) => {
        try {
            const {data} = authFetchData(tokens.access_token).delete(`/projects/${id}`)
            setProjects(projects.filter(item => item.id !== id))
            localStorage.setItem("projects", JSON.stringify(projects.filter(item => item.id !== id)))
            if (id == current_project.id){
                setCurrentProject(projects[0])
                localStorage.setItem("current_project", JSON.stringify(current_project))
            }
            setShowProjects(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className={`fixed right-0 flex left-60 px-8 pt-8 items-center justify-between mb-8 bg-black ${!projectPopup&&"z-20"}`}>
            <div className="flex gap-4 w-11/12 items-center">
                {
                    current_project !== null ?
                        <div className="overflow-hidden">
                            <div onClick={()=>setShowProjects(!showProjects)} className="flex bg-[#fcc300] items-center py-2 gap-2 px-6 rounded-md">
                                <h3 className="cursor-pointer text-lg text-[#000] text-center capitalize font-semibold">{current_project.name}</h3>
                                <FontAwesomeIcon icon={["fas", "caret-down"]} size="md" color="#000"/>
                            </div>
                            {showProjects && <div className="mt-2 absolute rounded-md">
                                <ul className="text-black font-semibold text-lg w-full border border-[#323131] rounded-md overflow-hidden ">
                                    {projects.map(project=>
                                        <li className="relative border-b-2 w-full bg-[#323131] px-8 py-2 text-lg last:border-b-0 border-[#fff] hover:bg-[#fff] active:bg-[#323131] cursor-pointer flex gap-2" key={project.id}>
                                        <h6 onClick={()=>project.id !== current_project.id && updateProject(project)} className="mr-4">{project.name}</h6>
                                        {projects.length > 1 && <div onClick={()=>handleDelete(project.id)} className="absolute right-4 text-[#ff3300]"><FontAwesomeIcon icon={["fas", "trash"]} /></div>}
                                        </li>
                                    )}
                                    <li onClick={()=>setProjectPopup(!projectPopup)} className="cursor-pointer border-b-2 w-full bg-[#323131] px-8 py-2 text-lg last:border-b-0 border-[#fff] hover:bg-[#fff] active:bg-[#323131]">Add Project</li>
                                </ul>
                            </div>}
                        </div>
                    :
                        <Button text={"add project"} fa_icon={"plus"} />
                }
                <ArticleGenerator access_token={tokens.access_token} />
                <div className="flex gap-2 items-center" onClick={handleCopy}>
                    <Button text={"Copy Project ID"} fa_icon="copy" />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div onClick={handleLogout} className="text-md gap-2 flex items-center rounded-md py-2 px-4 bg-red-800 cursor-pointer">
                    <FontAwesomeIcon icon={["fas", "door-closed"]} />
                    <h6>Logout</h6>
                </div>
                <div className="rounded-full overflow-hidden">
                    <Image src={image} height={60} width={60} alt="User profile image" />
                </div>
            </div>
        </div>
    )
}
