<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import Edit from './components/Edit.vue'
import { ref } from "vue"
import { useRoute } from "vue-router"
import aHeader from './components/adminHeader.vue'

const route = useRoute()

const data = ref([])

const getData = async () => {
    let res = await CRUD.get("message/" + route.params.id)
    //res = res.slice(0, 20)
    data.value = res
}
getData()

</script>

<template>
    <div class="container body admin">
        <aHeader />
        <div class="container main">
            <Edit :data="data" :key="data"/>
        </div>
    </div>
</template>