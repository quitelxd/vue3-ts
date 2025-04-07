<template>
    <div id="editor">
        WangEditor 其实也没什么东西，主要看官网API
    </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted } from 'vue'

onMounted(() => {
    const editor = new E('#editor')
    editor.create()
})
</script>

<style scoped>

</style>
