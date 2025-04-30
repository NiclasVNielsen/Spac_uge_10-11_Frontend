<script setup>
import { ref } from 'vue'

const items = ref([1,2,3,4,5,6,7,8,9,0])

const showRoomDetails = ref(true)

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
        <div class="chatField container" :class="{ 'noSideBar': !showRoomDetails }">
            <div class="controls shadow b container">
                <div>

                </div>
                <div>
                    <span @click="showRoomDetails = !showRoomDetails">
                        Room Details
                    </span>
                </div>
            </div>
            <div class="chat">
                <div class="messageContainer">
                    <div class="u">
                        <p class="shadow a">
                            Meeepp mooppp
                        </p>
                    </div>
                    <div class="notu">
                        <p class="shadow a">
                            mmmmmmmmmeppp Mop
                        </p>
                    </div>
                </div>
                <div class="messageInput">
                    <input type="text" class="shadow a" placeholder="Type something!">
                </div>
            </div>
        </div>
        <div class="chatDetails shadow l container" v-if="showRoomDetails">
            <h4>
                Room Name
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
    </div>
</template>

<style lang="sass" scoped>



.main
    min-height: 100vh
    display: flex
    overflow: hidden
    .friends, .chatDetails
        width: calc(var(--differentContextGap) * 8)
        flex-wrap: nowrap
        flex-direction: column
        overflow-y: scroll
        scrollbar-color: var(--darkNeutral) var(--neutral)
        scrollbar-width: thin
        height: 100vh
        &::-webkit-scrollbar-button
            display: none
    .chatField
        width: calc(100% - (var(--differentContextGap) * 16))
        flex-wrap: wrap
        padding: var(--sameContextGap) 0
        &.noSideBar
            width: calc(100% - (var(--differentContextGap) * 8))
        .controls
            height: calc(var(--sameContextGap) * 3)
            margin: 0 var(--sameContextGap)
            display: flex
            justify-content: space-between
            >div
                display: flex
                &:last-of-type
                    justify-content: flex-end                    
        .chat
            height: calc(100% - (var(--sameContextGap) * 3))
            .messageContainer
                height: calc(100% - (var(--sameContextGap) * 2) - 22px)
                padding: var(--sameContextGap) calc(var(--sameContextGap) * 2)
                overflow-y: scroll
                scrollbar-color: var(--darkNeutral) var(--neutral)
                scrollbar-width: thin
                &::-webkit-scrollbar-button
                    display: none
                > div
                    p
                        display: inline-block
                        width: auto
                        border-radius: calc(var(--sameContextGap) / 2)
                        padding: calc(var(--containerPadding) / 2) calc(var(--containerPadding) * 0.9)
                .u
                    display: flex
                    justify-content: flex-end
                    p
                        margin-left: var(--sameContextGap)
                .notu
                    p
                        margin-right: var(--sameContextGap)
                        background: var(--prim)
                        color: var(--neutral)
            .messageInput
                padding: 0 var(--sameContextGap)
                margin: 0 var(--sameContextGap)
                input
                    margin-top: var(--sameContextGap)
                    width: calc(100% - (var(--sameContextGap) * 2))
                    border: none
                    border-radius: var(--sameContextGap)

    .chatDetails
        width: calc(var(--differentContextGap) * 8)

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
                flex-wrap: wrap
                p
                    margin-bottom: 0
                    width: calc(100% - (var(--sameContextGap) * 3))
                .status
                    background: #0f0
                    width: var(--sameContextGap)
                    height: var(--sameContextGap)
                    border-radius: 50%
                    margin-bottom: 0
                    margin-left: var(--sameContextGap)
                    margin-right: var(--sameContextGap)

</style>