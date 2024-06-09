<script setup lang="ts">
import { details } from './data/formData';
import ServiceCard from '~/components/ServiceCard.vue';

const cardItems = details;
</script>
<template>
  <div
    id="available-cars"
    class="flex flex-col items-center scroll-mt-[64px] mt-[120px]"
  >
    <p class="text-[16px] capitalize text-custom-blue font-bold">
      {{ $t('cars.title') }}
    </p>
    <h1
      class="text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4]"
      v-html="$t('cars.header')"
    />
  </div>
  <div
    class="max-w-[720px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-y-12 mt-[64px]"
  >
    <ServiceCard
      v-for="(item, index) in cardItems"
      :key="index"
      :item="item"
      class=""
    />
  </div>
</template>
