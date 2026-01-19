<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { MEAL_CONFIG, orderState, type MealType } from '@/store/order'

const router = useRouter()

const props = defineProps<{ mealType: MealType }>()

const cfg = computed(() => MEAL_CONFIG[props.mealType])
const sel = computed(() => orderState.selections[props.mealType])

const qty = computed(() => orderState.mealQty[props.mealType])

function toggleSet(set: Set<string>, id: string) {
  if (set.has(id)) set.delete(id)
  else set.add(id)
}

function goCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <div class="container">
    <div class="section-title">套餐详情定制</div>

    <div class="card card-pad">
      <div class="row">
        <div>
          <div class="h1">{{ cfg.title }} · 详情配置</div>
          <div class="small">当前份数：{{ qty }}（在套餐页调整）</div>
        </div>
        <span class="pill">¥{{ cfg.basePrice }}/份</span>
      </div>

      <div class="divider" />

      <div class="block">
        <div class="st">饮食忌口</div>
        <div class="chips">
          <button class="chip" :aria-pressed="sel.dietRule === '正常制作'" @click="sel.dietRule = '正常制作'">
            正常制作
          </button>
          <button class="chip" :aria-pressed="sel.dietRule === '其他要求'" @click="sel.dietRule = '其他要求'">
            其他要求
          </button>
        </div>
        <input v-if="sel.dietRule === '其他要求'" class="input" style="margin-top:10px" placeholder="例如：不吃辣、少盐…" v-model="sel.dietOther" />
      </div>

      <div class="block">
        <div class="st">免费搭配（多选）</div>
        <div class="chips">
          <button
            v-for="f in cfg.free"
            :key="f.id"
            class="chip"
            :aria-pressed="sel.freeSelected.has(f.id)"
            @click="toggleSet(sel.freeSelected, f.id)"
          >
            {{ f.name }}
          </button>
        </div>
      </div>

      <div class="block">
        <div class="st">付费搭配（多选）</div>
        <div class="chips">
          <button
            v-for="p in cfg.paid"
            :key="p.id"
            class="chip"
            :aria-pressed="sel.paidSelected.has(p.id)"
            @click="toggleSet(sel.paidSelected, p.id)"
          >
            {{ p.name }} +¥{{ p.price }}
          </button>
        </div>
      </div>

      <div class="block">
        <div class="st">其他备注</div>
        <input class="input" placeholder="例如：汤分开装…" v-model="sel.note" />
      </div>

      <div class="block">
        <div class="st">courage轻餐小点（额外收费）</div>
        <div class="chips">
          <button
            v-for="s in cfg.snacks"
            :key="s.id"
            class="chip"
            :aria-pressed="sel.snacksSelected.has(s.id)"
            @click="toggleSet(sel.snacksSelected, s.id)"
          >
            {{ s.name }} +¥{{ s.price }}
          </button>
        </div>

        <div v-if="sel.snacksSelected.has('chicken_leg')" class="subblock">
          <div class="subt">鸡腿处理方式</div>
          <div class="chips">
            <button class="chip" :aria-pressed="sel.chickenMode === '真空打包'" @click="sel.chickenMode = '真空打包'">真空打包</button>
            <button class="chip" :aria-pressed="sel.chickenMode === '跟餐一起'" @click="sel.chickenMode = '跟餐一起'">跟餐一起</button>
          </div>
        </div>

        <div v-if="sel.snacksSelected.has('egg')" class="subblock">
          <div class="subt">鸡蛋做法</div>
          <div class="chips">
            <button class="chip" :aria-pressed="sel.eggMethod === '炒蛋'" @click="sel.eggMethod = '炒蛋'">炒蛋</button>
            <button class="chip" :aria-pressed="sel.eggMethod === '水煮蛋'" @click="sel.eggMethod = '水煮蛋'">水煮蛋</button>
          </div>
        </div>

        <div class="small" style="margin-top:10px">牛奶盒：默认真空（不可更改）</div>
      </div>
    </div>

    <div class="footer-actions">
      <div class="toolbar">
        <button class="btn" @click="goCheckout">保存并去结算</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block{margin-top: 14px}
.st{font-weight: 850; font-size: 13px; color: rgba(15,23,42,.84)}
.chips{display:flex; flex-wrap:wrap; gap:10px; margin-top: 10px}
.subblock{margin-top: 12px; padding: 10px; border-radius: 14px; background: rgba(0,112,74,.06); border: 1px solid rgba(0,112,74,.12)}
.subt{font-size: 12px; font-weight: 850; color: rgba(0,112,74,.92)}
</style>
