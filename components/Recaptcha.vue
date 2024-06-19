<script setup lang="ts">
import { RecaptchaV2 } from 'vue3-recaptcha-v2'

const handleWidgetId = (widgetId: number) => {
  // eslint-disable-next-line no-console
  console.log('Widget ID:', widgetId)
}

const recaptchaVerified = ref(false)
const recaptchaToken = ref('')

const handleExpiredCallback = () => {
  // eslint-disable-next-line no-console
  console.log('ReCaptcha expired')
  recaptchaVerified.value = false
  recaptchaToken.value = ''
}

const props = defineProps<{
  errorCallback:() => void
  handleLoadCallback:() => void
}>()

</script>
<template>
  <div>
    <RecaptchaV2
      size="normal"
      @widget-id="handleWidgetId"
      @error-callback="props.errorCallback"
      @expired-callback="handleExpiredCallback"
      @load-callback="props.handleLoadCallback"
    />
  </div>
</template>
