<template>
    <div>
        <el-row :gutter="15">
            <el-col :span="12">
                <h3>请求placeholder接口</h3>
                <ul>
                    <li v-for="li in listData" :key="li.id">{{li.name}}</li>
                </ul>
            </el-col>
            <el-col :span="12">
                <el-form label-width="120px">
                    <el-form-item label="name：">
                        linxd
                    </el-form-item>
                    <el-form-item label="tel/wechart：">
                        17382806791
                    </el-form-item>
                    <el-form-item label="birthday：">
                        1996.10.03
                    </el-form-item>
                    <el-form-item label="job：">
                        前端工程师
                    </el-form-item>
                    <el-form-item label="email：">
                        544554903@qq.com
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                rabbitMq链接、腾讯TRTC
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue';
    import {getTest} from "@/api/test";

    export default defineComponent({
        name: 'Introduce',
        setup() {
            let data = reactive({
                listData: []
            })
            getTest({
                postId: "1"
            }).then(res => {
                (data.listData as any) = res;
            })
            return {
                ...toRefs(data)
            }
        },
        created() {
        },
        components: {}
    });
</script>

<style scoped>
    p {
        height: 100px;
    }
</style>
