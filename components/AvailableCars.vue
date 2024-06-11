<template>
  <div
    id="available-cars"
    class="flex flex-col items-center mt-[120px] scroll-mt-20"
  >
    <p class="uppercase text-[14px] md:text-[16px] text-custom-blue font-bold">
      {{ $t('cars.title') }}
    </p>
    <h1
      class="text-[26px] md:text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4] px-5 sm:px-0"
      v-html="$t('cars.header')"
    />
  </div>
  <div
    class="max-w-[1024px] mx-auto flex flex-col xl:flex-row items-center justify-center gap-10 mt-[40px] px-5"
  >
    <AvailableCarsCard v-for="(item, index) in details" :key="index" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { details } from '~/components/data/formData'
</script>
