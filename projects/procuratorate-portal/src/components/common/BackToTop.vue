<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="back-to-top" @click="scrollToTop">
        <el-icon :size="18"><ArrowUp /></el-icon>
        <span class="back-to-top-text">顶部</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 80px;
  min-width: 44px;
  height: 44px;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: #fff;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba($primary-color, 0.3);
  transition: all $transition-base;
  z-index: 1000;
  padding: 0 12px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 24px rgba($primary-color, 0.4);
  }
}

.back-to-top-text {
  font-size: 12px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
