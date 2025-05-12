import { ref, watch } from "vue";

export const token = ref("")
export const id = ref("")
export const username = ref("")
export const role = ref("")
export const rooms = ref("")


watch(token, () => {
    localStorage.setItem("token", token.value)

    if(token.value == ""){
        localStorage.setItem("userId", "")
        localStorage.setItem("username", "")
        localStorage.setItem("userRole", "")
        localStorage.setItem("rooms", "[]")
    }
})

export const getLocalData = () => {
    token.value = localStorage.getItem("token")
    id.value = localStorage.getItem("userId")
    username.value = localStorage.getItem("username")
    role.value = localStorage.getItem("userRole")
    rooms.value = localStorage.getItem("rooms")
}

getLocalData()