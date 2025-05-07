<script setup>
import { ref } from "vue"
import sidebarElement from "./components/list/Sidebar.vue"
import searchElement from "./components/list/Search.vue"
import mainlistElement from "./components/list/Mainlist.vue"
import controlsElement from "./components/list/Controls.vue"

const props = defineProps({
  data: Array
})

const keys = ref([])
const itemKeyDisplay = ref([])
const searchWords = ref([])
const checked = ref([])

let i = 0
for (const key in props.data[0]) {
    i++
    keys.value.push(key)
    itemKeyDisplay.value.push(i < 5 && i > 1 ? true : false)
    searchWords.value.push("")
    checked.value.push(false)
}

const filteredData = ref([])


const toggleBurger = () => {
    document.querySelector('.mainContainer').classList.toggle('sideOn')
}


</script>

<template>

    
<div class="container mainContainer">
    <figure @click="toggleBurger()" class="burger">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
    </figure>
    <div class="col-8 navPadding">
        <controlsElement :keys="keys" :itemKeyDisplay="itemKeyDisplay" />
        <mainlistElement :keys="keys" :filteredData="filteredData" :checked="checked" :itemKeyDisplay="itemKeyDisplay" />
        <searchElement @filterData="(newFd => {filteredData = newFd})" :searchWords="searchWords" :keys="keys" :data="props.data" :key="keys"/>
    </div>
    <sidebarElement :filteredData="filteredData" :keys="keys" :itemKeyDisplay="itemKeyDisplay" :checked="checked" :key="filteredData"/>
</div>

</template>

<style lang="sass" scoped>

svg
    fill: var(--second)

.navPadding
    padding-left: 60px

.col-8
    width: 100%
    min-height: calc(100vh - (var(--sameContextGap) * 2))

.burger
    position: fixed
    top: var(--sameContextGap)
    right: var(--sameContextGap)
    height: calc(var(--sameContextGap) * 1.5)
    width: calc(var(--sameContextGap) * 1.5)
    z-index: 10000
    cursor: pointer


</style>