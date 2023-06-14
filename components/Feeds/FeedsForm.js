import * as Yup from "yup"
import { useFormik } from "formik";
import { postRequest } from "@/pages/api/api";
import { useContext } from "react";
import UserContext from "@/contextapi/AuthAndUsers";
import { url } from "@/pages/api/url";

export default function FeedsForm(){
    const {current_project, tokens, setPopup} = useContext(UserContext)
    const formik = useFormik({
        initialValues: {
            source_name: "",
            source_link: "",
            rss_link: ""
        },
        onSubmit: (values) => postRequest(
            `${url}/rss_feeds?project=${current_project.id}`,
            JSON.stringify([values]),
            tokens.access_token
            ).then(response=>{
                const data = response.res
                const  code = response.status
                console.log(data, code)
                setPopup(false)
            }),

        validationSchema: Yup.object({
            source_name: Yup.string().required("Source name is required."),
            source_link: Yup.string().required("Source link is required.").url("Please provide a valid URL"),
            rss_link: Yup.string().required("RSS link is required.").url("Please provide a valid URL")
        })
    })

    return (
        <main className="mt-8 w-full lg:w-1/2">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="name">{formik.touched.source_name &&formik.errors.source_name ?formik.errors.source_name: "Source Name"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="source_name"
                        placeholder="Source Name"
                        type="text"
                        value={formik.values.source_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="name">{formik.touched.source_link && formik.errors.source_link ?formik.errors.source_link: "Source Link"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="source_link"
                        placeholder="Source Link"
                        type="text"
                        value={formik.values.source_link}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="name">{formik.touched.rss_link && formik.errors.rss_link ?formik.errors.rss_link: "RSS Link"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-2 border-[#000] focus:border-[#ffc300] focus:ring-[#ffc300]"
                        name="rss_link"
                        placeholder="RSS Link"
                        type="text"
                        value={formik.values.rss_link}
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
