import Button from "./button"

export default function PopupLayout({active, title, children}){
    return(
        active ?
            <div className="absolute flex w-full h-full text-center bg-[#191a1a] bg-opacity-80 items-center z-10 top-0">
                <div className="mx-auto lg:h-4/5 w-4/5 xl:w-3/5 border-2 border-[#fff] rounded-lg bg-[#191a1a] opacity-100 relative">
                    <div className="absolute w-full">
                        <div className="flex justify-between mx-6 mt-6 xl:mx-12 xl:mt-12 ">
                            <h3 className="uppercase text-xl lg:text-2xl font-bold text-[#ffc300]">{title}</h3>
                            <Button text={"close"} fa_icon={"multiply"} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
            :<div className="hidden"></div>
    )
}
