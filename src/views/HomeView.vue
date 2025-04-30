<script setup>
import { ref } from 'vue'

const items = ref([1,2,3])

</script>

<template>
    <div class="main">
        <div class="friends shadow r container">
            <h4>
                Friends
            </h4>
            <div class="friendsContainer">
                <div v-for="item in items" :key="index" class="friendItem shadow b">
                    <figure>
                        <img src="../../public/ph.jpg" alt="">
                    </figure>
                    <div>
                        <h6>
                            name
                        </h6>
                        <div>
                            <p>
                                status message
                            </p>
                            <figure class="status"></figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatField container">
            chat
        </div>
        <div class="chatDetails shadow l container">
            Other people in room / friend profile
        </div>
    </div>
</template>

<style lang="sass" scoped>

.main
    min-height: 100vh
    display: flex
    .friends
        width: calc(var(--differentContextGap) * 8)
        flex-wrap: nowrap
        flex-direction: column
        .friendsContainer
            display: flex
            justify-content: flex-start
            flex-direction: column
            .friendItem
                display: flex
                padding: var(--sameContextGap) 0
                > figure
                    width: calc(var(--differentContextGap) * 2)
                    margin-right: var(--sameContextGap)
                    display: flex
                    align-items: center
                    img
                        border-radius: var(--borderRadius)
                > div
                    display: flex
                    flex-direction: column
                    justify-content: center
                    align-items: center
                    h6
                        margin-bottom: calc(var(--sameContextGap) / 2)
                    > div
                        display: flex
                        p
                            margin-bottom: 0
                        .status
                            background: #f00
                            width: var(--sameContextGap)
                            height: var(--sameContextGap)
                            border-radius: 50%
                            margin-bottom: 0

    .chatField
        width: calc(100% - (var(--differentContextGap) * 16))
    .chatDetails
        width: calc(var(--differentContextGap) * 8)

</style>