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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '@/components/button'

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
        // <Layout title={"Authors"} add_item_text={"Add Authors"}>
        //     <PopupLayout active={popup} title={"Add Author"}>
        //         {/* <AddItems items={[{name: "Joshua and longer"}, {name: "Joshua"}, {name: "Joshua"}]} />
        //          */}
        //         <AuthorForm />
        //     </PopupLayout>
        //     {authors.length > 0 ? <Authors authors={authors} /> : <NoItems no_items={noItems} text={"You have not registered any authors yet!"}/>}
        // </Layout>


        // testing article detail

        <Layout title={"Authors"} add_item_text={"Add Authors"}>
            <div className='mx-4'>
                <h1 className='text-3xl font-bold text-[#ffc300] capitalize mb-2'>This is the title</h1>
                <div className='flex items-center justify-between text-[#616060]'>
                    <div className='flex gap-2 items-center mb-2 text-lg'>
                        <FontAwesomeIcon icon={["fas", "person"]} color='#616060' />
                        <p className='text-md'>Joshua Bryant</p>
                    </div>
                    <div>Thur, 09 2023</div>
                </div>
                <p className='text-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque facere quibusdam adipisci iste necessitatibus sed temporibus, sint inventore magnam assumenda, soluta a voluptates dolor, sapiente suscipit odit? Quia modi doloremque repellat veritatis! Fuga aperiam repellat accusamus aliquam, fugit natus perferendis maxime fugiat quis hic quas suscipit voluptatibus iste provident.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil corporis obcaecati in deserunt similique, sapiente pariatur, earum voluptatibus quae aliquam temporibus, labore delectus dolor ex fuga reiciendis accusamus consequuntur ullam eum suscipit totam voluptas libero? Harum ullam deleniti delectus atque?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo explicabo, velit earum, omnis asperiores voluptatibus, temporibus voluptatem alias enim corporis delectus eligendi commodi vero itaque maxime ea voluptate aperiam aliquam fugit. Illo culpa, quas nisi eaque similique corrupti mollitia sequi voluptatum nam asperiores eius quae quo aperiam, modi, facere fuga vel. Dolor magni ducimus odit illo mollitia repudiandae at distinctio consequuntur, ut beatae quis dolore necessitatibus, incidunt consectetur? Asperiores hic vero mollitia, quasi quas sit earum placeat minima unde magni temporibus error, maxime repellendus quis! Iste non ratione quisquam et incidunt minus accusamus atque eum laborum consequuntur, provident accusantium?
                </p>
                <div className='flex justify-between mt-4 mb-8'>
                    <div className='flex gap-4 items-center'>
                        <Button text={"Assign author"} fa_icon={"person"} />
                        <Button text={"Assign Site"} fa_icon={"globe"} />
                    </div>
                        <div className='flex gap-12'>
                        <Button text={"Edit"} fa_icon={"pen"} />
                        <button className="">
                            <div className={`text-[#000] cursor-pointer text-center bg-[#55a630] py-2 rounded-md hover:bg-[#fff] active:bg-[#fcc300] px-6`}>
                                <div className="flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={["fas", "rocket"]} size="12" />
                                    <h3 className="capitalize">Publish</h3>
                                </div>
                            </div>
                        </button>
                        <button className="">
                            <div className={`text-[#000] cursor-pointer text-center bg-[#d00000] py-2 rounded-md hover:bg-[#fff] active:bg-[#fcc300] px-6`}>
                                <div className="flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={["fas", "trash"]} size="12" />
                                    <h3 className="capitalize">Delete</h3>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

// ssr authors, articles, feeds
