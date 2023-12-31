import Button from "../button";
import { useFormik } from "formik";
import { useContext,  useState, useEffect } from "react";
import * as Yup from "yup";
import UserContext from "@/contextapi/AuthAndUsers";
import LoadingSpinner from "../loadingSpinner";
import { authFetchData } from "@/pages/api/api_with_axiso";
import { useRouter } from "next/router";

export default function ArticleEditForm({post}){
    const {tokens, setPopup} = useContext(UserContext)
    const [spin, setSpin] = useState(false)
    const [authors, setAuthors] = useState([])
    const [sites, setSites] = useState([])
    const [categories, setCategories] = useState([])
    const[showForm, setShowForm] = useState(false)
    const router = useRouter()

    async function updateArticle(id, article){
        try {
            const {data} = await authFetchData(tokens.access_token).patch(`/articles/${id}`, article)
            setPopup(false)
            router.push(`/`)
        } catch (error) {
            console.log(error.response.status)
        }
    }

    async function setDropdown(){
        try {
            if (post.project){
            const project = post.project
            const authors_res = await authFetchData(tokens.access_token).get(`/authors?project=${project}`)
            const sites_res = await authFetchData(tokens.access_token).get(`/sites?project=${project}`)
            const categories_res = await authFetchData(tokens.access_token).get(`/categories?project=${project}`)
            setAuthors(authors_res.data)
            setCategories(categories_res.data)
            setSites(sites_res.data)
            setShowForm(true)
            console.log(showForm)
        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        setDropdown()
    }, [])

    // handle, validate and submit form
    const formik = useFormik({
        initialValues: {
            post: post.article,
            title: post.title,
            author: post.author || "",
            site: post.site || "",
            category: post.category || ""
        },
        onSubmit: (values) => updateArticle(post.id, values),

        validationSchema: Yup.object({
            post: Yup.string().required("First Name is required").min(100, "A minimum of 100 characters is required").optional(),
            title: Yup.string().required("Last Name is required"),
            site: Yup.string().url("Select a valid URL"),
            author: Yup.object(),
            category: Yup.object()
        })
    })

    console.log(formik.values)
    return (
        showForm ? <main className="mt-4 mb-8 w-full">
            {showForm && <form onSubmit={formik.handleSubmit} className="mx-8">

                {/* title */}
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

                {/* authors */}
                <div className="text-left pt-4 lg:w-2/3">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="author">{formik.touched.author && formik.errors.author ? formik.errors.author : "Select Author"}</label>
                    <select
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="author"
                        type="text"
                        // value={formik.values.author}
                        onChange={(event) => {
                            const selectedAuthor = JSON.parse(event.target.value);
                            formik.setFieldValue("author", selectedAuthor);
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {authors.map(author=><option className="py-2 px-2" key={author.id} value={JSON.stringify({id: author.id, name: `${author.first_name} ${author.last_name}`})}>{author.last_name}</option>)}
                    </select>
                </div>

                {/* sites */}
                <div className="text-left pt-4 lg:w-2/3">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="site">{formik.touched.site && formik.errors.site ? formik.errors.site : "Select Site"}</label>
                    <select
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="site"
                        type="text"
                        value={formik.values.site}
                        onChange={(event) => {
                            const selectedItem = JSON.parse(event.target.value);
                            formik.setFieldValue("site", selectedItem);
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {sites.map(site=><option className="py-2 px-2" key={site.id} value={JSON.stringify({id: site.id, name: `${site.name}`})}>{site.name}</option>)}
                    </select>
                </div>

                {/* catgories */}
                <div className="text-left pt-4 lg:w-2/3">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="category">{formik.touched.category && formik.errors.category ? formik.errors.category : "Select Category"}</label>
                    <select
                        className="w-full py-2 rounded-md px-2 text-black border-[#000] focus:border-[#ffc300]"
                        name="category"
                        type="text"
                        value={formik.values.category}
                        onChange={(event) => {
                            const selectedItem = JSON.parse(event.target.value);
                            formik.setFieldValue("category", selectedItem);
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {categories.map(category=><option className="py-2 px-2" key={category.id} value={JSON.stringify({id: category.id, name: `${category.name}`})}>{category.name}</option>)}
                    </select>
                </div>

                {/* article */}
                <div className="text-left pt-4 lg:w-full">
                    <label className="block text-[#fff] text-md font-bold mb-1" htmlFor="post">{formik.touched.about && formik.errors.post ? formik.errors.post : "Article"}</label>
                    <textarea
                        className="rounded-md w-full text-[#000] p-6" name="post" value={formik.values.post} id="post" cols="25" rows="30"
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
            </form>}
        </main>:
        <div className="w-full mt-36 flex justify-center items-center">
            <LoadingSpinner/>
        </div>
    )
}
