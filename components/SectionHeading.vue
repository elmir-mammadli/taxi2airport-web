<script setup lang="ts">
const { $t } = useLanguage()

type SectionElements = {
  title: string
  subtitle: string
}

const sectionClasses: SectionElements = {
  title: 'uppercase text-[14px] md:text-[16px] text-light-blue font-bold',
  subtitle: 'text-[26px] md:text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4] px-5 sm:px-0'
}

defineProps<SectionElements>()

</script>

<template>
  <div class="flex flex-col items-center mb-[40px]">
    <p
      :class="sectionClasses.title"
      v-html="$t(title)"
    />
    <h2
      :class="sectionClasses.subtitle"
      v-html="$t(subtitle)"
    />
  </div>
</template>
