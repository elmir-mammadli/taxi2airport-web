<template>
  <div
    loading="lazy"
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-duration="600"
    class="flex flex-col items-center max-w-screen-xl mx-auto mt-32 -z-10"
  >
    <div class="flex flex-col items-center">
      <p class="uppercase text-[16px] text-custom-blue font-bold">
        {{ $t('reservation.title') }}
      </p>
      <h1
        class="text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4]"
        v-html="$t('reservation.header')"
      />
    </div>
    <div class="flex flex-col sm:flex-row gap-x-14 mt-10">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center"
      >
        <Icon :name="item.logo" size="120" :class="item.color" />
        <div class="flex flex-col items-center mt-4">
          <p class="font-bold text-[20px] text-gray-800">
            {{ item.title }}
          </p>
          <p class="text-[18px] max-w-[300px] text-center mt-2 text-gray-500">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $t } = useLanguage();
const items = computed(() => [
  {
    logo: 'mingcute:calendar-2-line',
    title: $t('reservation.card-1'),
    description: $t('reservation.card-desc-1'),
    color: 'text-[#007BFF]'
  },
  {
    logo: 'mingcute:car-2-line',
    title: $t('reservation.card-2'),
    description: $t('reservation.card-desc-2'),
    color: 'text-[#FFA500]'
  },
  {
    logo: 'mingcute:bank-card-fill',
    title: $t('reservation.card-3'),
    description: $t('reservation.card-desc-3'),
    color: 'text-[#FF0000]'
  }
]);
</script>
