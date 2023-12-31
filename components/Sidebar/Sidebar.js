import SidebarNavItem from "./SidebarNavItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Button from "../button"

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import UserContext from "@/contextapi/AuthAndUsers";

export default function Sidebar(){
    const {current_project, projects, setCurrentProject, projectPopup, setProjectPopup} = useContext(UserContext)
    const [showProjects, setShowProjects] = useState(false)
    const router = useRouter()
    const {logout, isAuth} = useContext(UserContext)

    const goToSettings = () => {
        // logout()
        router.push({
            pathname: '/settings'
        });
    }
    return(
        <div className="bg-[#191a1a] fixed min-h-screen flex flex-col justify-between w-60 cursor-pointer">
            <div className="mx-8 pb-2">
                <Link href={"/"}>
                    <div className="mb-12">
                        <h1 className="mt-8 font-semibold uppercase text-2xl text-[#e9eaec]">NewsX AI</h1>
                        <h6 className="text-[#ffc300]">Admin Panel</h6>
                    </div>
                </Link>
                <div onClick={()=>setProjectPopup(true)}>
                    <Button fa_icon={"plus"} text={"Add project"} />
                </div>
            </div>
            <div className="px-4">
                <ul className="">
                    <Link href={"/"}>
                        <SidebarNavItem name={"Articles"} nav_icon="book"/>
                    </Link>
                    <Link href={"/feeds"}>
                        <SidebarNavItem name={"Feeds"} nav_icon="rss" />
                    </Link>
                    <Link href={"/authors"}>
                        <SidebarNavItem name={"Authors"} nav_icon="user" />
                    </Link>
                    <Link href={"/categories"}>
                        <SidebarNavItem name={"Categories"} nav_icon="folder" />
                    </Link>
                </ul>
            </div>

            <div className="mx-8 mb-8" onClick={goToSettings}>
                <Button text={"Settings"} fa_icon={"gear"} />
            </div>
        </div>
    )
}