import Button from "../button";
import { useFormik } from "formik";
import { useContext,  useState } from "react";
import * as Yup from "yup";
import UserContext from "@/contextapi/AuthAndUsers";
import LoadingSpinner from "../loadingSpinner";
import { authFetchData } from "@/pages/api/api_with_axiso";
import { useRouter } from "next/router";

export default function ArticleEditForm({post}){
    const {tokens, setPopup} = useContext(UserContext)
    const [spin, setSpin] = useState(false)
    const router = useRouter()

    async function updateArticle(id, article){
        try {
            const {data} = await authFetchData(tokens.access_token).patch(`/articles/${id}`, article)
            router.reload(router.asPath)
            setPopup(false)
        } catch (error) {
            console.log(error.response.status)
        }
    }

    // handle, validate and submit form
    const formik = useFormik({
        initialValues: {
            post: post.article,
            title: post.title,
            author: post.author,
            site: post.site
        },
        onSubmit: (values) => updateArticle(post.id, values),

        validationSchema: Yup.object({
            post: Yup.string().required("First Name is required").min(100, "A minimum of 100 characters is required"),
            title: Yup.string().required("Last Name is required"),
            site: Yup.string().url("Insert a valid URL"),
            author: Yup.string()
        })
    })
    return (
        <main className="mt-4 mb-8 w-full">
            <form onSubmit={formik.handleSubmit} className="mx-8">
                <div className="text-left pt-2 lg:w-2/3">
                    <label className="block text-[#fff] text-md mb-1 font-bold" htmlFor="title">{formik.touched.title && formik.errors.title ? formik.errors.title : "Title"}</label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="title"
                        placeholder="Title"
                        type="text"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4 lg:w-2/3">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="author">
                        {formik.touched.author && formik.errors.author ? formik.errors.author : "Author"}
                    </label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="author"
                        placeholder="Author"
                        type="text"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4 lg:w-2/3">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="site">
                        {formik.touched.site && formik.errors.site ? formik.errors.site : "Site"}
                    </label>
                    <input
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="site"
                        placeholder="Site"
                        type="text"
                        value={formik.values.site}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="text-left pt-4 lg:w-full">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="post">{formik.touched.about && formik.errors.post ? formik.errors.post : "Article"}</label>
                    <textarea
                        className="rounded-md w-full text-[#000] p-2" name="post" value={formik.values.post} id="post" cols="25" rows="12"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        ></textarea>
                </div>
                <div className="flex mt-4 gap-2">
                    {!spin ? <button className="font-normal py-1 px-4 text-lg bg-[#fcc300] hover:bg-[#fff] active:bg-[#fcc300] rounded-md text-black" type="submit">Update</button>: <LoadingSpinner />}
                    <div onClick={()=>setPopup(false)}>
                        <Button text={"cancel"} />
                    </div>
                </div>
            </form>
        </main>
    )
}
