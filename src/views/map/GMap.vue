<template>
    <div>
        GMap
        <HelloWord></HelloWord>
    </div>
</template>


<script lang="ts">
    import {defineComponent} from 'vue';
    import HelloWord from "@/components/HelloWorld.vue";
    export default defineComponent({
        name: "GMap",
        components: {
            HelloWord
        }
    })
</script>

<style scoped>

</style>
