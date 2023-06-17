import { Inter } from 'next/font/google'
import Button from './button'
import { useContext } from 'react'
import UserContext from '@/contextapi/AuthAndUsers'



const inter = Inter({ subsets: ['latin'] })

export default function ContentSection({children, add_item_text}) {
    const {setPopup} = useContext(UserContext)

    return (
        <div className='p-4'>
            <div className='flex justify-between p-4'>
                <div></div>
                <div onClick={()=>setPopup(true)}>
                {add_item_text && <Button text={add_item_text} fa_icon={"plus"} />}
                </div>
            </div>
            {children}
        </div>
    )
}

// ssr authors, articles, feeds
