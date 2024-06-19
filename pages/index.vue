<script lang="ts" setup>
import Disclosure from '~/components/faq/FAQ.vue'

useSeoMeta({
  title: 'Reliable Airport Transfers | Taxi2Airport',
  ogTitle: 'Reliable Airport Transfers | Taxi2Airport',
  description: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.',
  ogDescription: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.'
})
</script>

<template>
  <main>
    <HeroSection />
    <BookingBlock />
    <AvailableCars />
    <MeetingPoints />
    <Disclosure />
  </main>
</template>
