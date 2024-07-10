<script setup lang="ts">
import SectionHeading from '~/components/SectionHeading.vue'

useSeoMeta({
  title: 'About Us | Taxi2Airport.cz - Your Trusted Airport Transportation Partner',
  ogTitle: 'About Us | Taxi2Airport.cz - Your Trusted Airport Transportation Partner',
  description: 'Learn about Taxi2Airport, your reliable partner for seamless and stress-free airport transportation. Discover our mission, services, fleet, and how we ensure comfort, safety, and punctuality in every ride.',
  ogDescription: 'Learn about Taxi2Airport, your reliable partner for seamless and stress-free airport transportation. Discover our mission, services, fleet, and how we ensure comfort, safety, and punctuality in every ride.',
  ogImage: '/images/og-image.png',
  twitterCard: 'summary_large_image'
})

</script>
<template>
  <div class="my-20 px-5">
    <SectionHeading
      section-title="ABOUT US"
      section-subtitle="Your Journey, Our Commitment"
      wide
    />
    <div class="max-w-[868px] text-justify mx-auto text-base md:text-[18px] leading-[28px]">
      <LazyContentDoc path="/about-us" />
    </div>
  </div>
</template>
