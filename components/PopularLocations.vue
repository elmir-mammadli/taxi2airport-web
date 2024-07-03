<template>
  <div
    loading="lazy"
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-duration="600"
    class="flex flex-col items-center max-w-[1124px] mx-auto mt-32 -z-10 px-5 lg:px-0"
  >
    <SectionHeading
      section-title="popular-locations.header"
      section-subtitle="popular-locations.title"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-x-10 gap-y-5">
      <div
        v-for="item in popularDestinations"
        :key="item.id"
      >
        <div class="flex items-center justify-between bg-gray-100 text-gray-700 hover:text-white hover:bg-custom-blue cursor-pointer ease duration-200 rounded-lg p-5 h-[72px]">
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-x-2 font-normal text-[14px] md:text-base">
            <p>Prague Airport</p>
            <span class="hidden lg:block">
              <Icon name="ic:sharp-arrow-forward" size="20" />
            </span>
            <p>{{ item.name }}</p>
          </div>
          <div class="flex items-center gap-x-4 font-medium">
            <div class="flex flex-col justify-start">
              <p class="text-[16px]">
                {{ `${item.finalPrice} Kč` }}
              </p>
              <p class="text-[10px]">
                Starting from
              </p>
            </div>
            <Icon name="material-symbols:arrow-forward-ios" size="14" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { popularDestinations } from './data/popularDestinations'
</script>
