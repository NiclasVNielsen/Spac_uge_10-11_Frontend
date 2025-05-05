import { io } from 'socket.io-client'
import { ref } from 'vue';


export const socket = io('http://localhost:3000');

export const messages = ref([])


socket.emit('joinRoom', 'room1')

socket.on('joinedRoom', (room) => {
    console.log('Joined WEEE WOOO WEE WOOO', room)
})


/*socket.emit('chatToServer', {
    room: 'room1',
    message: 'Hello from HTML!',
})*/

socket.on('chatToClient', (data) => {
    messages.value.push({
        sender: data.sender,
        message: data.message,
        you: "notu"
    })
})
