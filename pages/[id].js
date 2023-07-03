import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import { useState, useEffect, useContext } from 'react'
import UserContext from '@/contextapi/AuthAndUsers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArticleEditForm from '@/components/Articles/ArticleEditForm'

import Moment from 'react-moment'

import { useRouter } from 'next/router'

import Button from '@/components/button'
import LoadingSpinner from '@/components/loadingSpinner'
import { authFetchData } from './api/api_with_axiso'

const inter = Inter({ subsets: ['latin'] })

export default function DetailPage() {
    const {loading, tokens, popup, setPopup, setLoading} = useContext(UserContext)
    const router = useRouter();
    const [article, setArticle] = useState(null)
    const { id } = router.query;

    useEffect(()=>{
        // setLoading(false)
        if (!loading){
            getSingleArticle()
        }
    }, [])

    const clickEdit = () => {
        setPopup(true)
        console.log(popup)
    }

    const handleDelete = async () => {
        try {
            await authFetchData(tokens.access_token).delete(`/articles/${article.id}`)
            router.push("/")
        } catch (error) {
            console.log(error.response.status)
        }
    }

    async function getSingleArticle(){
        try {
            const {data} = await authFetchData(tokens.access_token).get(`/articles/${id}`)
            setArticle(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout title={"Article"}>
            {article ?
                <div>
                {popup === true ?
                    <ArticleEditForm post={article} />
                    :
                    <div className='mx-8'>
                        <h1 className='text-3xl font-bold text-[#ffc300] capitalize mb-2 lg:w-1/2'>{article.title}</h1>
                        <div className='flex items-center justify-between text-[#616060]'>
                            <div className='flex gap-2 items-center mb-2 text-lg'>
                                <FontAwesomeIcon icon={["fas", "person"]} color='#616060' />
                                <p className='text-md'>{article.author ? article.author : "Not Set"}</p>
                            </div>
                            <div><Moment format="DD/MM/YYYY">{article.created}</Moment></div>
                        </div>
                        <p className='lg:w-11/12'>
                            {article.article}
                        </p>
                        <div className='flex justify-between mt-8 mb-8'>
                            <div className='flex gap-4 items-center'>
                            </div>
                                <div className='flex gap-12'>
                                    <div onClick={clickEdit}>
                                        <Button text={"Edit"} fa_icon={"pen"} />
                                    </div>
                                    {!article.published && <button className="">
                                    <div className={`text-[#000] cursor-pointer text-center bg-[#55a630] py-2 rounded-md hover:bg-[#fff] active:bg-[#fcc300] px-6`}>
                                        <div className="flex items-center justify-center gap-2">
                                            <FontAwesomeIcon icon={["fas", "rocket"]} size="12" />
                                            <h3 className="capitalize">Publish</h3>
                                        </div>
                                    </div>
                                </button>}
                                <button onClick={handleDelete} className="">
                                    <div className={`text-[#000] cursor-pointer text-center bg-[#d00000] py-2 rounded-md hover:bg-[#fff] active:bg-[#fcc300] px-6`}>
                                        <div className="flex items-center justify-center gap-2">
                                            <FontAwesomeIcon icon={["fas", "trash"]} size="12" />
                                            <h3 className="capitalize">Delete</h3>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            :
            <div className='w-full flex justify-center mt-36'>
                <LoadingSpinner />
            </div>
            }
        </Layout>
    )
}
// ssr authors, articles, feeds
