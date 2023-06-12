import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Projects from '@/components/Projects/Projects'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
return (
    <Layout title={"Home"}>
        <div className='p-4'>
            <div className='flex justify-between p-4'>
                <div className=''></div>
                <div className="bg-[#ffc300] cursor-pointer text-[#000] text-center py-2 rounded-md px-8 hover:bg-[#fff] active:bg-[#fcc300]">
                        <div className="flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={["fas", "plus"]} size="12" />
                            <h3>Projects</h3>
                        </div>
                    </div>
            </div>
        <Projects />
        </div>
    </Layout>
    )
}

// ssr authors, articles, feeds
