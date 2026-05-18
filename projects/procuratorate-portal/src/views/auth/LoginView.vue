<template>
  <div class="login-view">
    <div class="login-header">
      <el-icon :size="48" color="#c41e24"><OfficeBuilding /></el-icon>
      <h1 class="login-title">泗洪县人民检察院</h1>
      <p class="login-subtitle">用户登录</p>
    </div>

    <div class="login-card">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-row">
            <el-input
              v-model="form.captcha"
              placeholder="请输入验证码"
              size="large"
              style="flex: 1"
            />
            <div class="captcha-image" @click="refreshCaptcha">
              {{ captchaText }}
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <el-link type="primary" :underline="false">忘记密码？</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { OfficeBuilding, User, Lock } from '@element-plus/icons-vue'
import { setItem } from '@/utils/storage'

const router = useRouter()
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  captcha: '',
})

const captchaText = ref('')

function generateCaptcha() {
  const digits = '0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += digits[Math.floor(Math.random() * 10)]
  }
  captchaText.value = result
}

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码为4位数字', trigger: 'blur' },
  ],
}

function refreshCaptcha() {
  generateCaptcha()
}

async function handleLogin() {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (form.captcha !== captchaText.value) {
        ElMessage.error('验证码错误')
        refreshCaptcha()
        return
      }

      // Mock login
      setItem('auth_token', 'mock-jwt-token-' + Date.now())
      setItem('current_user', {
        id: 'user-001',
        username: form.username,
        role: 'viewer',
        status: 'active',
      })

      ElMessage.success('登录成功')
      router.push('/')
    }
  })
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style lang="scss" scoped>
.login-view {
  min-height: 100vh;
  background: linear-gradient(135deg, $primary-dark 0%, $primary-color 50%, $primary-light 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  color: #fff;
}

.login-title {
  font-size: $font-size-title;
  font-weight: 700;
  margin: $spacing-sm 0 $spacing-xs;
  color: #fff;
}

.login-subtitle {
  font-size: $font-size-lg;
  opacity: 0.8;
  margin: 0;
}

.login-card {
  background: $bg-white;
  border-radius: 8px;
  padding: $spacing-xl;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.captcha-row {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
}

.captcha-image {
  width: 90px;
  height: 40px;
  background: linear-gradient(135deg, #e8e8e8, #f5f5f5);
  border: 1px solid $border-color;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-xl;
  font-weight: bold;
  color: $primary-color;
  letter-spacing: 6px;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
}

.login-btn {
  width: 100%;
}

.login-footer {
  text-align: center;
  margin-top: $spacing-sm;
}
</style>
