<script setup>

const props = defineProps({
    data: Array,
    filteredData: Array,
    searchWords: Array,
    keys: Array
})

const search = () => {
    props.filteredData.value = []

    props.data.filter(
        (item) => {
            let passFilter = true

            let i = 0
            for(const key in item){
                if(!`${item[key]}`.toLowerCase().includes(props.searchWords[i].toLowerCase()))
                    passFilter = false
                i++
            }
            
            if(passFilter)
                props.filteredData.value.push(item)
        }
    )
}

search()

const toggleSearches = (forceMode = null) => {
    const container = document.querySelector('.searchFieldsContainer')

    const currentlyOn = container.classList.contains('on')

    if(!forceMode)
        container.classList.toggle('on')
        if(currentlyOn)
            search()


    if(forceMode == "off"){
        if(currentlyOn)
            container.classList.toggle('on')
    }
    if(forceMode == "on"){
        if(!currentlyOn)
            container.classList.toggle('on')
    }
}

</script>

<template>
    <div class="searchPanel">
        <div class="alignment">
            <div class="linkBox" @click="function(e) { toggleSearches(), e.srcElement.classList.toggle('on')}">
                Search
            </div>
            <div class="searchFieldsContainer">
                <template v-for="(key, index) in keys" :key="keys">
                    <div class="container border searchInputs">
                        <label for="">
                            {{ key }}
                        </label>
                        <input type="text" v-model="searchWords[index]">
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>


.searchPanel
    position: fixed
    z-index: 100
    bottom: 0
    left: 0
    padding: var(--sameContextGap)
    transition: var(--quickTransition)
    .alignment
        position: relative
        width: 100%
        padding-right: var(--sameContextGap)
        padding-left: 60px
        justify-content: flex-end
        display: flex
        transition: var(--quickTransition)
        .linkBox
            width: auto
        .searchFieldsContainer
            overflow-y: scroll
            max-height: 100vh
            width: calc(100% - (6px + (var(--sameContextGap) * 4.6) + 60px))
            padding-left: 60px
            margin-right: calc(6px + (var(--sameContextGap) * 4.6) + 60px)
            position: absolute
            bottom: 0
            margin-bottom: calc(1 - var(--sameContextGap))
            transform: translateY(calc(100% + var(--sameContextGap)))
            transition: var(--quickTransition)
            background: var(--neutral)
            &.on
                transform: translateY(var(--sameContextGap))
            .searchInputs
                padding-top: 0
                &:first-of-type
                    padding-top: var(--sameContextGap)
                &:last-of-type
                    margin-bottom: -3px
                label
                    border: var(--borderSizeLight) solid var(--prim)
                    border-radius: var(--borderRadius) var(--borderRadius) 0 0
                    border-bottom: 0
                    width: 100%
                    padding: 3px var(--sameContextGap)
                input
                    border-top: 0
                    border-radius: 0 0 var(--borderRadius) var(--borderRadius)


</style>