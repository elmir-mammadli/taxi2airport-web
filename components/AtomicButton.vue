<script setup lang="ts">
const { $t: transKey } = useLanguage()

type AtomicButtonTypes = 'primary' | 'secondary' | 'tertiary';

const props = defineProps<{
  type: AtomicButtonTypes;
  text:string
  onClick?:() => void
}>()

const classes = computed(() => {
  return {
    'bg-custom-blue text-white font-semibold text-[18px] px-9 py-[13px] rounded-[6px] hover:bg-opacity-80 transition .4s ease-all': props.type === 'primary',
    'bg-[#fff] text-custom-blue outline outline-custom-blue font-medium text-[18px] px-9 py-3 rounded-[6px] transition .4s ease-all': props.type === 'secondary',
    // w-[260px] just try something different
    'bg-green-custom-green text-white font-semibold text-sm md:text-[18px] px-8 md:px-12 py-4 rounded-lg mt-6 md:mt-8 group-hover:bg-custom-blue group-hover:bg-opacity-95 transition .4s ease-all': props.type === 'tertiary'
  }
})
</script>
<template>
  <div>
    <button
      :class="classes"
      @click="onClick"
      v-html="transKey(text)"
    />
  </div>
</template>
