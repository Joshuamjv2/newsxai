import Button from "../button";
// import { postRequest } from "@/pages/api/api";

export default function FeedsForm(){
    // const [fields, setFields] = useStat({})
    const handleSubmit = () => {

    }
    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">First Name</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="first-name"
                        placeholder="First Name"
                        type="text"
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="name">Last Name</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="last-name"
                        placeholder="Last Name"
                        type="text"
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="name">About</label>
                    <textarea className="rounded-md w-full text-[#000] p-2" name="about" id="about" cols="30" rows="3"></textarea>
                </div>
                <div className="flex mt-4" onClick={handleSubmit}>
                    <Button text={"Submit"} />
                </div>
            </form>
        </main>
    )
}
