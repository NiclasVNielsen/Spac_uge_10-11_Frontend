/*
    This file holds short hand methods for all the http requests
    
    run api: dotnet run -p Lagersystem
*/

const baseUrl = "http://localhost:3000/api/v1/"


export function get (urlEnding) {
    const url = baseUrl + urlEnding
    return new Promise ((res, rej) => {
        try {
            fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
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
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            .then(response => {
                
                if(response.status > 199 && response.status < 300)
                    console.log("^^")
                else
                    console.error("🔥")
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
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            .then(response => {
                
                if(response.status > 199 && response.status < 300)
                    console.log("^^")
                else
                    console.error("🔥")

                res(response.status)
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
                headers: { "Content-Type": "application/json" },
                credentials: 'include', 
                body: JSON.stringify(body)
            })
            .then(response => {
                if(response.status > 199 && response.status < 300)
                    console.log("^^")
                else
                    console.error("🔥")

                res(response.status)
            })
        } catch (error) {
            rej(error)
        }
    })
}