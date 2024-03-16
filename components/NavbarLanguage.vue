<template>
  <div>
    <div @mouseenter="toggleDropdown" class="relative flex items-center gap-x-2 cursor-pointer border-2 py-2 px-3 rounded-full font-semibold"><Icon :name="`circle-flags:${selectedFlag}`" /> {{ selectedLanguage }}</div>
    <ul
      v-show="showDropdown"
      class="
        absolute
        mt-2
        p-2
        shadow
        menu
        z-[1]
        bg-white
        rounded-box
        font-semibold
      "
    >
      <li v-for="(item, index) in languages" :key="index" class="">
        <p @click="langSwitch(item.name.toLowerCase())">
          <Icon :name="`circle-flags:${item.name.toLowerCase()}` " />
          <p>{{ item.name }}</p>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { locale } = useLanguage();
const showDropdown = ref(false);

type Languages = {
  name: string;
};

const langSwitch = (lang: string) => {
  locale.value = lang
  showDropdown.value = false
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
}

const selectedLanguage = computed(() => {
  const lang = languages.find((lang) => lang.name.toLowerCase() === locale.value);
  return lang?.name;
});
const selectedFlag = computed(() => {
  const lang = languages.find((lang) => lang.name.toLowerCase() === locale.value);
  return lang?.name.toLowerCase();
});

locale.value = 'en'
const languages: Languages[] = [
  {
    name: 'EN'
  },
  {
    name: 'CS'
  },
  {
    name: 'DE'
  }
];

watch(locale, () => {
  showDropdown.value = false;
});

</script>
