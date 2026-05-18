<template>
  <div class="admin-login-page">
    <div class="login-card">
      <div class="login-header">
        <h1>管理后台登录</h1>
        <p class="sub-title">泗洪县人民检察院</p>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleLogin">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" size="large" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" size="large" show-password />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-row">
            <el-input v-model="form.captcha" placeholder="请输入验证码" size="large" style="flex: 1" />
            <div class="captcha-img" @click="refreshCaptcha">{{ captchaText }}</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <span>仅限 admin / editor 角色登录</span>
        <router-link to="/" class="back-link">返回门户首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getUsers, setToken, setCurrentUser } from '@/stores/auth'
import type { User as UserType } from '@/types/user'

const router = useRouter()
const route = useRoute()
const formRef = ref<FormInstance>()
const loading = ref(false)

// 验证码
const captchaSeed = ref(Math.floor(1000 + Math.random() * 9000))
const captchaText = computed(() => String(captchaSeed.value))

function refreshCaptcha() {
  captchaSeed.value = Math.floor(1000 + Math.random() * 9000)
}

const form = ref({
  username: '',
  password: '',
  captcha: '',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== String(captchaSeed.value)) {
          callback(new Error('验证码不正确'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const users = getUsers()
    const found = users.find(
      (u: UserType & { password?: string }) =>
        u.username === form.value.username &&
        (u as { password?: string }).password === form.value.password
    )

    if (!found) {
      ElMessage.error('用户名或密码错误')
      refreshCaptcha()
      form.value.captcha = ''
      return
    }

    if (found.role === 'viewer') {
      ElMessage.error('您的账号没有后台登录权限')
      refreshCaptcha()
      form.value.captcha = ''
      return
    }

    if (found.status === 'disabled') {
      ElMessage.error('您的账号已被禁用')
      return
    }

    // 登录成功
    const mockToken = `mock_token_${found.id}_${Date.now()}`
    setToken(mockToken)
    setCurrentUser(found)

    ElMessage.success('登录成功')
    // 回跳到之前想访问的页面
    const redirect = route.query.redirect as string
    router.push(redirect || '/admin')
  } catch (err) {
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped lang="scss">
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary-dark 0%, $primary-color 50%, $primary-light 100%);
}

.login-card {
  width: 420px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 48px 40px 32px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 24px;
    color: $primary-color;
    margin: 0 0 8px;
  }

  .sub-title {
    font-size: 14px;
    color: $text-muted;
    margin: 0;
  }
}

.captcha-row {
  display: flex;
  gap: 12px;
  align-items: center;

  .captcha-img {
    width: 100px;
    height: 40px;
    background: linear-gradient(135deg, #e8f0fa, #d8e8f5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 6px;
    color: $primary-color;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
  }
}

.login-btn {
  width: 100%;
  margin-top: 8px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: $text-muted;
  margin-top: 16px;

  .back-link {
    color: $primary-light;
    text-decoration: none;

    &:hover {
      color: $primary-color;
      text-decoration: underline;
    }
  }
}
</style>
