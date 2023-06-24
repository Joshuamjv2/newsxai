import Button from "../button";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import UserContext from "@/contextapi/AuthAndUsers";
import LoadingSpinner from "../loadingSpinner";
import { useRouter } from "next/router";
import { authFetchData } from "@/pages/api/api_with_axiso";

export default function AuthorForm(){
    const router = useRouter()
    const {current_project, tokens, setPopup} = useContext(UserContext)
    const [spin, setSpin] = useState(false)

    async function  addAuthor(author){
        try {
            const {data} = await authFetchData(tokens.access_token).post(`/authors?project=${current_project.id}`, author)
            router.reload(router.asPath)
            setPopup(false)
        } catch (error) {
            console.log(error.response.status)
            setPopup(false)
        }
    }

    // handle, validate and submit form
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            about: ""
        },
        onSubmit: (values) => addAuthor(values),

        validationSchema: Yup.object({
            first_name: Yup.string().required("First Name is required"),
            last_name: Yup.string().required("Last Name is required"),
            about: Yup.string().required("About is required")
        })
    })
    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : "First Name"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="first_name"
                        placeholder="First Name"
                        type="text"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="first_name">
                        {formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : "Last Name"}
                    </label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="last_name"
                        placeholder="Last Name"
                        type="text"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="about">{formik.touched.about && formik.errors.about ? formik.errors.about : "About"}</label>
                    <textarea
                        className="rounded-md w-full text-[#000] p-2" name="about" value={formik.values.about} id="about" cols="30" rows="3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        ></textarea>
                </div>
                <div className="flex mt-4">
                    {!spin ? <button className="font-normal py-1 px-4 text-lg bg-[#fcc300] hover:bg-[#fff] active:bg-[#fcc300] rounded-md text-black" type="submit">Submit</button>: <LoadingSpinner />}
                </div>
            </form>
        </main>
    )
}
