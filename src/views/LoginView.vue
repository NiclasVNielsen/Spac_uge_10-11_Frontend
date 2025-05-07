<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router'
import { id, username as un, role } from '@/data/token'

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
        <p class="textBox warning" v-if="errorMessage != ''">
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
</style>