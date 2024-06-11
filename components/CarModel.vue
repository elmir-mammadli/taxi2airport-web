<template>
  <div
    v-for="(detail, index) in details"
    :key="index"
    class="flex flex-col md:flex-row justify-between md:w-[700px] bg-gray-100 p-5 rounded-lg font-museo-moderna"
    :class="[loading ? 'blur-sm z-10 pointer-events-none' : '']"
  >
    <div id="section1">
      <div id="section-left" class="flex flex-col justify-start">
        <div class="flex flex-col md:flex-row gap-x-7 items-center">
          <NuxtImg :src="detail.img" alt="sedan img" class="w-[120px]" />
          <div class="text-center md:text-start mt-4 md:mt-0">
            <h1 class="font-bold uppercase tracking-tight text-[18px] md:text-[24px]">
              {{ detail.name }}
            </h1>
            <div class="text-[14px] md:text-base">
              <div class="flex justify-center lg:justify-start gap-x-4 mt-3 font-medium">
                <span>🚹 Max {{ detail.person }}</span>
                <span>🛄 Max {{ detail.luggage }}</span>
              </div>
              <p class="font-normal mt-1">
                ⌛️ Free waiting time: <span class="font-semibold">45 min</span>
              </p>
              <p class="font-normal mt-1">
                🛣️ Distance:
                <span class="font-semibold">{{ distance }} km</span>
              </p>
            </div>
            <!-- <p class="font-normal mt-1">
              ⏱️ Estimated duration:
              <span class="font-semibold">{{ eta }} min</span>
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4 md:mt-6 lg:mt-0 flex flex-col">
      <h1
        class="font-bold text-green-custom-green text-[32px] text-center leading-none"
      >
        {{ `€${detail.extraPrice}.00` }}
      </h1>
      <Button
        :loading="loading"
        type="button"
        label="Select Car"
        icon="pi pi-search"
        class="bg-blue-600 mt-4 mx-4 text-white font-semibold text-[18px] px-10 py-3 md:py-4 rounded-md hover:bg-blue-800 transition .4s ease-all"
        @click="selectCar(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button/Button.vue'
import { details } from './data/formData'

type PropTypes = {
  price: number
  eta: string
  distance: string
}
const props = defineProps<PropTypes>()
for (let i = 0; i < details.length; i++) {
  details[i].extraPrice = props.price + details[i].initialPrice
}

const emit = defineEmits(['car-selected'])

const loading = ref(false)

const selectCar = (index: number) => {
  loading.value = true
  emit('car-selected', details[index].name, loading.value)
  setTimeout(() => {
    loading.value = false
    emit('car-selected', details[index].name, loading.value)
  }, 1000)
}
</script>
