import { Inter } from 'next/font/google';
import Sites from '@/components/Sites/Sites';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import SitesForm from '@/components/Sites/SiteForm';
import PopupLayout from '@/components/PopupLayout';
import { useState, useEffect, useContext } from 'react';

import UserContext from '@/contextapi/AuthAndUsers';
import { authFetchData } from './api/api_with_axiso';


const inter = Inter({ subsets: ['latin'] })

export default function SitesPage() {

    const [sites, setSites] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {tokens, loading, popup, current_project, setLoading} = useContext(UserContext)

    setLoading(false)

    async function fetchSites(){
        try {
            const {data} = await authFetchData(tokens.access_token).get(`/sites?project=${current_project.id}`)
            setSites(data)
            if (data.length < 1){
                setNoItems(true)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response.status)
        }
    }

    useEffect(()=>{
        if(!loading){
        fetchSites()
    }
    }, [current_project])

    // console.log(authors)

    return (
        <Layout title={"Sites"} add_item_text={"Add Sites"}>
            <PopupLayout active={popup} title={"Add Category"}>
                {/* <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} />
                 */}
                <SitesForm />
            </PopupLayout>
            {sites.length > 0 ? <Sites sites={sites} /> : <NoItems no_items={noItems} text={"You have not added any sites yet!"}/>}
        </Layout>
    )
}

// ssr authors, articles, feeds
