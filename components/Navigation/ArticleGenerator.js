import { authFetchData } from "@/pages/api/api_with_axiso";
import { useContext } from "react";
import { useState, useEffect } from "react";
import UserContext from "@/contextapi/AuthAndUsers";


export default function ArticleGenerator({access_token}){
    const {current_project, setCurrentProject} = useContext(UserContext)
    const [generate, setGenerate] = useState(current_project.generate_articles)

    const handleClick = async () => {
        try {
            const update_item = JSON.stringify({generate_articles: !generate})
            const {data} = await authFetchData(access_token).patch(`/projects/${current_project.id}`, update_item)

            console.log(data)

            const saved_project = JSON.parse(localStorage.getItem("current_project"))
            const projects = JSON.parse(localStorage.getItem("projects"))
            saved_project.generate_articles = !generate


            // update current project in project array
            for (let i=0; i<projects.length; i++){
                if (projects[i].id == saved_project.id){
                    projects[i] = saved_project
                    console.log(projects, "Projects")
                    break;
                }
            }
            // update current project
            setCurrentProject(saved_project)
            localStorage.setItem("current_project", JSON.stringify(saved_project))
            localStorage.setItem("projects", JSON.stringify(projects))

            setGenerate(!generate)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        setGenerate(current_project.generate_articles)
    }, [current_project])

    const current_color = `${generate ? "[#fc7100]": "[#fc1d00]"}`

    return(
        <div onClick={()=>handleClick()} className={`flex ${generate ? "bg-[#43c45f]": "bg-[#fc1d00]"} items-center py-2 gap-2 px-6 rounded-md hover:bg-white active:bg-[${generate ? "#ffc300": "#fc1d00"}]`}>
            <h3 className="cursor-pointer text-lg text-[#000] text-center capitalize font-semibold">
                {generate ? "Turn off Article Writer": "Turn on Article Writer"}
            </h3>
        </div>
    )
}