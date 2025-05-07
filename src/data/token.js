import { ref, watch } from "vue";

export const token = ref("")

token.value = localStorage.getItem("token")

watch(token, () => {
    localStorage.setItem("token", token.value)
})
