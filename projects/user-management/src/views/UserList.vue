<template>
  <div>
    <div class="page-header">
      <h2>用户列表</h2>
    </div>

    <SearchBar :query="query" @search="handleSearch" @reset="resetQuery" />

    <div class="toolbar">
      <el-button type="primary" @click="openCreate">
        <el-icon><Plus /></el-icon>
        新增用户
      </el-button>
      <el-button type="warning" @click="handleResetData">
        <el-icon><Refresh /></el-icon>
        重置数据
      </el-button>
    </div>

    <el-table :data="users" v-loading="loading" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="phone" label="手机号" width="140" />
      <el-table-column prop="email" label="邮箱" min-width="200" />
      <el-table-column label="角色" width="120">
        <template #default="{ row }">
          <el-tag :type="roleTagType(row.role)" effect="dark" size="small">
            {{ roleLabel(row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            active-value="active"
            inactive-value="disabled"
            :loading="togglingIds.has(row.id)"
            @change="handleToggle(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
          <el-popconfirm
            title="确定删除此用户？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="query.page"
        v-model:page-size="query.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>

    <UserFormDialog
      v-model:visible="showForm"
      :user="currentUser"
      @submit="handleFormSubmit"
      @cancel="showForm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Refresh } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import type { User, UserRole } from '@/api/types';
import { userService } from '@/api/userService';
import { useUserList } from '@/composables/useUserList';
import SearchBar from '@/components/common/SearchBar.vue';
import UserFormDialog from '@/components/UserForm/UserFormDialog.vue';

const {
  users,
  total,
  loading,
  query,
  fetchList,
  handleSearch,
  handlePageChange,
  handleSizeChange,
  resetQuery,
} = useUserList();

const showForm = ref(false);
const currentUser = ref<User | null>(null);
const togglingIds = ref<Set<string>>(new Set());

const roleLabel = (role: UserRole) => {
  const map: Record<UserRole, string> = {
    admin: '管理员',
    user: '普通用户',
    readonly: '只读用户',
  };
  return map[role] || role;
};

const roleTagType = (role: UserRole) => {
  const map: Record<UserRole, any> = {
    admin: 'danger',
    user: '',
    readonly: 'info',
  };
  return map[role];
};

const formatTime = (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm');

const openCreate = () => {
  currentUser.value = null;
  showForm.value = true;
};

const openEdit = (row: User) => {
  currentUser.value = { ...row };
  showForm.value = true;
};

const handleFormSubmit = async (data: any) => {
  try {
    if (currentUser.value) {
      await userService.update(currentUser.value.id, data);
      ElMessage.success('编辑成功');
    } else {
      await userService.create(data);
      ElMessage.success('新增成功');
    }
    showForm.value = false;
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败');
  }
};

const handleDelete = async (row: User) => {
  try {
    await userService.remove(row.id);
    ElMessage.success('删除成功');
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e.message || '删除失败');
  }
};

const handleToggle = async (row: User) => {
  togglingIds.value.add(row.id);
  try {
    await userService.toggleStatus(row.id);
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败');
  } finally {
    togglingIds.value.delete(row.id);
  }
};

const handleResetData = async () => {
  try {
    await userService.resetSeed();
    ElMessage.success('数据已重置');
    await fetchList();
  } catch (e: any) {
    ElMessage.error('重置失败');
  }
};

onMounted(() => {
  fetchList();
});
</script>
