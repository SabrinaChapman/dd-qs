import type { RouteRecordRaw } from 'vue-router'

import LoginPage from './views/LoginPage.vue'
import RegionPage from './views/RegionPage.vue'
import MealTypePage from './views/MealTypePage.vue'
import FatlossCustomizePage from './views/FatlossCustomizePage.vue'
import BulkingCustomizePage from './views/BulkingCustomizePage.vue'
import CheckoutPage from './views/CheckoutPage.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/region', component: RegionPage },
  { path: '/meal-type', component: MealTypePage },
  { path: '/customize/fatloss', component: FatlossCustomizePage },
  { path: '/customize/bulking', component: BulkingCustomizePage },
  { path: '/checkout', component: CheckoutPage },
]
