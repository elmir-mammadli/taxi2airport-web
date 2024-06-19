<template>
  <div
    id="navbar-language"
    class="items-center justify-between hidden w-full lg:flex md:w-auto z-10"
  >
    <ul
      class="flex flex-col text-[15px] font-medium p-4 md:p-0 text-black bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
    >
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="handleItemLink(item.link)"
          aria-current="page"
          class="py-3 px-5 text-gray-800 hover:underline"
          @click="handleCustomScroll(item.link)"
        >
          {{ item.item }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useNavbarItems } from '../types/NavBar'

const { items: navItems } = useNavbarItems()
const route = useRoute()
const router = useRouter()
console.log('Laman:', route.fullPath)

const handleCustomScroll = (sectionId: string) => {
  scroll(sectionId)
}

const handleItemLink = (link: string) => {
  switch (true) {
    case link.includes('/'):
      return link
    case route.fullPath.includes('/about'):
      return `/#${link}`
    default:
      return 'javascript:void(0)'
  }
}

const { scroll } = useScroll()
</script>
