<template>
    <div class="login-box">

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
            label-width="auto" class="demo-ruleForm">
            <h2>电商后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button class="login-btn" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const data = reactive(new LoginData());
        const rules = {
            username: [
                { required: true, message: '请输入账户', trigger: 'blur' },
                { min: 3, max: 10, message: '账号长度在3到10个字符之间' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 10, message: '密码长度在6到10个字符之间' }
            ]
        };
        // 登录
        const ruleFormRef = ref<FormInstance>();
        const router = useRouter();
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    // 验证成功处理登录逻辑
                    login(data.ruleForm).then((res) => {
                        if(res.data.status === 200){
                            console.log('登陆成功!')
                            // 保存token
                            localStorage.setItem("token", res.data.token)
                            // 跳转页面
                            router.push('/')
                        } else {
                            console.log('登录失败!')
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
            // console.log(formEl)
        }
        // 重置
        const resetForm = () => {
            data.ruleForm.username = "";
            data.ruleForm.password = "";
        }

        return { ...toRefs(data), rules, submitForm, resetForm, ruleFormRef }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/pics/bg.jpg");
    text-align: center;
    // flex布局水平垂直居中
    display: flex;
    justify-content: center;
    align-items: center;

    .demo-ruleForm {
        width: 500px;
        background-color: #FFF;
        // margin: 200px auto;
        padding: 60px;
        border-radius: 30px;

        .login-btn {
            width: 48%;
        }

        h2 {
            margin-bottom: 10px;
        }
    }
}
</style>