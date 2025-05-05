<script setup>

const props = defineProps({
    filteredData: Array,
    keys: Array,
    itemKeyDisplay: Array,
    checked: Array
})

</script>

<template>

<div class="col-4 shadow l sideBar">
    <ol>
        <template v-for="(item, index) in props.filteredData" :key="index">
            <li class="shadow b" v-if="checked[index]">
                <div>
                    <input type="checkbox" :id="index + 'item'" v-model="checked[index]">
                    <label :for="index + 'item'" class="border a"></label>
                </div>
                <div class="dataContainer">
                    <template v-for="(key, index) in props.keys" :key="index">
                        <div v-if="props.itemKeyDisplay[index]">
                            {{ item[key] }}
                        </div>
                    </template>
                </div>
            </li>
        </template>    
    </ol>
    <div class="controls">
        <div class="linkBox" @click="function (e) { e.srcElement.classList.toggle('spinner') }">
            Edit
        </div>
        <div class="linkBox warning" @click="function (e) { e.srcElement.classList.toggle('spinner') }">
            Delete
        </div>
    </div>
</div>

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

.sideBar
    position: relative
    transition: var(--quickTransition)
    position: fixed
    right: 0
    top: 0
    background: var(--neutral)
    transform: translateX(100%)
    height: 100vh
    padding: var(--sameContextGap) 0
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-wrap: nowrap
    ol
        overflow-y: scroll
        margin-top: var(--sameContextGap)
        height: calc(100vh - (var(--sameContextGap) * 4) - 59px)
        li
            .dataContainer
                div
                    margin-bottom: var(--sameContextGap)
                    &:last-of-type
                    margin-bottom: 0
    .controls
        display: flex
        padding: 0 var(--sameContextGap)
        .linkBox
            &:first-of-type
                margin-right: var(--sameContextGap)

.showCheckboxes
    display: flex
    flex-wrap: wrap
    padding: 0
    border: solid 3px transparent
    div
        display: flex
        width: auto
        padding: calc(var(--sameContextGap) / 2) var(--sameContextGap)
        input
            width: auto
            margin: 0
            display: none
            &:checked
                + label
                    color: var(--prim)
        label
            display: flex
            align-items: center

.sideOn
    .col-4
        transform: translateX(0)

</style>