'use client';

import { ref, computed, onMounted } from 'vue';
import { arTranslations } from '../translations/ar.js';

// Use only Arabic translations
const translations = {
  ar: arTranslations,
};

// Always use Arabic
const currentLanguage = ref('ar');

export function useLanguage() {
  // Create a function that navigates the translation object
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage.value];

    // Navigate through the nested objects
    for (const k of keys) {
      if (!value) return key;
      value = value[k];
    }

    return value || key;
  };

  // Always RTL
  const isRTL = computed(() => true);
  const direction = computed(() => 'rtl');

  const updateDocumentDirection = () => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';

    // Force the browser to repaint to fix some rendering issues
    document.body.style.display = 'none';
    setTimeout(() => {
      document.body.style.display = '';
    }, 0);
  };

  onMounted(() => {
    updateDocumentDirection();
  });

  return {
    currentLanguage,
    isRTL,
    direction,
    t,
  };
}
