import { ref, watch } from "vue";

export const token = ref("")
export const id = ref("")
export const username = ref("")
export const role = ref("")

token.value = localStorage.getItem("token")
id.value = localStorage.getItem("userId")
username.value = localStorage.getItem("username")
role.value = localStorage.getItem("userRole")

watch(token, () => {
    localStorage.setItem("token", token.value)

    if(token.value == ""){
        id.value = localStorage.setItem("userId", "")
        username.value = localStorage.setItem("username", "")
        role.value = localStorage.setItem("userRole", "")
    }
})
