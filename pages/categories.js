import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import Categories from '@/components/Categories/Categories'
import { useState, useEffect, useContext } from 'react'
import NoItems from '@/components/NoItems'
import { authGetUpdateDeleteRequest } from './api/api'
import { url } from './api/url'
import UserContext from '@/contextapi/AuthAndUsers'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [categories, setCategories] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, tokens} = useContext(UserContext)

    useEffect(()=>{
        if(!loading){
        const access_token = tokens.access_token
        const project = JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/categories?project=${project}`, "GET", access_token).then(
            res => {
                setCategories(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )}
    }, [])


    return (
        <Layout title={"Categories"} add_item_text={"Add Categories"}>
            {categories.length > 0 ? <Categories categories={categories} /> : <NoItems no_items={noItems} text={"You have not added any categories yet!"}/>}
        </Layout>
    )
}

