"use client"
import { Inter } from 'next/font/google';

import Feeds from '@/components/Feeds/Feeds';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext } from 'react';
import UserContext from '@/contextapi/AuthAndUsers';
import { authFetchData } from './api/api_with_axiso';
import PopupLayout from '@/components/PopupLayout';
import FeedsForm from '@/components/Feeds/FeedsForm';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [feeds, setFeeds] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, popup, tokens, current_project, setLoading} = useContext(UserContext)

    setLoading(false)

    async function fetchFeeds(){
        console.log(current_project, "current_project")
        try {
            const {data} = await authFetchData(tokens.access_token).get(`/rss_feeds?project=${current_project.id}`)
            console.log(data)
            setFeeds(data)
            if (data.length < 1){
                setNoItems(true)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response.status) // popup error window with message based on status code
        }
    }

    useEffect(()=>{
        if(!loading){
            fetchFeeds()
        }
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
