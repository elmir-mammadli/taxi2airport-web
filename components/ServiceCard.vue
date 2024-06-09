<script setup lang="ts">
import type { Details } from './data/formData'
defineProps<{
  item: Details;
}>()
</script>
<template>
  <NuxtLink to="#bookForm">
    <div
      class="flex flex-col items-center justify-center py-8 px-10 rounded-lg bg-gray-100 hover:shadow-md hover:-translate-y-2 transition-all duration-200 group cursor-pointer"
    >
      <p
        class="text-[24px] font-bold text-gray-800 italic capitalize tracking-tight"
      >
        {{ item.name }}
      </p>
      <img :src="item.img" alt="service img" class="w-[180px] mt-12">
      <div class="flex flex-col items-start mt-6 text-gray-700">
        <p class="font-normal mt-2">
          👫 Up to <b>{{ item.person }}</b> Passengers
        </p>
        <p class="font-normal mt-2">
          🛄 <b>{{ item.luggage }}</b> Suitcases
        </p>
        <p class="font-normal mt-2">
          <span class="font-semibold">🕒 45 mins</span> Free Wait Time
        </p>
        <p class="font-normal mt-2">
          💰 Budget-Friendly Rates
        </p>
        <p class="font-normal mt-2">
          💼 Ample Luggage Space
        </p>
        <p class="font-normal mt-2">
          🌟 Professional & Friendly Drivers
        </p>
        <p class="font-normal mt-2">
          🔒 Safe & Secure Travel
        </p>
      </div>

      <button
        class="w-[260px] bg-green-custom-green text-white font-semibold text-[18px] px-12 py-4 rounded-lg mt-8 group-hover:bg-custom-blue group-hover:bg-opacity-95 transition .4s ease-all"
      >
        {{ $t('reservation.button') }}
      </button>
    </div>
  </NuxtLink>
</template>
