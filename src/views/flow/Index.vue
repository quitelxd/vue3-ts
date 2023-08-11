<template>
    <router-view></router-view>
</template>
<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue';

    export default defineComponent({
        name: 'Index',
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
