<script setup>

import { token } from '@/data/token';
import { useRouter } from 'vue-router';

const router = useRouter()

token.value = ""

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