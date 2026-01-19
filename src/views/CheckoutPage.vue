<script setup lang="ts">
import { computed } from 'vue'
import {
  deliveryFee,
  deliveryFeePerMeal,
  MEAL_CONFIG,
  orderState,
  subtotal,
  total,
  type MealType,
} from '@/store/order'

const items = computed(() => {
  const types: MealType[] = ['fatloss', 'bulking']
  return types
    .filter((t) => orderState.mealQty[t] > 0)
    .map((t) => {
      const cfg = MEAL_CONFIG[t]
      const sel = orderState.selections[t]
      const freeNames = cfg.free.filter((f) => sel.freeSelected.has(f.id)).map((f) => f.name)
      const paidNames = cfg.paid.filter((p) => sel.paidSelected.has(p.id)).map((p) => `${p.name}+¥${p.price}`)
      const snackNames = cfg.snacks
        .filter((s) => sel.snacksSelected.has(s.id))
        .map((s) => {
          switch (s.id) {
            case 'chicken_leg':
              return `${s.name}(${sel.chickenMode})+¥${s.price}`
            case 'egg':
              return `${s.name}(${sel.eggMethod})+¥${s.price}`
            case 'milk':
              return `${s.name}(默认真空)+¥${s.price}`
          }
        })

      return {
        t,
        title: cfg.title,
        qty: orderState.mealQty[t],
        base: cfg.basePrice,
        diet: sel.dietRule === '正常制作' ? '正常制作' : `其他：${sel.dietOther || '（未填写）'}`,
        free: freeNames,
        paid: paidNames,
        snacks: snackNames,
        note: sel.note,
      }
    })
})

const canPay = computed(() => Boolean(orderState.region) && items.value.length > 0)

function pay() {
  alert('演示完成')
}
</script>

<template>
  <div class="container checkout">
    <div class="section-title">订单结算</div>

    <div class="card card-pad">
      <div class="row">
        <div>
          <div class="h1">订单汇总</div>
          <div class="small">区域：{{ orderState.region ?? '未选择' }}（外送费：¥{{ deliveryFeePerMeal }}/份）</div>
        </div>
        <span class="pill">合计 ¥{{ total }}</span>
      </div>

      <div class="divider" />

      <div v-if="items.length === 0" class="small" style="text-align:center; padding: 12px 0">
        还没有选择套餐份数。
      </div>

      <div v-for="it in items" :key="it.t" class="detail">
        <div class="row">
          <div style="font-weight: 900">{{ it.title }}</div>
          <div class="pill">× {{ it.qty }}</div>
        </div>

        <div class="lines">
          <div class="line"><span>忌口</span><b>{{ it.diet }}</b></div>
          <div class="line"><span>免费搭配</span><b>{{ it.free.length ? it.free.join('、') : '无' }}</b></div>
          <div class="line"><span>付费搭配</span><b>{{ it.paid.length ? it.paid.join('、') : '无' }}</b></div>
          <div class="line"><span>小食</span><b>{{ it.snacks.length ? it.snacks.join('、') : '无' }}</b></div>
          <div class="line"><span>备注</span><b>{{ it.note || '无' }}</b></div>
        </div>

        <div class="divider" />
      </div>

      <div class="kv"><div class="k">小计</div><div class="v">¥{{ subtotal }}</div></div>
      <div style="height:8px" />
      <div class="kv"><div class="k">外送费</div><div class="v">¥{{ deliveryFee }}</div></div>
      <div style="height:8px" />
      <div class="kv"><div class="k">合计</div><div class="v">¥{{ total }}</div></div>
    </div>

    <div class="footer-actions fixed">
      <div class="footer-inner">
        <div class="toolbar">
          <button class="btn" :disabled="!canPay" @click="pay">下单</button>
        </div>
      </div>
      <!-- <div class="small" style="margin-top:8px; text-align:center">价格公式：套餐单价×份数 + 付费搭配×份数 + 小食×份数 + 外送费×总份数</div> -->
    </div>
  </div>
</template>

<style scoped>
.checkout{
  padding-bottom: calc(92px + env(safe-area-inset-bottom));
}
.detail{padding: 10px 0}
.lines{display:flex; flex-direction:column; gap:8px; margin-top: 10px}
.line{display:flex; justify-content:space-between; gap:10px; font-size: 13px}
.line span{color: rgba(15,23,42,.62)}
.line b{font-weight: 800; text-align:right; max-width: 70%}
button:disabled{opacity:.45; cursor:not-allowed}
</style>
