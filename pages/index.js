"use client"
import { Inter } from 'next/font/google';

import Articles from '@/components/Articles/Articles';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import { useState, useEffect, useContext} from 'react';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';
import UserContext from '@/contextapi/AuthAndUsers';
import PopupLayout from '@/components/PopupLayout';
import AddItems from '@/components/AddItems/AddItems';


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    const [articles, setArticles] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, current_project, isAuth, setLoading, popup, tokens} = useContext(UserContext)

    

    useEffect(()=>{
        if (!loading){
        const project = current_project.id
        const access_token = tokens.access_token
        authGetUpdateDeleteRequest(`${url}/articles?project=${project}`, "GET", access_token).then(
            res => {
                console.log(res)
                setArticles(res)
                if (res.length < 1){
                    setNoItems(true)
                }
                setLoading(false)
            }
        )} else {
            console.log("No loading anymore")
            setLoading(false)
        }
    }, [current_project])

    // console.log(authors)

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
