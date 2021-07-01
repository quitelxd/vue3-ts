<template>
    <el-menu :default-active="defaultActive">
        <MenuItem v-for="item in menu" :key="item.path" :item="item" :p-path="item.path"></MenuItem>
    </el-menu>
</template>
<script lang="ts">
    import {defineComponent, computed} from 'vue';
    import MenuItem from './MenuItem.vue'
    import {useRouter, useRoute} from "vue-router";

    export default defineComponent({
        name: "Menu",
        components: {
            MenuItem
        },
        setup() {
            let route = useRoute();
            let menu = computed(() => {
                return useRouter().options.routes.filter(item => {
                    return item.path === "/"
                })[0].children
            })
            const defaultActive = computed(() => {
                const {path} = route;
                let arr = path.split('/');
                return arr.length === 2 ? '/' + arr[arr.length - 1] : arr[arr.length - 1];
            })


            return {
                menu,
                defaultActive,
            }
        }
    })
</script>

<style scoped>

</style>
