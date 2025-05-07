<script setup>

import { token, id, username, role } from '@/data/token';
import { useRouter } from 'vue-router';

const router = useRouter()

token.value = ""
id.value = ""
username.value = ""
role.value = ""

setTimeout(() => {
    router.push("/")
}, 500);

</script>

<template>
    <div class="linkBox spinner">
    </div>
</template>

<style lang="sass" scoped>

.linkBox
    height: 100vh
    border: none

</style>