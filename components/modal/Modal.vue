<template>
  <div
    v-if="value"
    tabindex="0"
    class="fixed z-[99999999] inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @keydown.esc="closeModal"
  >
    <div
      class="flex justify-center min-h-screen pt-4 px-2 pb-20 text-center sm:p-0"
    >
      <div
        class="fixed inset-x-0 bottom-0 -top-[12%] bg-gray-800 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="align-middle h-screen" aria-hidden="true">&#8203;</span>

      <div
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="600"
        class="relative mb-auto flex justify-center"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
