import { Inter } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Articles from '@/components/Articles/Articles';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext } from 'react';
import UserContext from '@/contextapi/AuthAndUsers';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [articles, setArticles] = useState([])
    const [noItems, setNoItems] = useState(false)

    useEffect(()=>{
        const project = JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/articles?project=${project}`, "GET").then(
            res => {
                setArticles(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )
    }, [])

    // console.log(authors)

    return (
        <Layout title={"Articles"} add_item_text={"Add articles"}>
            {articles.length > 0 ? <Articles authors={articles} /> : <NoItems no_items={noItems} text={"You have not written any articles yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
