import { Inter } from 'next/font/google'

import Sidebar from '@/components/Sidebar/Sidebar'
import Navigation from '@/components/Navigation/Navigation'
import Head from 'next/head'

import { useState, useContext, useEffect } from 'react'
import UserContext from '@/contextapi/AuthAndUsers'

import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

import ContentSection from './ContentSection'



export default function Layout({children, title, add_item_text}){
    const router = useRouter()
    const {login, init_auth, isAuth, userInfo, setIsAuth, current_project} = useContext(UserContext)

    // const handleLogin = () => {
    //     init_auth()
    // }

      const [params, setParams] = useState(null)

        if (params){
            let success = params.get("success")
            if (success){

                let user_id = params.get("id")
                login(user_id)
                setParams(null)
                window.history.replaceState(null, '', window.location.pathname);
            }
        }

        useEffect(() => {
          setParams((new URL(document.location)).searchParams)
          console.log(params, "search params")
            // if (!isAuth) {
            //   router.push({
            //       pathname: '/login',
            //       query: { returnUrl: router.asPath }
            //   });
            // }
        }, [])

        // useEffect(()=>{

        // }, [])

    return (
      isAuth &&
      <main>
        <Head>{title}</Head>
        <div className='flex'>
          <Sidebar />
          <div className='flex w-full pr-16 flex-col min-h-screen items-center justify-between px-8 right-0 left-60 pl-60'>
            <Navigation image={userInfo.picture} current_project={current_project} />
            <div className='mt-28 w-full border h-full mb-8 ml-16 border-transparent rounded-lg bg-[#191a1a] relative'>
            {/* main part of the page */}
            <ContentSection add_item_text={add_item_text}>
              {children}
            </ContentSection>
            </div>
          </div>
        </div>
      </main>
    )
}
