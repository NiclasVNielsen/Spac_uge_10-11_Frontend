<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router'
import { id, username as un, role, rooms } from '@/data/token'

const router = useRouter()

const username = ref("")
const password = ref("")

const errorMessage = ref("")

const submit = () => {
    const verified = userFeedback()

    if(verified){
        CRUD.post("auth/login", {
            "username": username.value,
            "password": password.value
        })
        .then(async response => {
            if(!response.access_token){
                const enterElement = document.querySelector("#enter")
                enterElement.classList.remove("spinner")
                errorMessage.value = "Wrong Username or Password"
            }

            const userData = await CRUD.get("user/" + username.value)

            id.value = userData.id
            un.value = userData.username
            role.value = userData.role
            rooms.value = userData.chatrooms
            localStorage.setItem("userId", userData.id)
            localStorage.setItem("username", userData.username)
            localStorage.setItem("userRole", userData.role)
            localStorage.setItem("rooms", JSON.stringify(userData.chatrooms))

            router.push("/")
        })
    }
}

const userFeedback = () => {
    const usernameElement = document.querySelector("#username")
    const passwordElement = document.querySelector("#password")
    const enterElement = document.querySelector("#enter")

    usernameElement.classList.remove("warning")
    passwordElement.classList.remove("warning")
    enterElement.classList.remove("spinner")

    let pass = true
    if(username.value == ""){
        usernameElement.classList.add("warning")
        pass = false
    }
    if(password.value == ""){
        passwordElement.classList.add("warning")
        pass = false
    }

    if(pass)
        enterElement.classList.add('spinner')

    return pass
}

</script>

<template>
    <div class="container">
        <h2>
            Login
        </h2>
        <form class="shadow a">
            <div class="inputBox">
                <input type="text" id="username" v-model="username" @keydown.enter="submit()"> 
                <label for="username">Name</label>
            </div>
            <div class="inputBox">
                <input type="password" id="password" v-model="password" @keydown.enter="submit()">
                <label for="password">Password</label>
            </div>
            <div class="linkBox" id="enter" @click="submit()">
                Enter!
            </div>
        </form>
        <p class="textBox">
            <router-link to="/signup">Sign up</router-link>
        </p>
        <p class="warning" :class="{on: errorMessage != ''}">
            {{ errorMessage }}
        </p>
    </div>
</template>

<style lang="sass" scoped>

.container
    justify-content: center
    align-items: center
    min-height: 100vh
    flex-direction: column

h2
    text-align: center
    color: var(--prim)

form, h2
    max-width: calc(var(--differentContextGap) * 10 + (var(--sameContextGap) * 2))
    padding: var(--sameContextGap)

.textBox
    text-align: center
    max-width: calc(var(--differentContextGap) * 10 + (var(--sameContextGap) * 2))
    padding-top: var(--sameContextGap)

.warning
    color: var(--warning)
    position: fixed
    bottom: var(--sameContextGap)
    left: var(--sameContextGap)
    padding: var(--containerPadding) calc(var(--containerPadding) * 1.8)
    display: inline-block
    width: auto
    border: solid var(--borderSize) var(--warning)
    border-radius: var(--borderRadius)
    margin: 0
    transition: var(--quickTransition)
    opacity: 0
    &.on
        opacity: 1
</style>