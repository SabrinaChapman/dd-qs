import { computed, reactive } from 'vue'

export type Region = '坂田' | '福田'
export type MealType = 'fatloss' | 'bulking'

export type Packaging = '真空打包' | '跟餐一起'
export type EggMethod = '炒蛋' | '水煮蛋'

export type PaidAddon = { id: string; name: string; price: number }
export type FreeAddon = { id: string; name: string }

export type SnackItem =
  | { id: 'chicken_leg'; name: '鸡腿'; price: number; mode?: Packaging }
  | { id: 'egg'; name: '鸡蛋'; price: number; method?: EggMethod }
  | { id: 'milk'; name: '牛奶盒'; price: number; mode: '默认真空'; locked: true }

export type MealConfig = {
  type: MealType
  title: string
  basePrice: number
  free: FreeAddon[]
  paid: PaidAddon[]
  snacks: SnackItem[]
}

export const MEAL_CONFIG: Record<MealType, MealConfig> = {
  fatloss: {
    type: 'fatloss',
    title: '减脂餐',
    basePrice: 28,
    free: [
      { id: 'salad', name: '蔬菜沙拉' },
      { id: 'brown_rice', name: '糙米饭' },
      { id: 'broccoli', name: '西兰花' },
      { id: 'cucumber', name: '黄瓜片' },
    ],
    paid: [
      { id: 'sesame', name: '芝麻', price: 2 },
      { id: 'pepper', name: '胡椒粉', price: 2 },
      { id: 'teriyaki', name: '日式照烧汁', price: 3 },
    ],
    snacks: [
      { id: 'chicken_leg', name: '鸡腿', price: 8 },
      { id: 'egg', name: '鸡蛋', price: 3 },
      { id: 'milk', name: '牛奶盒', price: 6, mode: '默认真空', locked: true },
    ],
  },
  bulking: {
    type: 'bulking',
    title: '增肌餐',
    basePrice: 32,
    free: [
      { id: 'no_oil', name: '不要油' },
      { id: 'salad', name: '蔬菜沙拉' },
      { id: 'brown_rice', name: '糙米饭' },
      { id: 'broccoli', name: '西兰花' },
    ],
    paid: [
      { id: 'tahini', name: '芝麻酱', price: 3 },
      { id: 'chashu', name: '日式叉烧', price: 8 },
      { id: 'cheese', name: '奶酪片', price: 5 },
    ],
    snacks: [
      { id: 'chicken_leg', name: '鸡腿', price: 8 },
      { id: 'egg', name: '鸡蛋', price: 3 },
      { id: 'milk', name: '牛奶盒', price: 6, mode: '默认真空', locked: true },
    ],
  },
}

export type MealSelection = {
  type: MealType
  qty: number

  dietRule: '正常制作' | '其他要求'
  dietOther: string

  freeSelected: Set<string>
  paidSelected: Set<string>

  note: string

  snacksSelected: Set<string>
  chickenMode: Packaging
  eggMethod: EggMethod
}

export const orderState = reactive({
  region: null as Region | null,
  mealQty: {
    fatloss: 0,
    bulking: 0,
  } as Record<MealType, number>,

  selections: {
    fatloss: {
      type: 'fatloss',
      qty: 1,
      dietRule: '正常制作',
      dietOther: '',
      freeSelected: new Set<string>(),
      paidSelected: new Set<string>(),
      note: '',
      snacksSelected: new Set<string>(),
      chickenMode: '真空打包',
      eggMethod: '水煮蛋',
    } satisfies MealSelection,
    bulking: {
      type: 'bulking',
      qty: 1,
      dietRule: '正常制作',
      dietOther: '',
      freeSelected: new Set<string>(),
      paidSelected: new Set<string>(),
      note: '',
      snacksSelected: new Set<string>(),
      chickenMode: '真空打包',
      eggMethod: '水煮蛋',
    } satisfies MealSelection,
  } as Record<MealType, MealSelection>,
})

export const deliveryFeePerMeal = computed(() => {
  if (orderState.region === '坂田') return 5
  if (orderState.region === '福田') return 6
  return 0
})

function calcSelectionPrice(mealType: MealType) {
  const cfg = MEAL_CONFIG[mealType]
  const sel = orderState.selections[mealType]
  const qty = Math.max(0, orderState.mealQty[mealType])

  const paidAddonSum = cfg.paid
    .filter((p) => sel.paidSelected.has(p.id))
    .reduce((sum, p) => sum + p.price, 0)

  const snackSum = cfg.snacks
    .filter((s) => sel.snacksSelected.has(s.id))
    .reduce((sum, s) => sum + s.price, 0)

  return (cfg.basePrice + paidAddonSum + snackSum) * qty
}

export const subtotal = computed(() => calcSelectionPrice('fatloss') + calcSelectionPrice('bulking'))
export const deliveryFee = computed(() => (orderState.mealQty.fatloss + orderState.mealQty.bulking) * deliveryFeePerMeal.value)
export const total = computed(() => subtotal.value + deliveryFee.value)

export function resetOrder() {
  orderState.region = null
  orderState.mealQty.fatloss = 0
  orderState.mealQty.bulking = 0

  for (const type of ['fatloss', 'bulking'] as const) {
    const sel = orderState.selections[type]
    sel.qty = 1
    sel.dietRule = '正常制作'
    sel.dietOther = ''
    sel.freeSelected = new Set<string>()
    sel.paidSelected = new Set<string>()
    sel.note = ''
    sel.snacksSelected = new Set<string>()
    sel.chickenMode = '真空打包'
    sel.eggMethod = '水煮蛋'
  }
}
