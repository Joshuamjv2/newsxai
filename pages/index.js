import { Inter } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Articles from '@/components/Articles/Articles';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext} from 'react';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';
import UserContext from '@/contextapi/AuthAndUsers';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [articles, setArticles] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, current_project, isAuth, setLoading, tokens} = useContext(UserContext)

    useEffect(()=>{
        if (!loading){
        console.log(loading, "Loading .....")
        const project = current_project.id
        const access_token = tokens.access_token
        console.log(access_token)
        // const project = JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/articles?project=${project}`, "GET", access_token).then(
            res => {
                setArticles(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )} else {
            console.log("No loading anymore")
            setLoading(false)
        }
    }, [])

    // console.log(authors)

    return (
        <Layout title={"Articles"} add_item_text={"Add articles"}>
            {articles.length > 0 ? <Articles articles={articles} /> : <NoItems no_items={noItems} text={"You have not written any articles yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
