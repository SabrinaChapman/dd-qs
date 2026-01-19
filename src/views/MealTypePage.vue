<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { orderState } from '@/store/order'

const router = useRouter()

const canNext = computed(() => {
  return Boolean(orderState.region) && (orderState.mealQty.fatloss + orderState.mealQty.bulking > 0)
})

function dec(type: 'fatloss' | 'bulking') {
  orderState.mealQty[type] = Math.max(0, orderState.mealQty[type] - 1)
}

function inc(type: 'fatloss' | 'bulking') {
  orderState.mealQty[type] = orderState.mealQty[type] + 1
}

function goCustomize(type: 'fatloss' | 'bulking') {
  if (!orderState.region) return
  router.push(type === 'fatloss' ? '/customize/fatloss' : '/customize/bulking')
}

function goCheckout() {
  if (!canNext.value) return
  router.push('/checkout')
}
</script>

<template>
  <div class="container">
    <div class="section-title">套餐类型选择</div>

    <div class="card card-pad">
      <div class="row">
        <div>
          <div class="h1">选择本次订单餐型</div>
          <div class="small">支持混合选择：1份减脂 + 2份增肌</div>
        </div>
        <span class="pill">{{ orderState.region ?? '未选区域' }}</span>
      </div>

      <div class="divider" />

      <div class="grid" style="grid-template-columns: 1fr;">
        <div class="tile" style="min-height: unset">
          <div>
            <div class="t">减脂餐</div>
            <div class="d">轻负担 · 高饱腹 · 可选免费/付费搭配</div>
          </div>
          <div class="qty">
            <button class="round" @click="dec('fatloss')">-</button>
            <div class="num">{{ orderState.mealQty.fatloss }}</div>
            <button class="round" @click="inc('fatloss')">+</button>
          </div>
        </div>

        <div class="toolbar">
          <!-- <button class="btn" @click="goCustomize('fatloss')">配置减脂餐细节</button> -->
          <button class="btn" >配置减脂餐细节</button>
        </div>

        <div class="tile" style="min-height: unset">
          <div>
            <div class="t">增肌餐</div>
            <div class="d">高蛋白 · 足能量 · UI 结构与减脂餐一致</div>
          </div>
          <div class="qty">
            <button class="round" @click="dec('bulking')">-</button>
            <div class="num">{{ orderState.mealQty.bulking }}</div>
            <button class="round" @click="inc('bulking')">+</button>
          </div>
        </div>

        <div class="toolbar">
          <button class="btn" >配置增肌餐细节</button>
        </div>

        <button class="btn" :disabled="!canNext" @click="goCheckout">去结算</button>
        <div class="small">提示：未选择区域或份数为 0 时不可进入结算。</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qty{display:flex; align-items:center; gap:10px}
.round{
  height: 34px;
  width: 34px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,.10);
  background: rgba(255,255,255,.92);
  cursor:pointer;
  font-weight: 800;
}
.num{min-width: 18px; text-align:center; font-weight: 850}
button:disabled{opacity:.45; cursor:not-allowed}
</style>
