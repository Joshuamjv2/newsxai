import { Inter } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Feeds from '@/components/Feeds/Feeds';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext } from 'react';
import UserContext from '@/contextapi/AuthAndUsers';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [feeds, setFeeds] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, current_project, isAuth, setLoading, tokens} = useContext(UserContext)

    useEffect(()=>{
        if(!loading){
        const access_token = tokens.access_token
        const project = JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/rss_feeds?project=${project}`, "GET", access_token).then(
            res => {
                setFeeds(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )}
    }, [])

    // console.log(authors)

    return (
        <Layout title={"RSS Feeds"} add_item_text={"Add Feeds"}>
            {feeds.length > 0 ? <Feeds feeds={feeds} /> : <NoItems no_items={noItems} text={"You have not added any feeds yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
