import * as Yup from "yup"
import { useFormik } from "formik";
import { postRequest } from "@/pages/api/api";
import { useContext } from "react";
import UserContext from "@/contextapi/AuthAndUsers";
import { url } from "@/pages/api/url";
import { cookies } from "next/dist/client/components/headers";

export default function ProjectForm(){
    const {userInfo, tokens, setProjectPopup} = useContext(UserContext)
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values) => postRequest(
            `${url}/projects?owner=${userInfo.id}`,
            JSON.stringify(values),
            tokens.access_token
            ).then(response=>response.json().then(data=>({
                data: data,
                status_code: response.status
            })).then(res=>{
                console.log(res.status_code, res.data)
                const available_projects = JSON.parse(localStorage.getItem("projects"))
                available_projects.push(res.data)
                console.log(available_projects)
                localStorage.setItem("projects", JSON.stringify(available_projects))
                setProjectPopup(false)
            })),

        validationSchema: Yup.object({
            name: Yup.string().max(50, "Name should not exceed 50 characters").required("Source name is required."),
        })
    })

    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.name &&formik.errors.name ?formik.errors.name: "Project Name"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="name"
                        placeholder="Project Name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="flex mt-4">
                    <button className="font-normal py-1 px-4 text-lg bg-[#fcc300] hover:bg-[#fff] active:bg-[#fcc300] rounded-md text-black" type="submit">Submit</button>
                </div>
            </form>
        </main>
    )
}
