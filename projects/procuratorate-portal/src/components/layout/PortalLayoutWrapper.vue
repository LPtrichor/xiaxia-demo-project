<template>
  <div class="portal-layout-wrapper">
    <PortalHeader />
    <main class="portal-main">
      <router-view />
    </main>
    <PortalFooter />
  </div>
</template>

<script setup lang="ts">
import PortalHeader from '@/components/layout/PortalHeader.vue'
import PortalFooter from '@/components/layout/PortalFooter.vue'
</script>

<style lang="scss" scoped>
.portal-layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $bg-page;
}

.portal-main {
  flex: 1;
  background: $bg-page;
}
</style>
