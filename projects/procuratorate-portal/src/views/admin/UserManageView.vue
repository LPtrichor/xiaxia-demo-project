<template>
  <div class="user-manage">
    <el-card>
      <!-- 顶部操作区 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索用户名/姓名..."
            style="width: 300px"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="toolbar-right">
          <el-button type="primary" @click="openDialog()">
            <el-icon><Plus /></el-icon>
            新增用户
          </el-button>
        </div>
      </div>

      <!-- 用户列表 -->
      <el-table :data="pagedUsers" stripe style="width: 100%; margin-top: 16px">
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="realName" label="姓名" width="120" />
        <el-table-column label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="roleType(row.role)" size="small">{{ roleLabel(row.role) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              active-value="active"
              inactive-value="disabled"
              inline-prompt
              active-text="启用"
              inactive-text="禁用"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="最后登录" width="160">
          <template #default="{ row }">
            {{ row.lastLoginAt ? formatDate(row.lastLoginAt) : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="filteredTotal"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新增用户'"
      width="520px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" style="width: 100%">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑员" value="editor" />
            <el-option label="普通用户" value="viewer" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import dayjs from 'dayjs'
import { getUsers, saveUsers } from '@/composables/useMockData'
import type { User, UserRole } from '@/types/user'

const allUsers = ref<User[]>(getUsers())
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 过滤
const filteredUsers = computed(() => {
  let list = [...allUsers.value]
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(
      (u) =>
        u.username.toLowerCase().includes(kw) ||
        (u.realName && u.realName.toLowerCase().includes(kw))
    )
  }
  return list
})

const filteredTotal = computed(() => filteredUsers.value.length)

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredUsers.value.slice(start, start + pageSize.value)
})

// 对话框
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref('')
const formRef = ref<FormInstance>()

const defaultForm = {
  username: '',
  realName: '',
  password: '',
  role: 'viewer' as UserRole,
  department: '',
  phone: '',
  email: '',
}

const form = ref({ ...defaultForm })

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

function openDialog(row?: User) {
  if (row) {
    isEdit.value = true
    editingId.value = row.id
    form.value = {
      username: row.username,
      realName: row.realName || '',
      password: '',
      role: row.role,
      department: row.department || '',
      phone: row.phone || '',
      email: row.email || '',
    }
  } else {
    isEdit.value = false
    editingId.value = ''
    form.value = { ...defaultForm }
  }
  dialogVisible.value = true
}

function handleSave() {
  formRef.value?.validate((valid) => {
    if (!valid) return

    if (isEdit.value) {
      const idx = allUsers.value.findIndex((u) => u.id === editingId.value)
      if (idx >= 0) {
        allUsers.value[idx] = {
          ...allUsers.value[idx],
          realName: form.value.realName,
          role: form.value.role,
          department: form.value.department,
          phone: form.value.phone,
          email: form.value.email,
        }
      }
      ElMessage.success('用户信息更新成功')
    } else {
      // 检查用户名是否重复
      if (allUsers.value.some((u) => u.username === form.value.username)) {
        ElMessage.error('用户名已存在')
        return
      }
      const newUser: User = {
        id: 'u' + Date.now(),
        username: form.value.username,
        realName: form.value.realName,
        role: form.value.role,
        department: form.value.department,
        phone: form.value.phone,
        email: form.value.email,
        status: 'active',
        createdAt: new Date().toISOString(),
      }
      ;(newUser as User & { password?: string }).password = form.value.password
      allUsers.value.push(newUser)
      ElMessage.success('用户创建成功')
    }

    saveUsers(allUsers.value)
    dialogVisible.value = false
  })
}

async function handleDelete(row: User) {
  try {
    await ElMessageBox.confirm(`确定要删除用户「${row.realName || row.username}」吗？`, '确认删除', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
    allUsers.value = allUsers.value.filter((u) => u.id !== row.id)
    saveUsers(allUsers.value)
    ElMessage.success('用户已删除')
  } catch {
    // 取消
  }
}

function handleStatusChange(row: User) {
  const label = row.status === 'active' ? '启用' : '禁用'
  ElMessage.success(`用户 ${label}成功`)
  saveUsers(allUsers.value)
}

function handleSearch() {
  currentPage.value = 1
}

function formatDate(dateStr: string): string {
  return dayjs(dateStr).format('YYYY-MM-DD HH:mm')
}

function roleType(role: string): string {
  const map: Record<string, string> = { admin: 'danger', editor: 'warning', viewer: 'info' }
  return map[role] || 'info'
}

function roleLabel(role: string): string {
  const map: Record<string, string> = { admin: '管理员', editor: '编辑员', viewer: '用户' }
  return map[role] || role
}

onMounted(() => {
  allUsers.value = getUsers()
})
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
