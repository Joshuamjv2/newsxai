"use client"
import { Inter } from 'next/font/google';

import APIKeys from '@/components/APIKeys/APIKeys';
import APIKeyForm from '@/components/APIKeys/APIKeyForm';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';


import PopupLayout from '@/components/PopupLayout';

import { useState, useEffect, useContext} from 'react';

import UserContext from '@/contextapi/AuthAndUsers';
import { authFetchData } from './api/api_with_axiso';
import LoadingSpinner from '@/components/loadingSpinner';



const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    const [apiKeys, setApiKeys] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, current_project, isAuth, setLoading, popup, tokens, userInfo} = useContext(UserContext)

    setLoading(false)

    async function fetchArticles(){
        try {
            const {data} = await authFetchData(tokens.access_token).get(`/auth/api-key/${userInfo.id}`)
            setApiKeys(data)
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
            fetchArticles()
        }
    }, [current_project])


    return (
        <Layout title={"Settings"} add_item_text={"Add API Key"}>
            <PopupLayout active={popup} add_item_text={"Add API Key"}>
                <APIKeyForm />
            </PopupLayout>
            {apiKeys.length > 0 ? <APIKeys api_keys={apiKeys} /> : <NoItems no_items={noItems} text={"You don't have any API Keys"} />}
        </Layout>
    )
}

// ssr authors, articles, feeds
