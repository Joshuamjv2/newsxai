import Button from "../button";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { postRequest } from "@/pages/api/api";
import * as Yup from "yup";
import { url } from "@/pages/api/url";
import UserContext from "@/contextapi/AuthAndUsers";
import LoadingSpinner from "../loadingSpinner";
export default function SitesForm(){
    const {current_project, tokens, setPopup} = useContext(UserContext)
    const formik = useFormik({
        initialValues: {
            name: "",
            link: ""
        },
        onSubmit: (values) => postRequest(
            `${url}/sites?project=${current_project.id}`,
            JSON.stringify([values]),
            tokens.access_token
        ).then(response=>response.json().then(data=>({
                data: data,
                status_code: response.status
            })).then(res=>{
                setPopup(false)
            })),

        validationSchema: Yup.object({
            name: Yup.string().required("First Name is required"),
            link: Yup.string().url("Provide a valid url").required("Link is required.")
        })
    })
    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.name &&formik.errors.name ?formik.errors.name: "Site Name"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="name"
                        placeholder="Site Name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.link &&formik.errors.link ?formik.errors.link: "Site Link"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="link"
                        placeholder="Site Link"
                        type="text"
                        value={formik.values.link}
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
