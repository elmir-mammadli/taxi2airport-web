<template>
    <div 
    v-for="(detail, index) in details" :key="index"
    class="flex justify-between w-[700px] bg-gray-100 p-7 rounded-lg">
        <div id="section1">
        <div id="section-left" class="flex flex-col justify-start">
            <div class="flex gap-x-7 items-center">
                    <NuxtImg :src="detail.img" alt="sedan img" class="w-[120px]" />
                <div>
                    <h1 class="font-bold text-[24px] font-inter">
                        {{ detail.name }}
                    </h1>
                    <div class="flex gap-x-2 mt-3 font-medium">
                        <span>🚹 Max 4</span>
                        <span>🛄 Max 3</span>
                    </div>
                    <p class="font-normal">⌛️ Free waiting time: <span class="font-semibold">45 min</span></p>
                    <p class="font-normal">⏱️ Estimated duration: <span class="font-semibold">30 min</span></p>
                </div>
            </div>
            </div>
        </div>
        <div class="card">
            <h1 class="font-bold text-[28px] leading-none font-inter">CZK {{ detail.price }}</h1>
            <Button 
            :loading="loading[index]"
            @click="selectCar(index)"
            type="button"
            label="Search" 
            icon="pi pi-search"
            class="bg-green-400 mt-4 text-white font-semibold text-[16px] px-10 py-2.5 rounded-md hover:bg-green-500 transition .4s ease-all" />        
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from "primevue/button/Button.vue";
const props = defineProps({
    price: {
        type: Number,
        required: true
    }
})
const emit = defineEmits(['car-selected'])


const details = [
    { 
        img: '/sedan.png',
        name: 'ECONOMY SEDAN',
        price: `${props.price + 590}.00`
    },
    {   
        img: '/minivan.png',
        name: 'MINIVAN',
        price: `${props.price + 990}.00`
    }
]
const loading = ref(Array(details.length).fill(false))

const selectCar = (index: number) => {
  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
    emit('car-selected', details[index].name);
  }, 1000);
}

</script>