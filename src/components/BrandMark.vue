<template>
  <div class="mark">
    <svg class="logo" viewBox="0 0 120 120" aria-hidden="true">
      <path
        d="M36 42c0-8 6-14 14-14h20c8 0 14 6 14 14v7c0 8-6 14-14 14H56"
        fill="none"
        stroke="rgba(255,255,255,.86)"
        stroke-width="8"
        stroke-linecap="round"
      />
      <path
        d="M44 61v22c0 6 5 11 11 11h10c6 0 11-5 11-11V58"
        fill="none"
        stroke="rgba(255,255,255,.86)"
        stroke-width="8"
        stroke-linecap="round"
      />
      <path
        d="M70 20c7 7 7 13 0 20"
        fill="none"
        stroke="rgba(255,255,255,.72)"
        stroke-width="6"
        stroke-linecap="round"
      />
    </svg>

    <div class="word">courage轻餐</div>
    <div class="sub">健康轻食定制点餐（静态展示）</div>
  </div>
</template>

<style scoped>
.mark{display:flex; flex-direction:column; align-items:center; gap:6px; padding: 8px 0 10px}
.logo{width: 78px; height: 78px}
.word{color: rgba(255,255,255,.94); font-weight: 850; letter-spacing: .8px}
.sub{color: rgba(255,255,255,.70); font-size: 12px}
</style>
