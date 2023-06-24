"use client"
import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import Authors from '@/components/Authors/Authors'
import { useState, useEffect, useContext } from 'react'
import UserContext from '@/contextapi/AuthAndUsers'
import NoItems from '@/components/NoItems'
import AuthorForm from '@/components/Authors/AuthorForm'
import PopupLayout from '@/components/PopupLayout'
import { authFetchData } from './api/api_with_axiso'

const inter = Inter({ subsets: ['latin'] })

export default function AuthorsPage() {

    const [authors, setAuthors] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, tokens, popup, current_project, setLoading} = useContext(UserContext)

    setLoading(false)

    async function fetchAuthors(){
        try {
            const {data} = await authFetchData(tokens.access_token).get(`/authors?project=${current_project.id}`)
            setAuthors(data)
            if (data.length < 1){
                setNoItems(true)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response.status)
        }
    }
    useEffect(()=>{
        if (!loading){
            fetchAuthors()
        }
    }, [current_project])

    // console.log(authors)

    return (
        <Layout title={"Authors"} add_item_text={"Add Authors"}>
            <PopupLayout active={popup} title={"Add Author"}>
                {/* <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} />
                 */}
                <AuthorForm />
            </PopupLayout>
            {authors.length > 0 ? <Authors authors={authors} /> : <NoItems no_items={noItems} text={"You have not registered any authors yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
