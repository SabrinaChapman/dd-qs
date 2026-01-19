<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandMark from './components/BrandMark.vue'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/login')
const showBack = computed(() => route.path !== '/login')
const fallbackPath = computed(() => {
  const path = route.path
  if (path === '/region') return '/login'
  if (path === '/meal-type') return '/region'
  if (path.startsWith('/customize/')) return '/meal-type'
  if (path === '/checkout') return '/meal-type'
  return '/login'
})

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push(fallbackPath.value)
}
</script>

<template>
  <div class="app">
    <header class="top">
      <div class="top-inner" :class="{ home: isHome }">
        <template v-if="isHome">
          <div class="brand-enter">
            <BrandMark />
          </div>
        </template>
        <template v-else>
          <button v-if="showBack" class="nav-back" type="button" aria-label="返回" @click="goBack">&lt;</button>
        </template>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app{min-height: 100vh}
.top{
  position: sticky;
  top: 0;
  z-index: 60;
  padding: calc(8px + env(safe-area-inset-top)) 0 8px;
  background: linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,0));
  backdrop-filter: blur(10px);
}
.top-inner{
  max-width: 620px;
  margin: 0 auto;
  padding: 0 18px;
  display:flex;
  align-items:center;
  gap: 10px;
}
.top-inner.home{
  justify-content: center;
}

.brand-enter{
  /* keep layout centered; animate only the icon inside */
}

.brand-enter :deep(.logo){
  animation: brand-hop-in 1000ms cubic-bezier(.18,.9,.12,1) both;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

@keyframes brand-hop-in{
  0%{opacity: 0; transform: translateX(140px) translateY(0) scale(.92)}
  14%{opacity: 1; transform: translateX(95px) translateY(-10px) scale(.98)}
  28%{transform: translateX(52px) translateY(0) scale(1)}
  42%{transform: translateX(20px) translateY(-18px) scale(1.01)}
  55%{transform: translateX(6px) translateY(0) scale(1)}
  68%{transform: translateX(0) translateY(-14px) scale(1.005)}
  80%{transform: translateX(0) translateY(0) scale(1)}
  90%{transform: translateX(0) translateY(-6px) scale(1)}
  100%{opacity: 1; transform: translateX(0) translateY(0) scale(1)}
}

@media (prefers-reduced-motion: reduce){
  .brand-enter :deep(.logo){animation: none}
}
.nav-back{
  height: 44px;
  width: 44px;
  border: 0;
  background: transparent;
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 28px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: .92;
  text-shadow: 0 10px 22px rgba(0,0,0,.32);
}
.nav-back:hover{opacity: 1}
.nav-back:active{transform: translateY(1px) translateX(-1px)}
.top-title{color: rgba(255,255,255,.92); font-weight: 850; letter-spacing: .2px}
.main{max-width: 620px; margin: 0 auto}
</style>
