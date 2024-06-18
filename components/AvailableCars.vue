<template>
  <div
    id="available-cars"
    class="flex flex-col items-center mt-[120px] scroll-mt-20"
  >
    <SectionHeading section-title="cars.title" section-subtitle="cars.header" />
  </div>
  <div
    class="max-w-[1024px] mx-auto flex flex-col xl:flex-row items-center justify-center gap-10 mt-[40px] px-5"
  >
    <AvailableCarsCard
      v-for="(item, index) in details"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import { details } from '~/components/data/formData'
</script>
