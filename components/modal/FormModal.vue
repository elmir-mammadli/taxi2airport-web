<template>
  <Modal :value="value" @close="$emit('close')">
    <Form />
  </Modal>
</template>
<script setup lang="ts">
import Form from '../Form.vue'
import Modal from './Modal.vue'

defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>
