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


<script lang="ts">
    import {defineComponent, reactive, toRefs, ref} from 'vue';
    import {setToken} from "@/utils";
    import {useRouter} from "vue-router"

    export default defineComponent({
        name: "Login",
        setup() {
            let router = useRouter();
            let formRef = ref(null)
            let data = reactive({
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
            const submit = (): void => {
                (formRef.value as any).validate((valid: boolean) => {
                    if (valid) {
                        console.log(data.form)
                        setToken("akjsdfhakjdhfkasdfjkhaslkdjf");
                        router.push("/dashboard")
                    } else {
                        alert("填啊！！！")
                        return false
                    }
                })
            }
            return {
                ...toRefs(data),
                formRef,
                submit
            }
        }
    })
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
