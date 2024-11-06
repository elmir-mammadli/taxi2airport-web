<script setup lang="ts">
import { details } from '../components/data/formData'
import ServiceCard from '~/components/AvailableCarsCard.vue'

const cardItems = details
</script>
<template>
  <SectionHeading section-title="cars.title" section-subtitle="cars.header" />
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
