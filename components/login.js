"use client"
import Head from "next/head"
import Button from "@/components/button"
import { useContext, useEffect, useState } from "react"
import UserContext from "@/contextapi/AuthAndUsers"
import { useRouter } from "next/router"
import LoadingSpinner from "@/components/loadingSpinner"

export default
function Login(){
    const {isAuth, init_auth} = useContext(UserContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        init_auth()
        setLoading(true)
    }

    // useEffect(()=>{
    //     authCheck(router.asPath);
    // }, [isAuth])

    // function authCheck(url) {
    //     if (isAuth) {
    //         router.push({
    //             pathname: "/"
    //         });
    //     }
    // }

    return  (
    <main>
        <Head>
            <title>Login</title>
        </Head>
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-5xl font-bold uppercase text-[#fcc300]'>Welcome to NewsX AI</h1>
                <p className='text-xl my-4 text-[#9e9e9e]'>Please login to access your dashboard.</p>
                <div className='flex w-full justify-center' onClick={handleLogin}>
                    {loading ? <LoadingSpinner/> : <Button text={"Login"} fa_icon={"key"}/>}
                </div>
            </div>
        </div>
    </main>

    )
}
