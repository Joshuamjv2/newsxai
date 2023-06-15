import { useFormik } from "formik";
import { useContext, useState } from "react";
import { postRequest } from "@/pages/api/api";
import * as Yup from "yup";
import { url } from "@/pages/api/url";
import UserContext from "@/contextapi/AuthAndUsers";

export default function CategoryForm(){
    const {tokens, setPopup, current_project} = useContext(UserContext)
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values) => postRequest(
            `${url}/categories?project=${current_project.id}`,
            JSON.stringify(values),
            tokens.access_token
            ).then(response=>{
                const data = response.res
                const  code = response.status
                setPopup(false)
            }),

        validationSchema: Yup.object({
            name: Yup.string().max(50, "Name should not exceed 50 characters").required("Source name is required."),
        })
    })
    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.name &&formik.errors.name ?formik.errors.name: "Category Name"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="name"
                        placeholder="Category Name"
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
