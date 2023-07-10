import { useState, useEffect, useContext } from "react"
import axios from "axios"
import UserContext from "@/contextapi/AuthAndUsers"
import Button from "../button"
import Image from "next/image"
import LoadingSpinner from "../loadingSpinner"
import { useFormik } from "formik";
import * as Yup from "yup";
import { authFetchData } from "@/pages/api/api_with_axiso"
import { useRouter } from "next/router"

export default function ArticleImageSelector({article, setImageForm}){
    const [images, setImages] = useState([])
    const {setPopup, tokens} = useContext(UserContext)
    const [selected, setSelected] = useState("")
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            query: ""
        },
        onSubmit: (values) => get_images(values.query),

        validationSchema: Yup.object({
            query: Yup.string().required("Field is required")
        })
    })


    const updateImage = async (image) => {
        try {
            const {data} = await authFetchData(tokens.access_token).patch(`/articles/${article.id}`, {"image": image.urls.regular})
            router.reload(`/${article.id}`)
            setPopup(false)
        } catch (error) {
            console.log(error)
        }
    }
    const get_images = async (query = null) =>{
        try {
            const {data} = await axios.get(`https://api.unsplash.com/search/photos?client_id=GMjIKF6B77oLOgKe3ITnqXtZ5qcvhR3tSQiPk8a3kFk&query=${query ? query : 'maine'}&count=30&orientation=landscape`)
            setImages(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        get_images()
    }, [])

    return(
        <div className="px-8 relative">
            <h2 className="text-4xl font-bold mb-4 -mt-2 lg:w-1/2">Search Images from <br></br>Unsplash</h2>
            <div className="flex gap-4">
                <input
                    className="py-2 focus:outline-none px-4 bg-white text-black rounded-2xl lg:w-7/12"
                    type="text"
                    name="query"
                    placeholder="Search Images"
                    value={formik.values.query}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <button className="bg-[#ffc300] rounded-2xl px-4 text-black" type="submit" onClick={formik.handleSubmit}>Search</button>
            </div>
            <div className="mt-8">
                {!images ?
                    <div className="text-bold border"><LoadingSpinner /></div> :
                    <div className="grid gap-2 grid-cols-5">
                        {images.map(image=>
                            <div onClick={()=>setSelected(image)} className={`hover:scale-105 hover:duration-150 cursor-pointer ${selected.id == image.id && "border"}`} key={image.id}>
                                <Image src={image.urls.regular} height={300} width={250} alt={`${image.alt_description}`} />
                            </div>
                        )}
                    </div>
                }
            </div>
            <div className="mt-4 flex gap-4">
                <div onClick={()=>setPopup(false)}>
                    <Button text={"Close"} />
                </div>
                {selected &&
                    <div onClick={()=>updateImage(selected)}>
                        <Button text={"Set Image"} />
                    </div>
                }
            </div>
        </div>
    )
}