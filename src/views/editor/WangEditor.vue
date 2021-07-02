<template>
    <div id="editor">
        WangEditor 其实也没什么东西，主要看官网API
    </div>
</template>

<script lang="ts">
    import E from 'wangeditor'

    import {defineComponent, onMounted} from 'vue';

    export default defineComponent({
        name: "WangEditor",
        setup() {
            onMounted(() => {
                const editor = new E('#editor')
                editor.create()
            })
        }
    })
</script>

<style scoped>

</style>
