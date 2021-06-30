<template>
    <el-submenu :index="item.path" v-if="item.children && item.children.length >= 0">
        <template #title>
            <i class="el-icon-location"></i>
            <span>{{item.meta.name}}</span>
        </template>
        <MenuItem v-for="child in item.children" :p-path="item.path" :item="child" :key="child.path"></MenuItem>
    </el-submenu>
    <el-menu-item :index="item.path" v-else>
        <div @click="toRoute(item.path)">
            <i class="el-icon-menu"></i>
            <span>{{item.meta.name}}</span>
        </div>
    </el-menu-item>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {useRouter} from 'vue-router'

    export default defineComponent({
        name: "MenuItem",
        props: {
            item: {
                type: Object,
                require: true,
            },
            pPath:{
                type:String
            }
        },
        setup(props) {
            let router = useRouter();
            const toRoute = (path: string): void => {
                let routerStr = "";
                if(path.split('/').length > 1){
                    routerStr = path
                }else{
                    routerStr = props.pPath + '/' + path
                }
                router.push(routerStr).catch((err) => {
                    console.log("跳转错误")
                })
            }
            return {
                toRoute
            }
        }
    })
</script>

<style scoped>

</style>
