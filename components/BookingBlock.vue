<template>
  <div
    loading="lazy"
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-duration="600"
    class="flex flex-col items-center max-w-screen-xl mx-auto mt-24 lg:mt-32 -z-10"
  >
    <SectionHeading
      section-title="reservation.title"
      section-subtitle="reservation.header"
    />
    <div class="flex flex-col md:flex-row gap-x-14 mt-6 md:mt-10 px-5 md:px-0">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex md:flex-col items-center gap-x-2"
      >
        <Icon :name="item.logo" size="120" :class="item.color" />
        <div class="flex flex-col items-start md:items-center md:mt-4">
          <p class="font-bold text-base md:text-[20px] text-custom-blue">
            {{ item.title }}
          </p>
          <p
            class="text-sm md:text-[16px] max-w-[340px] md:text-center mt-1 md:mt-2 text-gray-500"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
const { $t } = useLanguage()
const items = computed(() => [
  {
    logo: 'mingcute:calendar-2-line',
    title: $t('reservation.card-1'),
    description: $t('reservation.card-desc-1'),
    color: 'text-light-blue'
  },
  {
    logo: 'mingcute:car-2-line',
    title: $t('reservation.card-2'),
    description: $t('reservation.card-desc-2'),
    color: 'text-light-blue'
  },
  {
    logo: 'mingcute:bank-card-fill',
    title: $t('reservation.card-3'),
    description: $t('reservation.card-desc-3'),
    color: 'text-light-blue'
  }
])
</script>
