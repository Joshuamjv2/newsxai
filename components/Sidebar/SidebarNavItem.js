import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SidebarNavItem({name, nav_icon="plus"}){
    return (
    <li className="capitalize text-lg px-4 py-2 rounded-sm my-3 cursor-pointer hover:text-[#ffc300] font-light">
        <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={["fas", nav_icon]} size="10" />
            <h3>{name}</h3>
        </div>
    </li>
    )
}