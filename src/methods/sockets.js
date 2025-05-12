import { io } from 'socket.io-client'
import { ref } from 'vue';

export const room = ref("")

export const socket = io('http://192.168.20.222:3000', {
    auth: {
        token: localStorage.getItem('token')
    },
})

export const messages = ref([])

export const inRooms = ref([])

export const joinRoom = () => {
    console.log("teststestsetes", room.value)

    if(inRooms.value.indexOf(room.value) != -1)
        return

    const currentInstanceRoom = room.value

    socket.emit('joinRoom', room.value)
    
    socket.on('joinedRoom', (room) => {
        console.log('Joined WEEE WOOO WEE WOOO', room)
    })
    
    socket.on('error', console.log)
    
    /*socket.emit('chatToServer', {
        room: 'room1',
        message: 'Hello from HTML!',
    })*/
    
    socket.on('chatToClient', (data) => {
        if(data.roomId == currentInstanceRoom){
            messages.value.push({
                roomId: room.value,
                sender: data.sender,
                message: data.message,
                you: "notu"
            })
        }
    })
}
