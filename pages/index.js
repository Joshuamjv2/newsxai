"use client"
import { Inter } from 'next/font/google';

import Articles from '@/components/Articles/Articles';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext} from 'react';

import UserContext from '@/contextapi/AuthAndUsers';
import { authFetchData } from './api/api_with_axiso';

import useSWR from "swr";



const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    const [articles, setArticles] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, current_project, isAuth, setLoading, popup, tokens} = useContext(UserContext)

    setLoading(false)

    async function fetchArticles(url){
        try {
            const {data} = await authFetchData(tokens.access_token).get(url)
            setArticles(data)
            if (data.length < 1){
                setNoItems(true)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (!loading){
            fetchArticles(`/articles?project=${current_project.id}`)
        }
    }, [current_project])

    const {data, error} = useSWR(current_project ? `/articles?project=${current_project.id}` : null, fetchArticles)


    return (
        <Layout title={"Articles"}>
            {/* <PopupLayout active={popup} title={"Add Articles"}>
                <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} />
            </PopupLayout> */}
            {articles.length > 0 ? <Articles articles={articles} /> : <NoItems no_items={noItems} text={"You have not written any articles yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
