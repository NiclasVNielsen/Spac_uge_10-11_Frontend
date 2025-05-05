<script setup>


const props = defineProps({
    keys: Array,
    itemKeyDisplay: Array
})


</script>


<template>

<div class="container showCheckboxes shadow b">
    <div v-for="(key, index) in props.keys" :key="props.keys">
        <input type="checkbox" :id="key + 'show'" v-model="props.itemKeyDisplay[index]">
        <label :for="key + 'show'">{{ key }}</label>
    </div>
</div>
<div class="container border b tableHeading">
    <div>
        <input type="checkbox" id="selectAll">
        <label for="selectAll" class="border a"></label>
    </div>
    <template v-for="(key, index) in props.keys" :key="props.keys">
        <p v-if="props.itemKeyDisplay[index]">
            {{ key }}
        </p>
    </template>
    <p>
        Controls
    </p>
</div>

</template>


<style lang="sass" scoped>


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

.tableHeading
    display: flex
    flex-wrap: nowrap
    >div
        width: auto
        margin-right: var(--sameContextGap)
    p
        margin-bottom: 0
        padding-right: var(--sameContextGap)
    input
        width: auto
        margin-bottom: 0
        display: none
        &:checked
            + label::after
                content: "x"
                font-weight: bold
                font-size: 1.2em
    label.border.a
        width: 1.5rem
        height: 1.5rem
        padding: 0
        display: flex
        align-items: center
        justify-content: center

</style>