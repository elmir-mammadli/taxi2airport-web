<script setup lang="ts">
import ServiceCard from '~/components/ServiceCard.vue';
import { details } from './data/formData';

const cardItems = details
</script>
<template>
    <div
    id="available-cars"
     class="flex flex-col items-center scroll-mt-[64px] mt-[120px]">
            <p class="uppercase text-[16px] text-custom-blue font-bold">{{ $t('cars.title') }}</p>
            <h1 v-html="$t('cars.header')" class="text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4]"/>
        </div>
    <div
    class="max-w-[720px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-y-12 mt-[64px]">
        <ServiceCard 
        v-for="(item, index) in cardItems" 
        :key="index" 
        :item="item"
        class="" />
    </div>
</template>
