<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { type DataPopularDestinationsTypes } from '@/types/popularLocationsSectionTypes'
import { chatIcons } from '~/types/ChatIcons'

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

const emit = defineEmits(['selectedIcon'])

const handleSelectedIcon = (icon: string) => {
  emit('selectedIcon', icon)
}

</script>

<template>
  <Popover class="relative">
    <div class="flex items-center justify-between bg-gray-100 text-gray-700 hover:text-white hover:bg-custom-blue ease duration-200 rounded-lg">
      <PopoverButton class="flex items-start justify-between w-full lg:items-center gap-x-2 p-4 font-normal text-[14px] md:text-base">
        <div class="flex flex-col lg:flex-row items-start gap-x-2">
          <p>Prague</p>
          <span class="hidden lg:block">
            <Icon name="ic:sharp-arrow-forward" size="20" />
          </span>
          <p>{{ item.name }}</p>
        </div>
        <div class="flex items-center gap-x-4 font-medium">
          <div class="flex flex-col items-center leading-4">
            <p class="text-[16px] leading-6">
              {{ `${handleTravelPrice(!currencySwitcher ? 'czk' : 'eur')}` }}
            </p>
            <p class="text-[10px]">
              Starting from
            </p>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" size="14" />
        </div>
      </PopoverButton>
    </div>
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute -right-3 top-16 z-10 bg-gray-100 ring-1 ring-gray-300 p-3 rounded-md flex flex-col gap-y-1">
        <div v-for="(icon, index) in chatIcons" :key="index" class="grid grid-cols-1 gap-y-2">
          <Button class="flex items-center gap-x-1 group" @click="handleSelectedIcon(icon.text)">
            <Icon :name="icon.icon" size="18" />
            <p class="group-hover:underline">
              {{ icon.text }}
            </p>
          </Button>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
