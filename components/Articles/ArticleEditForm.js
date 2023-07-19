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
    const [categories, setCategories] = useState([])
    const[showForm, setShowForm] = useState(false)
    const router = useRouter()

    async function updateArticle(id, article){
        setSpin(true)
        try {
            const {data} = await authFetchData(tokens.access_token).patch(`/articles/${id}`, article)
            // setPopup(false)
            router.reload(router.asPath)
        } catch (error) {
            console.log(error.response.status)
            setSpin(false)
        }
    }

    async function setDropdown(){
        try {
            if (post.project){
            const project = post.project
            let authors_res = await authFetchData(tokens.access_token).get(`/authors?project=${project}`)
            let categories_res = await authFetchData(tokens.access_token).get(`/categories?project=${project}`)

            if (!post.author){
                authors_res.data = [{"id": "default", "first_name": "Select", "last_name": "author"}].concat(authors_res.data)
            }
            if (!post.category){
                categories_res.data = [{"id": "default", "name": "Select category"}].concat(categories_res.data)
            }


            setAuthors(authors_res.data)
            setCategories(categories_res.data)
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
            author: post.author || authors.length > 0 && `${authors[0].first_name} ${authors[0].last_name}` || "",
            category: post.category || categories.length > 0 && categories[0].name || ""
        },
        onSubmit: (values) => updateArticle(post.id, values),

        validationSchema: Yup.object({
            post: Yup.string().required("First Name is required").min(100, "A minimum of 100 characters is required").optional(),
            title: Yup.string().required("Last Name is required"),
            author: Yup.string(),
            category: Yup.string()
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
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {authors.map(author=><option className="py-2 px-2" key={author.id}>{`${author.first_name} ${author.last_name}`}</option>)}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {categories.map(category=><option className="py-2 px-2" key={category.id}>{category.name}</option>)}
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
