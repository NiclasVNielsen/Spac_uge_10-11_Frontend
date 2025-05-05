<script setup>

import { useRouter } from "vue-router"

const router = useRouter()



const props = defineProps({
    filteredData: Array,
    keys: Array,
    checked: Array,
    itemKeyDisplay: Array
})


const redirect = (path) => {
    router.push(path)
}
</script>


<template>

<ol class="mainList">

    <li class="shadow b" v-for="(item, index) in props.filteredData" :key="index">
        <div>
            <input type="checkbox" :id="index + 'item'" v-model="props.checked[index]">
            <label :for="index + 'item'" class="border a"></label>
        </div>
        <template v-for="(key, index) in props.keys" :key="index">
            <div v-if="itemKeyDisplay[index]">
                {{ item[key] }}
            </div>
        </template>
        <div class="controls">
            <div class="linkBox" @click="redirect('messages/' + item[props.keys[0]])">
                Edit
            </div>
            <div class="linkBox warning" @click="function (e) { e.srcElement.classList.toggle('spinner') }">
                Delete
            </div>
        </div>
    </li>

</ol>

</template>


<style lang="sass" scoped>

ol
    list-style: none
    width: 100%
    li
        padding: var(--sameContextGap)
        width: 100%
        display: flex
        border: solid 3px transparent
        align-items: center
        >div
            width: 100%
            margin-right: var(--sameContextGap)
            &:first-of-type
                width: auto
        input
            width: auto
            margin-bottom: 0
            display: none
            &:checked
                + label::after
                    opacity: 1 !important
        label.border.a
            width: 1.5rem
            height: 1.5rem
            padding: 0
            display: flex
            align-items: center
            justify-content: center
            &::after
                font-weight: bold
                font-size: 1.2em
                display: block
                margin-top: -2px
                content: "x"
                opacity: 0
                transition: var(--quickTransition)
            &:hover::after
                opacity: 0.5

.mainList
    .controls
        display: flex
        .linkBox
            padding: calc(var(--sameContextGap) / 2)
            max-width: calc(var(--sameContextGap) * 10)
            &:first-of-type
                margin-right: var(--sameContextGap)


.navPadding
    padding-left: 60px

.col-8
    position: relative
    transition: var(--quickTransition)
    width: 100%
    min-height: calc(100vh - (var(--sameContextGap) * 2))

.sideOn
    .col-8
        width: 66.666%

</style>