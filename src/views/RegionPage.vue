<script setup lang="ts">
import { useRouter } from 'vue-router'
import { orderState, type Region } from '@/store/order'

const router = useRouter()

function pick(region: Region) {
  orderState.region = region
  router.push('/meal-type')
}
</script>

<template>
  <div class="container">
    <div class="section-title">区域选择</div>

    <div class="card card-pad">
      <div class="row">
        <div>
          <div class="h1">请选择配送区域</div>
          <div class="small">未选择区域前无法进入点餐流程</div>
        </div>
        <span class="pill">必选</span>
      </div>

      <div class="divider" />

      <div class="grid">
        <button class="tile" @click="pick('坂田')" style="text-align:left; border:0; cursor:pointer">
          <div>
            <div class="t">坂田</div>
            <div class="d">外送费：¥5 / 份</div>
          </div>
          <div class="badge">📍</div>
        </button>
        <button class="tile" @click="pick('福田')" style="text-align:left; border:0; cursor:pointer">
          <div>
            <div class="t">福田</div>
            <div class="d">外送费：¥6 / 份</div>
          </div>
          <div class="badge">📍</div>
        </button>
      </div>
    </div>

    <div class="section-title">当前选择</div>
    <div class="card card-pad">
      <div class="kv"><div class="k">区域</div><div class="v">{{ orderState.region ?? '未选择' }}</div></div>
    </div>
  </div>
</template>
