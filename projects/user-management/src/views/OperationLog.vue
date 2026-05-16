<template>
  <div>
    <div class="page-header">
      <h2>操作日志</h2>
      <el-button type="danger" @click="handleClear">
        <el-icon><Delete /></el-icon>
        清空日志
      </el-button>
    </div>

    <el-table :data="logs" v-loading="loading" stripe style="width: 100%">
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-tag :type="actionTagType(row.action)" effect="dark" size="small">
            {{ actionLabel(row.action) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="操作对象" width="120" />
      <el-table-column prop="detail" label="详情" min-width="300" />
      <el-table-column label="时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.timestamp) }}
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无日志" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import type { OperationLog } from '@/api/types';
import { logService } from '@/api/logService';

const logs = ref<OperationLog[]>([]);
const loading = ref(false);

const actionLabel = (action: OperationLog['action']) => {
  const map: Record<OperationLog['action'], string> = {
    create: '创建',
    update: '编辑',
    delete: '删除',
    toggleStatus: '状态变更',
  };
  return map[action] || action;
};

const actionTagType = (action: OperationLog['action']) => {
  const map: Record<OperationLog['action'], any> = {
    create: 'success',
    update: '',
    delete: 'danger',
    toggleStatus: 'warning',
  };
  return map[action];
};

const formatTime = (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm');

const fetchLogs = async () => {
  loading.value = true;
  try {
    logs.value = await logService.list();
  } finally {
    loading.value = false;
  }
};

const handleClear = async () => {
  try {
    await ElMessageBox.confirm('确定清空所有日志？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await logService.clear();
    ElMessage.success('日志已清空');
    await fetchLogs();
  } catch {
    // cancelled
  }
};

onMounted(() => {
  fetchLogs();
});
</script>
