<script setup>
import { ref } from 'vue'
import { socket, messages, room, joinRoom, inRooms } from '@/methods/sockets'
import * as CRUD from '@/methods/httpRequests'
import { id, getLocalData, username, rooms } from '@/data/token'

getLocalData()

const items = ref([])

items.value = JSON.parse(rooms.value)

const showRoomDetails = ref(true)

const loadRoom = async (roomId = "") => {
    if(roomId == "")
        return
    const roomMessages = await CRUD.get("chatroom/getMessages/" + roomId)

    
    roomMessages.map((msg) => {
        if(msg.userId == id.value)
            msg["you"] = "u"
        else
            msg["you"] = "notu"
    })
    messages.value = roomMessages
}

const usersIdArray = ref([])
const usersnameArray = ref([])

const getUsers = async (roomId = "") => {
    if(roomId == "")
        return
    const users = await CRUD.get("chatroom/getusers/" + roomId)

    console.log(users)

    users.forEach(user => {
        usersIdArray.value.push(user.id)
        usersnameArray.value.push(user.username)
    });

}
getUsers()


const sendMessage = (message) => {
    if(userInput.value == "")
        return
    
    messages.value.push({
        sender: "me",
        message: message,
        you: "u"
    })

    let data  = { 
        roomId: room.value,
        message
    }
    socket.emit('chatToServer', data)

    userInput.value = ""
}

const userInput = ref("")

const changeRoom = (id) => {
    room.value = id
    if(inRooms.value.indexOf(room.value) == -1){
        joinRoom()
        inRooms.value.push(room.value)
    }
    loadRoom(room.value)

    usersIdArray.value = []
    usersnameArray.value = []
    getUsers(room.value)
}

</script>

<template>
    <div class="main">
        <div class="friends shadow r container">
            <h4>
                Rooms
            </h4>
            <div class="friendsContainer">
                <div v-for="item in items" :key="items" class="friendItem shadow b" @click="changeRoom(item.id)">
                    <figure>
                        <img src="../../ph.jpg" alt="">
                    </figure>
                    <div>
                        <h6 style="margin-bottom: 0;">
                            {{ item.name }}
                        </h6>
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
                    <template v-for="(message, index) in messages" :key="message.id">
                        <template v-if="index != 0 && message.you == 'notu'">
                            <p v-if="messages[index - 1].userId != message.userId">
                                {{ usersnameArray[usersIdArray.indexOf(message.userId)] }}
                            </p>
                        </template>
                        <template v-else-if="message.you == 'notu'">
                            <p>
                                {{ message.sender }}
                            </p>
                        </template>
                        <div :class="{notu: message.you == 'notu', u: message.you == 'u'}">
                            <p class="shadow a">
                                {{message.message}}
                            </p>
                        </div>
                    </template>
                </div>
                <div class="messageInput">
                    <input type="text" class="shadow a" placeholder="Type something!" v-model="userInput" @keydown.enter="sendMessage(userInput)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" @click="sendMessage(userInput)"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                </div>
            </div>
        </div>
        <div class="chatDetails shadow l container" v-if="showRoomDetails">
            <h4>
                Room Name
            </h4>
            <div class="friendsContainer">
                <div v-for="item in usersnameArray" :key="usersnameArray" class="friendItem shadow b">
                    <figure>
                        <img src="../../ph.jpg" alt="">
                        <figure class="status"></figure>
                    </figure>
                    <div>
                        <h6>
                            {{item}}
                        </h6>
                        <div>
                            <p>
                                status message
                            </p>
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
        padding: 0 0 var(--sameContextGap) 0
        max-height: 100vh
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
                position: relative
                input
                    margin-top: var(--sameContextGap)
                    width: calc(100% - (var(--sameContextGap) * 2))
                    border: none
                    border-radius: var(--sameContextGap)
                svg
                    position: absolute
                    fill: var(--second)
                    top: 50%
                    right: calc(var(--sameContextGap) * 4)
                    transform: translateY(-50%)
                    cursor: pointer
                    width: .7em
                    transition: var(--quickTransition)
                    &:hover
                        fill: var(--prim)

    .chatDetails
        width: calc(var(--differentContextGap) * 8)

.friendsContainer
    display: flex
    justify-content: flex-start
    flex-direction: column
    .friendItem
        display: flex
        padding: var(--sameContextGap) 0
        cursor: pointer
        > figure
            width: calc(var(--differentContextGap) * 2)
            margin-right: var(--sameContextGap)
            display: flex
            align-items: center
            position: relative
            img
                border-radius: 50%
            .status
                background: #0f0
                width: var(--sameContextGap)
                height: var(--sameContextGap)
                border-radius: 50%
                margin-bottom: 0
                position: absolute
                bottom: 0
                right: 0
                border: solid var(--borderSizeLight) var(--neutral)
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

</style>