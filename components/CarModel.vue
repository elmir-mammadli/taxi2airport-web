<template>
  <div
    v-for="(detail, index) in details"
    :key="index"
    class="flex flex-col md:flex-row justify-between md:w-[700px] bg-gray-100 pt-8 pb-4 md:p-7 rounded-lg"
  >
    <div id="section1">
      <div id="section-left" class="flex flex-col justify-start">
        <div class="flex flex-col md:flex-row gap-x-7 items-center">
          <NuxtImg :src="detail.img" alt="sedan img" class="w-[120px]" />
          <div class="text-center md:text-start">
            <h1 class="font-bold text-[24px] mt-3 font-inter">
              {{ detail.name }}
            </h1>
            <div class="flex justify-center gap-x-4 mt-3 font-medium">
              <span>🚹 Max {{ detail.person }}</span>
              <span>🛄 Max {{ detail.luggage }}</span>
            </div>
            <p class="font-normal mt-2">
              ⌛️ Free waiting time: <span class="font-semibold">45 min</span>
            </p>
            <p class="font-normal mt-2">
              ⏱️ Estimated duration:
              <span class="font-semibold">{{ eta }} min</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <h1
        class="font-bold text-[32px] text-center mt-3 leading-none font-helvetica"
      >
        {{ detail.extraPrice + '.00 Kč' }}
      </h1>
      <Button
        :loading="loading[index]"
        type="button"
        label="Select Car"
        icon="pi pi-search"
        class="bg-green-400 mt-4 mx-4 text-white font-semibold text-[18px] px-10 py-4 rounded-md hover:bg-green-500 transition .4s ease-all"
        @click="selectCar(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button/Button.vue';
import { details } from './data/formData';
const props = defineProps({
  price: {
    type: Number,
    required: true
  },
  eta: {
    type: String,
    required: true
  }
});
for (let i = 0; i < details.length; i++) {
  details[i].extraPrice = props.price + details[i].initialPrice;
}

const emit = defineEmits(['car-selected']);

const loading = ref(Array(details.length).fill(false));

const selectCar = (index: number) => {
  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
    emit('car-selected', details[index].name);
  }, 1000);
};
</script>
