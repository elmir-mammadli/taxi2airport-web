<template>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto z-10" id="navbar-language">
    <ul
    class="flex flex-col text-[15px] font-medium p-4 md:p-0 text-black bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li 
      v-for="(item, index) in items" :key="index"
      >
        <NuxtLink :to="item.link" aria-current="page"
        class="py-3 px-5 text-gray-800 hover:bg-gray-50 hover:ring-gray-100 hover:rounded-full hover:drop-shadow-md"
        >
            {{ item.item }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n()

const items = computed(() => [
    {
        item: $t('navbar.services'),
        link: '/services'
    },
    {
        item: $t('navbar.price'),
        link: '/about'
    },
    {
        item: $t('navbar.about'),
        link: '/about'
    },
    {
        item: $t('navbar.faq'),
        link: '#faq'
    },
    {
        item: $t('navbar.contact'),
        link: '/contact'
    }
])

</script>