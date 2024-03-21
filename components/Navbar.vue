<template>
  <header>
    <div>
      <nav class="max-w-screen-xl mx-auto bg-gray-600 bg-transparent transition-all .3s ease-in"
      >
      <div class="flex flex-wrap items-center justify-between mx-auto pt-8">
      <a href="/" class="flex items-center z-10">
      <span class="text-[28px] tracking-[-0px] text-gray-800">
        <span class="font-semibold text-gray-800">taxi</span><span class="font-semibold text-orange-400">2</span><span class="lowercase font-semibold">airport</span>
      </span>
  </a>
<NavItems />
<div class="flex relative z-10 items-center gap-x-4">
  <Button @click="triggerShake" :label="$t('navbar.button')" class="bg-orange-500 text-white font-semibold text-[15px] px-7 py-2.5 rounded-xl hover:bg-orange-600 transition .4s ease-all" />
  <NavbarLanguage />
</div>
  </div>
</nav>
</div>
  </header>
</template>
<script lang="ts" setup>

import NavItems from './NavItems.vue';
import NavbarLanguage from './NavbarLanguage.vue';

import { useShakeStore } from '../stores/useShakeStore'
const shakeStore = useShakeStore()

function triggerShake() {
  shakeStore.triggerShake()
}

const resize = ref(false)



const handleScroll = () => {
  if(window.scrollY > 50) {
    resize.value = true
  } else {
    resize.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>