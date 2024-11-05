<script setup lang="ts">
import { chatIcons } from '@/types/ChatIcons'

const areChatIconsHidden = ref(false)

</script>
<template>
  <div>
    <div v-if="!areChatIconsHidden" class="grid grid-cols-2 md:grid-cols-1 gap-4 relative">
      <div v-for="(item, index) in chatIcons" :key="index" class="bg-gray-100 rounded-lg ring-1 ring-gray-300 p-2 group">
        <NuxtLink class="hover:underline flex gap-x-2" :to="item.link" target="_blank">
          <Icon :name="item.icon" size="32" />
        </NuxtLink>
      </div>
      <div>
        <button class="absolute bg-gray-100 rounded-lg ring-1 ring-gray-300 size-5 flex items-center justify-center -top-7 md:-top-7 -right-5" @click="areChatIconsHidden = !areChatIconsHidden">
          <Icon name="mdi:close" size="12" />
        </button>
      </div>
    </div>
  </div>
</template>
