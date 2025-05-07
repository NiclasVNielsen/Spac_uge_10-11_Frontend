import { io } from 'socket.io-client'
import { ref } from 'vue';


export const socket = io('http://localhost:3000', {
    auth: {
        token: localStorage.getItem('token')
    },
})

export const messages = ref([])


socket.emit('joinRoom', 'cma6nlj5y0003v2do0u5o1noy')

socket.on('joinedRoom', (room) => {
    console.log('Joined WEEE WOOO WEE WOOO', room)
})

socket.on('error', console.log)

/*socket.emit('chatToServer', {
    room: 'room1',
    message: 'Hello from HTML!',
})*/

socket.on('chatToClient', (data) => {
    messages.value.push({
        roomId: "cma6nlj5y0003v2do0u5o1noy",
        sender: data.sender,
        message: data.message,
        you: "notu"
    })
})
