import Button from "../button";
// import { postRequest } from "@/pages/api/api";

export default function SitesForm(){
    // const [fields, setFields] = useStat({})
    const handleSubmit = () => {

    }
    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">Site Name</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="site-name"
                        placeholder="Site Link"
                        type="text"
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="name">Site Link</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="site-link"
                        placeholder="Site Link"
                        type="text"
                    />
                </div>
                <div className="flex mt-4" onClick={handleSubmit}>
                    <Button text={"Submit"} />
                </div>
            </form>
        </main>
    )
}
