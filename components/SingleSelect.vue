<!-- SingleSelect.vue -->
<template>
  <div
    v-if="visible"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    class="absolute bg-white shadow-lg rounded-lg p-2"
  >
    <div class="cursor-pointer p-2 hover:bg-gray-200" @click="openWhatsApp">
      <Icon name="mdi:whatsapp" class="inline-block mr-2" /> WhatsApp
    </div>
    <div class="cursor-pointer p-2 hover:bg-gray-200" @click="openTelegram">
      <Icon name="mdi:telegram" class="inline-block mr-2" /> Telegram
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  visible: Boolean,
  position: {
    type: Object as () => { x: number, y: number },
    required: true
  },
  destination: {
    type: Object as () => { name: string, finalPrice: number },
    required: true
  }
})

const emit = defineEmits(['close'])

const openWhatsApp = () => {
  const message = `Hi, I would like to book the ride from Prague to ${props.destination.name} (${props.destination.finalPrice} CZK). Is it possible?`
  const phoneNumber = '420773150831'
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
  emit('close')
}

const openTelegram = () => {
  const message = `Hi, I would like to book the ride from Prague to ${props.destination.name} (${props.destination.finalPrice} CZK). Is it possible?`
  const phoneNumber = '420773150831'
  const url = `https://t.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
  emit('close')
}
</script>

<style scoped>
.absolute {
  z-index: 1000;
}
</style>
