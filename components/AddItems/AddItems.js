import Button from "../button";
import AddSingleItem from "./AddSingleItem";
// import { useEffect } from "react";

export default function AddItems({children, items = []}){
    console.log(items.length, "length")
    return(
        items.length > 0 ?
        <ul className="p-2 my-4">
            {children}
            <div className="mb-10 mt-4 min-w-min">
                {items.map(item => (
                    <AddSingleItem key={""} item={item}>
                        <p className="text-black py-2 rounded-md px-2 md:px-4 lg:px-24">{item.name}</p> 
                    </AddSingleItem>
                ))}
            </div>

            <div className="flex gap-4 justify-center">
                <Button text={"add more"} fa_icon={"plus"} />
                <Button text={"save"} fa_icon={"save"} />
            </div>
        </ul>
        :
        <div className="flex items-center flex-col gap-2 justify-center">
            <p className="text-lg text-[#7b7b7b]">No items added yet</p>
            <Button fa_icon={"plus"} text={"Add"} />
        </div>
    )
}
