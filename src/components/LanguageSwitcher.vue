<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
      :class="
        direction === 'rtl'
          ? 'ml-3 space-x-2 space-x-reverse rtl-icon'
          : 'mr-3 space-x-2 ltr-icon'
      "
    >
      <GlobeIcon
        class="w-5 h-5"
        :class="direction === 'rtl' ? 'ml-1' : 'mr-1'"
      />
      <span>{{ t(`language.${currentLanguage}`) }}</span>
      <ChevronDownIcon class="w-4 h-4" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute mt-1 py-1 bg-white rounded-md shadow-lg z-50 min-w-[120px]"
      :class="direction === 'rtl' ? 'right-0' : 'left-0'"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="w-full px-4 py-2 text-left text-navy-800 hover:bg-gray-100 transition-colors"
        :class="{ 'font-bold': currentLanguage === lang.code }"
      >
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import { GlobeIcon, ChevronDownIcon } from 'lucide-vue-next';

const { currentLanguage, direction, t, toggleLanguage } = useLanguage();
const isOpen = ref(false);

const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (langCode) => {
  if (currentLanguage.value !== langCode) {
    toggleLanguage();
  }
  isOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    isOpen.value = false;
  }
};

// Add event listener when component is mounted
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* RTL/LTR specific styles */
.rtl-icon svg {
  margin-left: 0.25rem;
}

.ltr-icon svg {
  margin-right: 0.25rem;
}

/* Fix for dropdown alignment */
[dir='rtl'] .absolute {
  right: 0;
}

[dir='ltr'] .absolute {
  left: 0;
}
</style>
