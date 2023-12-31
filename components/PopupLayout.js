import { useContext } from "react"
import Button from "./button"
import UserContext from "@/contextapi/AuthAndUsers"

export default function PopupLayout({active, title, for_project, children}){
    const {setPopup, setProjectPopup} = useContext(UserContext)
    return(
        active ?
            <div className="absolute w-full h-full text-center bg-[#191a1a] bg-opacity-80 items-center z-10 top-0">
                <div className="mx-auto w-4/5 border-2 border-[#fff] rounded-lg bg-[#191a1a] opacity-100 relative mt-20">
                    <div className="absolute w-full">
                        <div className="flex justify-between mx-6 mt-6 xl:mx-12 xl:mt-12 ">
                            <h3 className="uppercase text-xl lg:text-2xl font-bold text-[#ffc300]">{title}</h3>
                            {for_project ?
                                <div onClick={()=>setProjectPopup(false)}>
                                    <Button text={"close"} fa_icon={"multiply"} />
                                </div>
                            :
                            <div onClick={()=>setPopup(false)}>
                                <Button text={"close"} fa_icon={"multiply"} />
                            </div>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-full mt-12 mb-8">
                        {children}
                    </div>
                </div>
            </div>
            :<div className="hidden"></div>
    )
}
