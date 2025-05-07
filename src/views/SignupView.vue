<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const username = ref("")
const password = ref("")
const password2 = ref("")

const errorMessage = ref("")

const submit = () => {
    const verified = userFeedback()

    if(verified){
        CRUD.update("auth/register", {
            "username": username.value,
            "password": password.value
        })
        .then(response => {
            if(response.access_token)
                router.push("/")
            else{
                const enterElement = document.querySelector("#enter")
                enterElement.classList.remove("spinner")
                errorMessage.value = "Wrong Username or Password"
            }
        })
    }
}

const userFeedback = () => {
    const usernameElement = document.querySelector("#username")
    const passwordElement = document.querySelector("#password")
    const password2Element = document.querySelector("#password2")
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
    if(password2.value == ""){
        password2Element.classList.add("warning")
        pass = false
    }
    if(password.value != password2.value){
        passwordElement.classList.add("warning")
        password2Element.classList.add("warning")
        pass = false
        errorMessage.value = "Passwords doesn't match"
    }

    if(pass)
        enterElement.classList.add('spinner')

    return pass
}

</script>

<template>
    <div class="container">
        <h2>
            Sign up
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
            <div class="inputBox">
                <input type="password" id="password2" v-model="password2" @keydown.enter="submit()">
                <label for="password2">Repeat Password</label>
            </div>
            <div class="linkBox" id="enter" @click="submit()">
                Enter!
            </div>
        </form>
        <p class="textBox">
            <router-link to="/login">Login</router-link>
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