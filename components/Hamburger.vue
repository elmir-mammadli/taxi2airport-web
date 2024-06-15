<script setup lang="ts">
import { useNavbarItems } from '../types/NavBar'

const isMenu = ref(false)
const { $t } = useLanguage()

const toggleMenu = () => {
  emit('closeMenu')
  isMenu.value = !isMenu.value
}

const emit = defineEmits(['closeMenu'])
const { items: navItems } = useNavbarItems()
</script>

<template>
  <div class="">
    <div class="flex items-center gap-x-2">
      <NavbarLanguage class="z-0" />
      <button @click="toggleMenu">
        <Icon name="zondicons:menu" size="25" color="5A5A5A" />
      </button>
    </div>
    <TransitionGroup v-if="isMenu" class="">
      <div
        class="fixed w-full left-0 top-0 bg-gray-100 flex flex-col items-center h-screen justify-center gap-y-2"
      >
        <button
          class="absolute top-14 z-10 right-4 text-black"
          @click="isMenu = false"
        >
          <Icon name="mdi:close" size="40" color="5A5A5A" />
        </button>
        <div v-for="(item, index) in navItems" :key="index">
          <NuxtLink :to="`#${item.link}`" @click="toggleMenu">
            {{ item.item }}
          </NuxtLink>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
