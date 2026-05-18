<template>
  <Teleport to="body">
    <Transition name="float-fade">
      <div
        v-if="cfg && visible"
        class="floating-window"
        :style="positionStyle"
        @mousedown="startDrag"
      >
        <!-- 装饰顶部 -->
        <div class="float-accent-bar"></div>
        <div class="float-header">
          <span class="float-title">{{ cfg.title }}</span>
          <el-button
            class="float-close"
            :icon="Close"
            text
            size="small"
            @click.stop="closeWindow"
          />
        </div>
        <div class="float-body">
          <div class="float-image" :style="{ background: cfg.imageGradient ?? '' }"></div>
          <p class="float-content">{{ cfg.content }}</p>
          <router-link v-if="cfg.link" :to="cfg.link" class="float-link">
            {{ cfg.linkText }}
            <el-icon :size="14"><ArrowRight /></el-icon>
          </router-link>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Close, ArrowRight } from '@element-plus/icons-vue'
import { useMockFloatingWindow } from '@/composables/useMockData'

const { config, updateConfig } = useMockFloatingWindow()

const cfg = computed(() => config.value || undefined)
const visible = computed(() => cfg.value?.visible ?? false)

const position = ref({ x: 20, y: 120 })
let isDragging = false
let dragStart = { x: 0, y: 0 }
let posStart = { x: 0, y: 0 }

const positionStyle = computed(() => ({
  right: `${position.value.x}px`,
  top: `${position.value.y}px`,
}))

function startDrag(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('.float-close, a')) return
  isDragging = true
  dragStart = { x: e.clientX, y: e.clientY }
  posStart = { ...position.value }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging) return
  position.value.x = Math.max(0, posStart.x - (e.clientX - dragStart.x))
  position.value.y = Math.max(0, posStart.y + (e.clientY - dragStart.y))
}

function stopDrag() {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function closeWindow() {
  if (config.value) {
    updateConfig({ visible: false } as never)
  }
}

let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (cfg.value?.autoClose && cfg.value.autoClose > 0) {
    autoCloseTimer = setTimeout(() => closeWindow(), cfg.value.autoClose * 1000)
  }
})

onUnmounted(() => {
  if (autoCloseTimer) clearTimeout(autoCloseTimer)
})
</script>

<style lang="scss" scoped>
.floating-window {
  position: fixed;
  width: 300px;
  background: $bg-white;
  border-radius: $card-radius;
  box-shadow: $shadow-xl;
  z-index: 2000;
  overflow: hidden;
  user-select: none;
}

.float-accent-bar {
  height: 4px;
  background: linear-gradient(90deg, $accent-color, $primary-color, $accent-color);
}

.float-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md $spacing-lg;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: #fff;
  cursor: move;
}

.float-title {
  font-size: $font-size-base;
  font-weight: 600;
}

.float-close {
  color: #fff !important;
  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }
}

.float-body {
  padding: $spacing-lg;
}

.float-image {
  width: 100%;
  height: 140px;
  border-radius: $card-radius-sm;
  margin-bottom: $spacing-md;
}

.float-content {
  font-size: $font-size-base;
  color: $text-primary;
  margin: 0 0 $spacing-md 0;
  line-height: $line-height-relaxed;
}

.float-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: $font-size-base;
  color: $primary-light;
  text-decoration: none;
  font-weight: 500;
  padding: $spacing-sm $spacing-md;
  background: rgba($primary-light, 0.06);
  border-radius: $card-radius-sm;
  transition: all $transition-fast;

  &:hover {
    color: $primary-color;
    background: rgba($primary-light, 0.12);
  }
}

.float-fade-enter-active,
.float-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.float-fade-enter-from,
.float-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
