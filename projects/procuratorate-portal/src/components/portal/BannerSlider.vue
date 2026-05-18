<template>
  <section class="banner-slider">
    <el-carousel
      :interval="5000"
      arrow="always"
      height="380px"
      indicator-position="outside"
      motion-blur
    >
      <el-carousel-item v-for="slide in slides" :key="slide.id">
        <div class="slide-item" :style="{ background: slide.gradient }">
          <!-- 装饰纹理 -->
          <div class="slide-pattern"></div>
          <!-- 装饰圆环 -->
          <div class="slide-circle slide-circle-1"></div>
          <div class="slide-circle slide-circle-2"></div>
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <div class="slide-line"></div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup lang="ts">
import { useBannerData } from '@/composables/useMockData'

const slides = useBannerData()
</script>

<style lang="scss" scoped>
.banner-slider {
  margin-bottom: $spacing-xl;
  border-radius: $card-radius;
  overflow: hidden;
  box-shadow: $shadow-md;

  :deep(.el-carousel__container) {
    border-radius: $card-radius;
    overflow: hidden;
  }

  :deep(.el-carousel__arrow) {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 20px;
    transition: all $transition-base;

    &:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.1);
    }

    &.el-carousel__arrow--left {
      left: 24px;
    }

    &.el-carousel__arrow--right {
      right: 24px;
    }
  }

  :deep(.el-carousel__indicator) {
    padding: 12px 6px;

    button {
      width: 24px;
      height: 3px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.4);
      transition: all $transition-base;
    }

    &.is-active button {
      width: 36px;
      background: #fff;
    }
  }

  :deep(.el-carousel__indicators--outside) {
    bottom: -36px;
  }
}

.slide-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.slide-pattern {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.slide-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;

  &-1 {
    width: 300px;
    height: 300px;
    top: -80px;
    right: -60px;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
  }

  &-2 {
    width: 200px;
    height: 200px;
    bottom: -40px;
    left: 10%;
    background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%);
  }
}

.slide-content {
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 1;
  padding: $spacing-xl;
  animation: slideIn 0.6s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-title {
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 $spacing-sm 0;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  letter-spacing: 4px;
  line-height: 1.3;
}

.slide-subtitle {
  font-size: 18px;
  margin: 0 0 $spacing-md 0;
  opacity: 0.85;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.slide-line {
  width: 60px;
  height: 3px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .banner-slider :deep(.el-carousel__container) {
    height: 200px !important;
  }
  .slide-title {
    font-size: 22px;
    letter-spacing: 2px;
  }
  .slide-subtitle {
    font-size: 13px;
  }
  .slide-circle-1 {
    width: 150px;
    height: 150px;
  }
  .slide-circle-2 {
    display: none;
  }
}
</style>
