import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../button"
import UserContext from "@/contextapi/AuthAndUsers"
import ArticleGenerator from "./ArticleGenerator"
import { useContext, useState } from "react"
import { useEffect } from "react"

export default function Navigation({image}){
    const {current_project, projects, setCurrentProject, projectPopup, setProjectPopup, tokens} = useContext(UserContext)
    const [showProjects, setShowProjects] = useState(false)
    const updateProject = (project) =>{
        setCurrentProject(project)
        setShowProjects(false)
        localStorage.setItem("current_project", JSON.stringify({
            name: project.name,
            id: project.id,
            owner: project.owner,
            generate_articles: project.generate_articles,
            created: project.created,
            updated: project.updated
        }))
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
                                        <li onClick={()=>project.id !== current_project.id && updateProject(project)} className="border-b-2 w-full bg-[#323131] px-8 py-2 text-lg last:border-b-0 border-[#fff] hover:bg-[#fff] active:bg-[#323131] cursor-pointer" key={project.id}>{project.name}</li>
                                    )}
                                    <li onClick={()=>setProjectPopup(!projectPopup)} className="cursor-pointer border-b-2 w-full bg-[#323131] px-8 py-2 text-lg last:border-b-0 border-[#fff] hover:bg-[#fff] active:bg-[#323131]">Add Project</li>
                                </ul>
                            </div>}
                        </div>
                    :
                        <Button text={"add project"} fa_icon={"plus"} />
                }
            <ArticleGenerator access_token={tokens.access_token} />
            </div>
            <div className="rounded-full overflow-hidden">
                <Image src={image} height={50} width={50} alt="User profile image" />
            </div>
        </div>
    )
}
