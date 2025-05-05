<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import { ref } from "vue"


</script>

<template>
    <div class="container">
        <h2>
            Login
        </h2>
        <form class="shadow a">
            <div class="inputBox">
                <input type="email">
                <label for="">Email</label>
            </div>
            <div class="inputBox">
                <input type="password">
                <label for="">Password</label>
            </div>
            <div class="linkBox">
                Click me! I do stuff 3:
            </div>
        </form>
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

</style>