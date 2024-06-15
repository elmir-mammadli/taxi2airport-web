<script setup lang="ts">
import SectionHeading from '~/components/SectionHeading.vue'

useSeoMeta({
  title: 'About Us | Taxi2Airport - Your Trusted Airport Transportation Partner',
  ogTitle: 'About Us | Taxi2Airport - Your Trusted Airport Transportation Partner',
  description: 'Learn about Taxi2Airport, your reliable partner for seamless and stress-free airport transportation. Discover our mission, services, fleet, and how we ensure comfort, safety, and punctuality in every ride.',
  ogDescription: 'Learn about Taxi2Airport, your reliable partner for seamless and stress-free airport transportation. Discover our mission, services, fleet, and how we ensure comfort, safety, and punctuality in every ride.',
  ogImage: 'https://taxi2airport.netlify.app/assets/about-us.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://taxi2airport.netlify.app/assets/about-us.jpg'
})

</script>
<template>
  <div class="my-20 px-5">
    <SectionHeading title="ABOUT US" subtitle="Your Journey, Our Commitment" />
    <div class="max-w-[868px] text-justify mx-auto text-base md:text-[18px] leading-[28px]">
      <LazyContentDoc path="/about-us" />
    </div>
  </div>
</template>
