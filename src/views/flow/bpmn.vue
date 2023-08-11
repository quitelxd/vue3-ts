<template>
    bpmn
</template>
<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue';

    export default defineComponent({
        name: 'bpmn',
        setup() {
            const data = reactive({})
            return {
                ...toRefs(data)
            };
        },
    });
</script>

<style scoped lang='less'>
</style>
