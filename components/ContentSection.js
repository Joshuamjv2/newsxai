import { Inter } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './button'



const inter = Inter({ subsets: ['latin'] })

export default function ContentSection({children, add_item_text}) {

    return (
        <div className='p-4'>
            <div className='flex justify-between p-4'>
                <div></div>
                <Button text={add_item_text} fa_icon={"plus"} />
            </div>
            {children}
        </div>
    )
}

// ssr authors, articles, feeds
