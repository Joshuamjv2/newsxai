import { url } from "./url";

export async function getUpdateDeleteRequest(req_url, method_name, request_headers) {
        // Default options are marked with *
        const response = await fetch(req_url, {
        method: method_name, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: request_headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
    return response.json();
  }


export async function postRequest(req_url, body, request_headers = {"Content-Type": "application/json"}){
    const response = await fetch(req_url, {
        method: "POST",
        headers: request_headers,
        body: body
    })
    return response.json()
}


export function getAccessToken(){
    return JSON.parse(localStorage.getItem("token")).access_token;
}

export function getRefreshToken(){
      return JSON.parse(localStorage.getItem("token")).refresh_token
}

export function getUserId(){
  return JSON.parse(localStorage.getItem("user")).user_id
}

export function geTokenExpiry(){
  return JSON.parse(localStorage.getItem("token")).expires
}

// calling protected routes GET, Update, Delete
export async function authGetUpdateDeleteRequest(req_url, method_name, access_token, request_headers={
  "Content-type": "application/json",
  "Authorization": `Bearer ${access_token}`
}) {
        const current_expiry_time = geTokenExpiry()
        const determine_renew_token = new Date().toISOString() > current_expiry_time
        determine_renew_token && refresh_tokens()
        console.log(determine_renew_token, current_expiry_time, "Determine renew")

        // Default options are marked with *
        const response = await fetch(req_url, {
        method: method_name, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: request_headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
    return response.json();
  }



export async function refresh_tokens(){
        const user_id = JSON.parse(localStorage.getItem("user")).id
        const refresh_token = JSON.parse(localStorage.getItem("token")).refresh_token
        getUpdateDeleteRequest(`${url}/auth/refresh?user_id=${user_id}&refresh_token=${refresh_token}`, "GET").then(res=>{
          console.log(res, "Res from refresh")
          if (res.access_token == undefined){
            localStorage.setItem("authenticated", "false")
            // localStorage.clear()
          } else {
            localStorage.setItem("token", JSON.stringify(setTokenExpiry(res)))
          }
        })
    }



export function addSeconds(seconds) {
  const date = new Date()
  seconds = seconds - 300
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}


export function setTokenExpiry(token_response){
  token_response.expires = addSeconds(token_response.expires)
  return token_response
}


// async function
