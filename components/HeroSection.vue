<template>
    <div class="relative max-w-screen-xl mx-auto mt-16">
        <div
        class="relative flex flex-row justify-between items-center z-30">
            <div 
            loading="lazy"
            data-aos="fade-right"
            data-aos-duration="600"
            class="flex flex-col items-start">
                <h1
                v-html="$t('hero.title')"
                class="text-[72px] font-bold max-w-xl text-gray-800 leading-[80px]" />
                <p 
                v-html="$t('hero.subtitle')"
                class="mt-4 max-w-xl text-gray-700 font-normal text-[20px]"/>
            </div>
            <div>
                <span 
                class="relative">
                    <img
                    loading="lazy"
                    data-aos="fade-left"
                    data-aos-duration="600" 
                    class="relative z-50" src="/images/hero_vector.png" width="560" alt="hero-img">
                    <span 
                    loading="lazy"
                    data-aos="fade-up-left"
                    data-aos-duration="600" 
                    class="absolute z-10 -left-[12%] -top-[5%] -rotate-0">
                        <img class="" src="/images/plane.png" width="220" alt="">
                    </span>
                </span>
            </div>
        </div>
        <Form :triggerShake="shouldShake" />
    </div>
</template>
<script setup lang="ts">
import Form from './Form.vue';


const shouldShake = ref(false);


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