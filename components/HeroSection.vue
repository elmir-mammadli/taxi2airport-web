<template>
    <div class="max-w-screen-xl mx-auto mt-16 z-10">
        <div
        class="relative flex flex-row justify-between items-center z-30">
            <div 
            class="flex flex-col items-start">
                <h1
                v-html="$t('hero.title')"
                class="text-[24px] xl:text-[72px] font-bold max-w-xl text-gray-800 leading-[80px]" />
                <p 
                v-html="$t('hero.subtitle')"
                class="mt-4 max-w-xl text-gray-700 font-normal text-[20px]"/>
                <div 
                class="flex gap-x-5">
                    <button 
                    @click="triggerShake" 
                    class="bg-orange-500 text-white font-semibold text-[18px] px-9 py-3 rounded-xl mt-8 hover:bg-orange-600 transition .4s ease-all">
                        {{ $t('button-2') }}
                  </button>
                  <NuxtLink to="#faq">
                    <button class="bg-[#fff] hover:bg-gray-800 text-gray-900 hover:text-[#fff] outline outline-gray-800 font-medium text-[18px] px-9 py-3 rounded-xl mt-8 transition .4s ease-all">
                    FAQ
                </button>
                  </NuxtLink>
                </div>
            </div>
            <div>
                <span 
                class="relative">
                    <img
                    class="hidden md:block relative z-20" src="/images/hero_vector.png" width="560" alt="hero-img">
                    <span 
                    class="hidden md:block absolute z-10 -left-[12%] -top-[5%] -rotate-0">
                        <img class="" src="/images/plane.png" width="220" alt="">
                    </span>
                </span>
            </div>
        </div>
        <Form/>
    </div>
</template>
<script setup lang="ts">
import Form from './Form.vue';

import { useShakeStore } from '../stores/useShakeStore'
const shakeStore = useShakeStore()
function triggerShake() {
  shakeStore.triggerShake()
}
</script>

<style>
.ease-in-out-enter-from {
  @apply opacity-0;
}

.ease-in-out-enter-to {
  @apply opacity-100;
}

.ease-in-out-leave-active {
  @apply transition duration-200 ease-in-out;
}

.ease-in-out-leave-from {
  @apply opacity-100;
}

.ease-in-out-leave-to {
  @apply opacity-0;
}

</style>