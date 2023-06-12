import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function AddSingleItem({item, children}){
    return (
        <li className="py-1">
            <div className="flex gap-8 justify-between items-center">
                <div className="bg-[#fff] w-full rounded-md">
                    {children}
                    {/* <p className="text-black py-2 rounded-md px-24">{item.name}</p> */}
                </div>
                <div className="bg-[#b50033] active:bg-[#b50033] active:text-white py-2 px-4 cursor-pointer rounded-md text-white hover:bg-[#fff] hover:text-black hover:transition-all">
                    <FontAwesomeIcon icon={["fas", "trash"]} size="24" />
                </div>
            </div>
        </li>
    )
}
