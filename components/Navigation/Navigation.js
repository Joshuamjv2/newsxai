import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../button"
import UserContext from "@/contextapi/AuthAndUsers"
import { useContext, useState } from "react"

export default function Navigation({image}){
    const {current_project, projects, setCurrentProject} = useContext(UserContext)
    const [showProjects, setShowProjects] = useState(false)

    return(
        <div className="fixed right-0 flex left-60 px-8 pt-8  items-center justify-between mb-8 bg-black z-20">
            <div className="flex gap-36 w-11/12 items-center">
                {
                    current_project !== null ?
                        <div className="overflow-hidden">
                            <div onClick={()=>setShowProjects(!showProjects)} className="flex bg-[#fcc300] items-center py-2 gap-2 px-6 rounded-md">
                                <h3 className="cursor-pointer text-lg text-[#000] text-center capitalize font-semibold">{current_project.name}</h3>
                                <FontAwesomeIcon icon={["fas", "caret-down"]} size="md" color="#000"/>
                            </div>
                            {showProjects && <div className="mt-2 absolute rounded-md">
                                <ul className="text-black font-semibold text-lg w-full border border-[#fcc300] rounded-md overflow-hidden ">
                                    {projects.map(project=>
                                        <li onClick={()=>project.id !== current_project.id && setCurrentProject(project)} className="border-b-2 w-full bg-[#fcc300] px-8 py-2 text-lg last:border-b-0 border-[#fff] hover:bg-[#fff] active:bg-[#ffc300]" key={project.id}>{project.name}</li>
                                    )}
                                </ul>
                            </div>}
                            {/* <div onClick={()=>setShowProjects(false)} className="bg-[#fcc300] text-[#000] py-2 text-xl px-4 cursor-pointer hover:bg-[#fff] active:bg-[#fcc300]">
                                <FontAwesomeIcon icon={["fas", "caret-down"]} size="8"/>
                            </div> */}
                        </div>
                    :
                        <Button text={"add project"} fa_icon={"plus"} />
                }
            </div>
            <div className="rounded-full overflow-hidden">
                <Image src={image} height={50} width={50} alt="User profile image" />
            </div>
        </div>
    )
}
