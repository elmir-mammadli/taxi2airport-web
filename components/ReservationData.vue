<template>
  <div
    v-for="(step, index) in reservationsData"
    :key="index"
    class="flex flex-row items-center"
  >
    <div class="flex flex-col md:flex-row items-center justify-center">
      <div
        :class="[chapter > index ? 'bg-custom-blue' : 'bg-gray-200']"
        class="w-8 h-8 rounded-full flex items-center font-semibold justify-center text-white"
      >
        {{ index + 1 }}
      </div>
      <div class="flex-grow hidden md:block h-1 bg-gray-400 text-[12px] mx-2" />
      <div class="text-[12px] md:text-[16px]">
        {{ $t(step.step) }}
      </div>
    </div>
    <div
      v-if="index !== reservationsData.length - 1"
      class="h-[1px] bg-gray-400 w-[10px] mb-[24px] md:mb-0 md:w-[48px] xl:w-[150px] mx-4"
    />
  </div>
</template>

<script setup lang="ts">
import { reservationsData } from './data/formData'

defineProps<{
  chapter: number;
}>()
</script>
