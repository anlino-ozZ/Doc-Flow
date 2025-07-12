<template>
  <div class="login-container">
    <el-card class="login-card" shadow="never">
      <template #header>
        <div class="card-header">用户登录</div>
      </template>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="loginForm.username" 
            prefix-icon="ElUser"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            prefix-icon="ElLock"
          />
        </el-form-item>
        
        <el-form-item label="验证码" prop="code">
          <el-input 
            v-model="loginForm.code" 
            class="code-input" 
            placeholder="请输入6位验证码"
          />
          <el-button 
            type="primary" 
            size="small" 
            @click="sendCode"
            :loading="codeLoading"
          >
            {{ codeLoading ? '发送中...' : '获取验证码' }}
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="loading" 
            @click="handleLogin"
            class="login-button"
          >
            登录
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-actions">
        <el-link type="primary">忘记密码?</el-link>
        <el-link type="primary" class="register-link">立即注册</el-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const loginForm = reactive({
  username: '',
  password: '',
  code: ''
})

const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码为 6 位数字', trigger: 'blur' }
  ]
})

const loginFormRef = ref(null)
const loading = ref(false)
const router = useRouter()

const codeLoading = ref(false)
const sendCode = () => {
  codeLoading.value = true
  // 模拟验证码发送（实际调用后端接口）
  setTimeout(() => {
    codeLoading.value = false
    ElMessage.success('验证码已发送！'); // 需引入 ElMessage
  }, 2000)
}

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        console.log('登录成功:', loginForm)
        localStorage.setItem('isLoggedIn', 'true')
        loading.value = false
        router.push('/')
      }, 1000)
    } else {
      ElMessage.error('表单验证失败，请检查！'); // 需引入 ElMessage
      return false
    }
  })
}

const handleReset = () => {
  loginFormRef.value.resetFields()
}
</script>

<style scoped>
/* 验证码输入框样式 */
.code-input {
  width: 180px;
  margin-right: 10px;
}
.login-container{
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.2) ;
}
.card-header{
    text-align: center;
}
</style>