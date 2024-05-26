<script setup lang="ts">
const isDropDown = ref(false);
const { $t } = useLanguage();

const toggleDropDown = () => {
  isDropDown.value = !isDropDown.value;
};
const items = [
  {
    name: $t('navbar.services'),
    link: '/services'
  },
  {
    name: $t('navbar.price'),
    link: '/about'
  },
  {
    name: $t('navbar.about'),
    link: '/about'
  },
  {
    name: $t('navbar.faq'),
    link: '#faq'
  },
  {
    name: $t('navbar.contact'),
    link: '/contact'
  }
];
</script>

<template>
  <div class="">
    <div class="flex items-center gap-x-2">
      <NavbarLanguage />
      <button @click="toggleDropDown">
        <Icon name="zondicons:menu" size="25" color="5A5A5A" />
      </button>
    </div>
    <TransitionGroup v-if="isDropDown" class="">
      <div
        class="fixed w-full left-0 top-0 bg-gray-100 flex flex-col items-center h-screen justify-center gap-y-2"
      >
        <button
          class="absolute top-10 right-4 text-black"
          @click="isDropDown = false"
        >
          <Icon name="mdi:close-circle" size="30" color="5A5A5A" />
        </button>
        <div v-for="(item, index) in items" :key="index">
          <NuxtLink :to="item.link">
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
