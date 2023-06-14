import { Inter } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Sites from '@/components/Sites/Sites';
import Layout from '../components/layout';
import NoItems from '@/components/NoItems';

import SitesForm from '@/components/Sites/SiteForm';
import PopupLayout from '@/components/PopupLayout';
import { useState, useEffect, useContext } from 'react';

import { authGetUpdateDeleteRequest } from './api/api';
import { url } from './api/url';
import UserContext from '@/contextapi/AuthAndUsers';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [sites, setSites] = useState([])
    const [noItems, setNoItems] = useState(false)
    const {tokens, loading, popup, current_project} = useContext(UserContext)

    useEffect(()=>{
        if(!loading){
        const access_token = tokens.access_token
        const project = JSON.parse(localStorage.getItem("current_project")).id
        authGetUpdateDeleteRequest(`${url}/sites?project=${project}`, "GET", access_token).then(
            res => {
                setSites(res)
                if (res.length < 1){
                    setNoItems(true)
                }
            }
        )}
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
