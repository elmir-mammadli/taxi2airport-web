<template>
  <div
    id="meeting-points"
    class="flex flex-col mt-[120px] scroll-mt-20 max-w-[880px] mx-auto"
  >
    <SectionHeading
      section-title="meeting-points.title"
      section-subtitle="meeting-points.header"
    />
    <div class="flex flex-col items-start mt-10 px-5">
      <h2
        class="text-[24px] md:text-[28px] max-w-xl text-gray-800 font-semibold leading-[1.4] sm:px-0"
      >
        Prague Airport
      </h2>
      <p class="text-[18px] md:text-[20px] text-gray-600">
        Václav Havel Airport Prague
      </p>
      <p class="text-[16px] md:text-[18px] text-gray-800 mt-4 font-normal">
        At Taxi2Airport, we ensure your arrival is smooth and hassle-free with
        our premium 'Meet and Greet' service available at both
        <b>Terminal 1</b> and <b>Terminal 2.</b>
      </p>
      <ul v-for="(item, index) in meetingPointDesc" :key="index">
        <li
          class="text-[24px] md:text-[28px] max-w-xl text-gray-800 font-semibold leading-[1.4] mt-10 sm:px-0"
          v-html="$t(item.head)"
        />
        <li
          class="text-[16px] md:text-[18px] text-gray-800 mt-4 font-normal"
          v-html="$t(item.desc[0])"
        />
        <li
          class="text-[16px] md:text-[18px] text-gray-800 font-normal"
          v-html="$t(item.desc[1])"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $t } = useLanguage()
const meetingPointDesc = [
  {
    head: 'meeting-points.work-principle-1.title',
    desc: [
      'meeting-points.work-principle-1.text-1',
      'meeting-points.work-principle-1.text-2'
    ]
  },
  {
    head: 'meeting-points.work-principle-2.title',
    desc: [
      'meeting-points.work-principle-2.text-1',
      'meeting-points.work-principle-2.text-2'
    ]
  },
  {
    head: 'meeting-points.work-principle-3.title',
    desc: [
      'meeting-points.work-principle-3.text-1',
      'meeting-points.work-principle-3.text-2'
    ]
  }
]
</script>
