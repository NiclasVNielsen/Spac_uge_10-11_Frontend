<script setup>

import * as CRUD from '@/methods/httpRequests.js'
import List from './components/List.vue'
import { ref } from "vue"
import aHeader from './components/adminHeader.vue'

const data = ref([])

const getData = async () => {
  let res = await CRUD.get("message")
  //res = res.slice(0, 20)
  data.value = res
}
getData()

</script>

<template>
    <div class="container body admin">
        <aHeader />
        <div class="container main">
            <List :data="data" :key="data"/>
        </div>
    </div>
</template>