import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RouteGuard({children, is_authenticated}){
    const router = useRouter()

    useEffect(()=>{
        authCheck(router.asPath);
    })

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!is_authenticated && !publicPaths.includes(path)) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            console.log("Authenticated")
        }
    }

    return children
}
