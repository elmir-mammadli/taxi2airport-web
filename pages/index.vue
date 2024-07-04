<script lang="ts" setup>
import Disclosure from '~/components/faq/FAQ.vue'

useSeoMeta({
  title: 'Reliable Airport Transfers | Taxi2Airport.cz',
  ogTitle: 'Reliable Airport Transfers | Taxi2Airport.cz',
  description: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.',
  ogDescription: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.',
  ogImage: '/images/og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <main>
    <HeroSection />
    <BookingBlock />
    <AvailableCars />
    <MeetingPoints />
    <Disclosure />
    <ChatIcons class="fixed bottom-0 right-7" />
  </main>
</template>
