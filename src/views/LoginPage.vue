<script setup lang="ts">
import { useRouter } from 'vue-router'
import { resetOrder } from '@/store/order'

const router = useRouter()

function go() {
  resetOrder()
  router.push('/region')
}
</script>

<template>
  <div class="container">
    <div class="hero">
      <div class="card card-pad member">
        <div class="avatar">YN</div>
        <div class="info">
          <div class="title">欢迎加入 courage轻餐</div>
          <div class="desc">享受更多会员权益</div>
        </div>
        <button class="join" @click="go">立即进入</button>
      </div>
      <div class="card card-pad login">
        <div class="row">
          <div>
            <div class="h1">登录/注册</div>
          </div>
          <span class="pill">v1.0</span>
        </div>
        <div class="divider" />
        <div class="grid" style="grid-template-columns: 1fr; gap: 10px">
          <div class="field">
            <div class="label">手机号</div>
            <input class="input" placeholder="用于演示，无需真实输入" />
          </div>
          <div class="field">
            <div class="label">验证码</div>
            <input class="input" placeholder="0000" />
          </div>
          <button class="btn" @click="go">进入点餐流程</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero{display:flex; flex-direction:column; gap: 14px}
.mut{margin-top:6px; font-size:12px; color: rgba(15,23,42,.62)}
.hint{font-size:12px; color: rgba(15,23,42,.56); text-align:center}

.member{display:flex; align-items:center; gap: 12px}
.avatar{height:42px; width:42px; border-radius: 14px; display:grid; place-items:center; font-weight: 900; color: rgba(0,112,74,.95); background: rgba(0,112,74,.12); border: 1px solid rgba(0,112,74,.16)}
.info{flex:1}
.title{font-weight: 900}
.desc{margin-top:4px; font-size: 12px; color: rgba(15,23,42,.56)}
.join{border:0; border-radius: 999px; padding:10px 12px; background: rgba(0,112,74,.10); color: rgba(0,112,74,.95); font-weight: 850; cursor:pointer}
.join:active{transform: translateY(1px)}

.tile{cursor:pointer}
.login{background: rgba(255,255,255,.92)}
</style>
