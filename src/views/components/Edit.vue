<script setup>

import { ref } from "vue"

const props = defineProps({
  data: Object
})

const keys = ref([])

let i = 0
for (const key in props.data) {
    i++
    keys.value.push(key)
}

const submit = () => {
    
}

</script>


<template>

<div class="container mainContainer">
    
    <div class="container">
        <h2>
            Edit
        </h2>
        <form class="shadow a">
            <div class="inputBox" v-for="(key, index) in keys" :key="keys">
                <input type="text" :id="index + props.data[key]" v-model="props.data[key]" @keydown.enter="submit()"> 
                <label :for="index + props.data[key]">{{key}}</label>
            </div>
            <div class="linkBox" id="enter" @click="function (e) { e.srcElement.classList.toggle('spinner'), submit() }">
                Enter!
            </div>
        </form>
    </div>
    
</div>

</template>


<style lang="sass" scoped>

.mainContainer
    padding: var(--sameContextGap) 60px


.container
    justify-content: center
    align-items: center
    min-height: calc(100vh - (var(--sameContextGap) * 4))
    flex-direction: column

h2
    text-align: center
    color: var(--prim)

form, h2
    max-width: calc(var(--differentContextGap) * 10 + (var(--sameContextGap) * 2))
    padding: var(--sameContextGap)


</style>