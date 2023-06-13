import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpinner";


const NoItems = ({text, no_items}) => {
    const [missing, setMissing] = useState(true)

    return (
        !no_items?
        <div className="text-center mt-36 flex justify-center">
            <LoadingSpinner />
        </div>
        :
        <div className="text-center mt-8 md:mt-36">
            <div className="flex justify-center fap-4 mb-3 gap-6 text-4xl">
                <FontAwesomeIcon icon={['fas', "face-frown"]} color="#ffc300" />
                <FontAwesomeIcon icon={['fas', "face-frown"]} color="#ffc300"/>
                <FontAwesomeIcon icon={['fas', "face-frown"]} color="#ffc300" />
            </div>
            <div className="text-xl text-[#9e9e9e]">
                {text}
            </div>
        </div>
    );
}

export default NoItems;

