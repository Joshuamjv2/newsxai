import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import Authors from '@/components/Authors/Authors'
import { useState, useEffect, useContext } from 'react'
import UserContext from '@/contextapi/AuthAndUsers'
import NoItems from '@/components/NoItems'
import { authGetUpdateDeleteRequest } from './api/api'
import { url } from './api/url'
import AuthorForm from '@/components/Authors/AuthorForm'
import PopupLayout from '@/components/PopupLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [authors, setAuthors] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {loading, tokens, popup, current_project} = useContext(UserContext)

    useEffect(()=>{
        if (!loading){

        const project = JSON.parse(localStorage.getItem("current_project")).id
        const access_token = tokens.access_token
        authGetUpdateDeleteRequest(`${url}/authors?project=${project}`, "GET", access_token).then(
            res => {
                setAuthors(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )}
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
