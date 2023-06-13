import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../button"

export default function Navigation({image, current_project}){
    return(
        <div className="fixed right-0 flex left-60 px-8 pt-8  items-center justify-between mb-8 bg-black">
            <div className="flex gap-36 w-11/12 items-center">
                {
                    current_project !== null ?
                        <div className="flex items-center gap-1 rounded-md overflow-hidden">
                            <div className="flex bg-[#fcc300] items-center py-2 gap-2 px-6">
                                <FontAwesomeIcon icon={["fas", "house"]} size="md" color="#000"/>
                                <h3 className="cursor-pointer text-lg text-[#000] text-center capitalize font-semibold">{current_project.name}</h3>
                            </div>
                            <div className="bg-[#fcc300] text-[#000] py-2 text-xl px-4 cursor-pointer hover:bg-[#fff] active:bg-[#fcc300]">
                                <FontAwesomeIcon icon={["fas", "caret-down"]} size="8"/>
                            </div>
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
