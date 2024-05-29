<template>
  <header>
    <div>
      <nav
        class="max-w-screen-xl mx-auto bg-gray-600 bg-transparent transition-all .3s ease-in"
      >
        <div class="flex items-center mx-auto pt-8 justify-between px-5">
          <NuxtLink to="/" class="flex items-center z-10">
            <span class="text-[28px] tracking-[-0px] text-gray-800">
              <span class="font-semibold text-gray-800">taxi</span><span class="font-semibold text-custom-blue">2</span><span class="lowercase font-semibold">airport</span>
            </span>
          </NuxtLink>
          <Hamburger class="block lg:hidden z-[9999]" />
          <NavItems />
          <div class="lg:flex relative z-10 items-center gap-x-4 hidden">
            <Button
              :label="$t('navbar.button')"
              class="bg-custom-blue text-white font-semibold text-[15px] px-7 py-2.5 rounded-xl hover:bg-opacity-80 transition .4s ease-all"
              @click="triggerShake"
            />
            <NavbarLanguage class="z-30" />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useShakeStore } from '../stores/useShakeStore'
import NavItems from './NavItems.vue'
import Hamburger from './Hamburger.vue'
import NavbarLanguage from './NavbarLanguage.vue'

const shakeStore = useShakeStore()

function triggerShake () {
  shakeStore.triggerShake()
}

const resize = ref(false)

const handleScroll = () => {
  if (window.scrollY > 50) {
    resize.value = true
  } else {
    resize.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>
