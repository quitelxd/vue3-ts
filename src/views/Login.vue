<template>
    <div class="login">
        <div class="box">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right">
                填就行了
            </div>
            <div style="text-align: center">
                <el-button type="primary" @click="submit">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import { setToken } from "@/utils"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const formRef = ref(null)

const data = reactive({
    form: {
        name: "",
        password: ""
    },
    rules: {
        name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
        ],
    }
})

const { form, rules } = toRefs(data)

const submit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            const redirect = route.query.redirect ? route.query.redirect : "/"
            setToken("akjsdfhakjdhfkasdfjkhaslkdjf")
            router.push(redirect)
        } else {
            alert("填啊！！！")
            return false
        }
    })
}
</script>

<style scoped lang="less">
    .login {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;

        .box {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translateX(-50%);
            width: 800px;
        }
    }
</style>
