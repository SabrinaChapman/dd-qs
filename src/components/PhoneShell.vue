<script setup lang="ts">
import BrandMark from './BrandMark.vue'
</script>

<template>
  <div class="shell">
    <div class="phone">
      <div class="status">
        <div class="left">15:57</div>
        <div class="right">5G ▮▮▮  🔋</div>
      </div>

      <div class="content">
        <div class="brand">
          <BrandMark />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shell{
  min-height: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 24px 12px;
}
.phone{
  width: 390px;
  max-width: 94vw;
  border-radius: 42px;
  overflow:hidden;
  background: transparent;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,.18);
}
.status{
  height: 46px;
  padding: 0 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  color: rgba(255,255,255,.92);
  font-weight: 650;
  font-size: 12px;
}
.content{padding-bottom: 10px}
.brand{padding: 6px 0 0}
</style>
