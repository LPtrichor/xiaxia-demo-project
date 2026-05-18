<template>
  <div class="content-manage">
    <el-card>
      <!-- 顶部操作区 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索文章标题..."
            style="width: 300px"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select v-model="filterCategory" placeholder="全部栏目" style="width: 150px; margin-left: 12px" clearable @change="handleSearch">
            <el-option label="全部栏目" value="" />
            <el-option v-for="cat in categories" :key="cat.code" :label="cat.name" :value="cat.code" />
          </el-select>
        </div>
        <div class="toolbar-right">
          <el-button type="primary" @click="openDialog()">
            <el-icon><Plus /></el-icon>
            新增文章
          </el-button>
        </div>
      </div>

      <!-- 文章列表 -->
      <el-table :data="pagedArticles" stripe style="width: 100%; margin-top: 16px">
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column label="栏目" width="110">
          <template #default="{ row }">
            <el-tag size="small">{{ getCategoryName(row.category) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="80" />
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">
            {{ formatDate(row.publishDate) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
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
      :title="isEdit ? '编辑文章' : '新增文章'"
      width="640px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="栏目" prop="category">
          <el-select v-model="form.category" placeholder="请选择栏目" style="width: 100%">
            <el-option v-for="cat in categories" :key="cat.code" :label="cat.name" :value="cat.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="3" placeholder="请输入文章摘要" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="6" placeholder="请输入正文内容（支持 HTML）" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="草稿" value="draft" />
            <el-option label="已发布" value="published" />
            <el-option label="已归档" value="archived" />
          </el-select>
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
import { getArticles, saveArticles, getCategories, getCategoryName } from '@/composables/useMockData'
import type { Article, ArticleStatus } from '@/types/article'
import type { CategoryCode } from '@/types/category'

const allArticles = ref<Article[]>(getArticles())
const categories = getCategories()
const searchKeyword = ref('')
const filterCategory = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 过滤
const filteredArticles = computed(() => {
  let list = [...allArticles.value]
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter((a) => a.title.toLowerCase().includes(kw))
  }
  if (filterCategory.value) {
    list = list.filter((a) => a.category === filterCategory.value)
  }
  return list.sort((a, b) => dayjs(b.publishDate).valueOf() - dayjs(a.publishDate).valueOf())
})

const filteredTotal = computed(() => filteredArticles.value.length)

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredArticles.value.slice(start, start + pageSize.value)
})

// 对话框
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref('')
const formRef = ref<FormInstance>()

const defaultForm = {
  title: '',
  category: '' as CategoryCode | '',
  author: '',
  summary: '',
  content: '',
  status: 'draft' as ArticleStatus,
}

const form = ref({ ...defaultForm })

const rules: FormRules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择栏目', trigger: 'change' }],
}

function openDialog(row?: Article) {
  if (row) {
    isEdit.value = true
    editingId.value = row.id
    form.value = {
      title: row.title,
      category: row.category,
      author: row.author || '',
      summary: row.summary || '',
      content: row.content,
      status: row.status,
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
      const idx = allArticles.value.findIndex((a) => a.id === editingId.value)
      if (idx >= 0) {
        allArticles.value[idx] = {
          ...allArticles.value[idx],
          ...form.value,
          category: form.value.category as CategoryCode,
          status: form.value.status,
          updateTime: new Date().toISOString(),
        }
      }
      ElMessage.success('文章更新成功')
    } else {
      const newArticle: Article = {
        id: 'a' + Date.now(),
        title: form.value.title,
        category: form.value.category as CategoryCode,
        author: form.value.author,
        summary: form.value.summary,
        content: form.value.content || '<p>暂无内容</p>',
        status: form.value.status,
        publishDate: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        viewCount: 0,
        isTop: false,
      }
      allArticles.value.unshift(newArticle)
      ElMessage.success('文章创建成功')
    }

    saveArticles(allArticles.value)
    dialogVisible.value = false
  })
}

async function handleDelete(row: Article) {
  try {
    await ElMessageBox.confirm(`确定要删除文章「${row.title}」吗？`, '确认删除', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
    allArticles.value = allArticles.value.filter((a) => a.id !== row.id)
    saveArticles(allArticles.value)
    ElMessage.success('文章已删除')
  } catch {
    // 取消
  }
}

function handleSearch() {
  currentPage.value = 1
}

function formatDate(dateStr: string): string {
  return dayjs(dateStr).format('YYYY-MM-DD')
}

function statusType(status: string): string {
  const map: Record<string, string> = { published: 'success', draft: 'warning', archived: 'info' }
  return map[status] || 'info'
}

function statusLabel(status: string): string {
  const map: Record<string, string> = { published: '已发布', draft: '草稿', archived: '已归档' }
  return map[status] || status
}

onMounted(() => {
  allArticles.value = getArticles()
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
