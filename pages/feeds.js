"use client"
import { Inter } from 'next/font/google';

import Feeds from '@/components/Feeds/Feeds';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext } from 'react';
import UserContext from '@/contextapi/AuthAndUsers';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';
import PopupLayout from '@/components/PopupLayout';
import FeedsForm from '@/components/Feeds/FeedsForm';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [feeds, setFeeds] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, popup, tokens, current_project, setLoading} = useContext(UserContext)

    setLoading(false)

    useEffect(()=>{
        if(!loading){
        const access_token = tokens.access_token
        const project = current_project.id
        authGetUpdateDeleteRequest(`${url}/rss_feeds?project=${project}`, "GET", access_token).then(
            res => {
                setFeeds(res)
                if (res.length < 1){
                    setNoItems(true)
                }
                setLoading(false)
            }
        )}
    }, [current_project])

    return (
        <Layout title={"RSS Feeds"} add_item_text={"Add Feeds"}>
            <PopupLayout active={popup} title={"Add Feeds"}>
                {/* <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} /> */}
                <FeedsForm />
            </PopupLayout>
            {feeds.length > 0 ? <Feeds feeds={feeds} /> : <NoItems no_items={noItems} text={"You have not added any feeds yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
