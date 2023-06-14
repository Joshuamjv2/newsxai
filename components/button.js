import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Button({text, fa_icon, color="#ffc300"}){
    return(
        <button className="">
        <div className={`text-[#000] cursor-pointer text-center bg-[${color}] py-2 rounded-md hover:bg-[#fff] active:bg-[#fcc300] px-6`}>
            <div className="flex items-center justify-center gap-2">
                {fa_icon && <FontAwesomeIcon icon={["fas", fa_icon]} size="12" />}
                <h3 className="capitalize">{text}</h3>
            </div>
        </div>
        </button>
    )
}
