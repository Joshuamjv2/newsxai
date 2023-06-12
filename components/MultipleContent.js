import { Inter } from 'next/font/google'
import Layout from './layout'
import Authors from '@/components/Authors/Authors'
import { useState, useEffect } from 'react'
import NoItems from '@/components/NoItems'
import { authGetUpdateDeleteRequest } from './api/api'
import { url } from './api/url'

import UserContext from '@/contextapi/AuthAndUsers'
import { useContext } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function MultipleContent({children, title, add_item_text, path, missing_items_message}) {

    const [items, setItems] = useState([])
    const [noItems, setNoItems] = useState(null)

    useEffect(()=>{
        JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/${path}`, "GET").then(
            res => {
                setItems(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )
    }, [])

    // console.log(authors)

    return (
        <Layout title={title} add_item_text={add_item_text}>
            {items.length > 0 ? children : <NoItems no_items={noItems} text={missing_items_message}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
