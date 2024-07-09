<script setup lang="ts">
import { type DataPopularDestinationsTypes } from '~/types/PopularLocationsSectionTypes'

const props = defineProps<{
  item: Pick<DataPopularDestinationsTypes, 'name' | 'finalPrice' | 'id'>
  changeCurrency: boolean
}>()

const currencySwitcher = computed(() => {
  return props.changeCurrency
})

const handleTravelPrice = (currency: keyof DataPopularDestinationsTypes['finalPrice']) => {
  if (currency === 'czk') {
    return `${props.item.finalPrice.czk} Kč`
  } else {
    return `${props.item.finalPrice.eur} EUR`
  }
}
</script>
<template>
  <div class="flex items-center justify-between bg-gray-100 text-gray-700 hover:text-white hover:bg-custom-blue cursor-pointer ease duration-200 rounded-lg p-5 h-[72px]">
    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-x-2 font-normal text-[14px] md:text-base">
      <p>Prague</p>
      <span class="hidden lg:block">
        <Icon name="ic:sharp-arrow-forward" size="20" />
      </span>
      <p>{{ item.name }}</p>
    </div>
    <div class="flex items-center gap-x-4 font-medium">
      <div class="flex flex-col justify-start">
        <p class="text-[16px]">
          {{ `${handleTravelPrice(!currencySwitcher ? 'czk' : 'eur')}` }}
        </p>
        <p class="text-[10px]">
          Starting from
        </p>
      </div>
      <Icon name="material-symbols:arrow-forward-ios" size="14" />
    </div>
  </div>
</template>
