<script setup lang="ts">
const { $t } = useLanguage()

type SectionClassAttributes = {
  title: string
  subtitle: string
  wide?: boolean
  wider?: string
  tighter?: string
}

type SectionClassesTextSegments = {
  sectionTitle: string
  sectionSubtitle: string
}

type SectionClassesAndProps = SectionClassAttributes & SectionClassesTextSegments

defineProps<Pick<SectionClassesAndProps, 'sectionTitle' | 'sectionSubtitle' | 'wide'>>()

defineOptions({
  inheritAttrs: false
})

const sectionClassesAttributes: SectionClassAttributes = {
  title: 'uppercase text-[14px] md:text-[16px] text-light-blue font-bold',
  subtitle: 'text-[26px] md:text-[36px] text-gray-800  font-semibold leading-[1.4]',
  tighter: 'max-w-xl items-center text-center px-5 md:px-0',
  wider: 'max-w-[868px] items-start text-left'
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="flex flex-col mb-[40px] mx-auto"
    :class="wide ? sectionClassesAttributes.wider : sectionClassesAttributes.tighter"
  >
    <p
      :class="sectionClassesAttributes.title"
      v-html="$t(sectionTitle)"
    />
    <h2
      :class="sectionClassesAttributes.subtitle"
      v-html="$t(sectionSubtitle)"
    />
  </div>
</template>
