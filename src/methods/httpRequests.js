/*
    This file holds short hand methods for all the http requests
    
    run api: dotnet run -p Lagersystem
*/

import { token } from "@/data/token"


const baseUrl = "http://192.168.20.222:3000/api/v1/"


export function get (urlEnding) {
    const url = baseUrl + urlEnding
    return new Promise ((res, rej) => {
        try {
            fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                response.json().then(data => {
                    if(response.error)
                        console.error("🔥", response.error)

                    res(data)
                })
            })
        } catch (error) {
            rej(error)
        }
    })
}

export function update (urlEnding, body) {
    const url = baseUrl + urlEnding
    return new Promise((res, rej) => {
        try {
            fetch(url, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token.value}` 
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if(response.error)
                    console.error("🔥", response.error)

                response.json().then(data => {
                    if(data.access_token)
                        token.value = data.access_token

                    res(data)
                })
            })
        } catch (error) {
            rej(error)
        }
    })
}

export function post (urlEnding, body) {
    const url = baseUrl + urlEnding
    return new Promise((res, rej) => {
        try {
            fetch(url, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token.value}`
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if(response.error)
                    console.error("🔥", response.error)

                response.json().then(data => {
                    if(data.access_token)
                        token.value = data.access_token

                    res(data)
                })
            })
        } catch (error) {
            rej(error)
        }
    })
}

export function remove (urlEnding, body) {
    const url = baseUrl + urlEnding
    return new Promise((res, rej) => {
        try {
            fetch(url, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token.value}`
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if(response.error)
                    console.error("🔥", response.error)

                response.json().then(data => {
                    if(data.access_token)
                        token.value = data.access_token

                    res(data)
                })
            })
        } catch (error) {
            rej(error)
        }
    })
}