'use client';

import { ref, computed, onMounted, watch } from 'vue';
import { arTranslations } from '../translations/ar.js';
import { enTranslations } from '../translations/en.js';

// Use both Arabic and English translations
const translations = {
  ar: arTranslations,
  en: enTranslations,
};

// Initialize with saved language or default to Arabic
let initialLang = 'ar';
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('language');
  if (savedLang && translations[savedLang]) {
    initialLang = savedLang;
  }
}

const currentLanguage = ref(initialLang);

export function useLanguage() {
  // Update document direction based on current language
  const updateDocumentDirection = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction.value;
      document.documentElement.lang = currentLanguage.value;

      // Force the browser to repaint to fix some rendering issues
      document.body.style.display = 'none';
      setTimeout(() => {
        document.body.style.display = '';
      }, 0);
    }
  };

  // Compute RTL based on current language
  const isRTL = computed(() => currentLanguage.value === 'ar');
  const direction = computed(() => (isRTL.value ? 'rtl' : 'ltr'));

  // Initialize document direction on mount
  onMounted(() => {
    updateDocumentDirection();
  });

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

  // Watch for language changes and update document direction
  watch(currentLanguage, () => {
    updateDocumentDirection();
  });

  // Toggle between Arabic and English
  const toggleLanguage = () => {
    const newLang = currentLanguage.value === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };

  // Set a specific language
  const setLanguage = (lang) => {
    if (translations[lang]) {
      // Update the language
      currentLanguage.value = lang;

      // Save language preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        console.log('Language saved to localStorage:', lang);

        // Refresh the page to ensure all components update properly
        window.location.reload();
      }
    }
  };

  return {
    currentLanguage,
    isRTL,
    direction,
    t,
    toggleLanguage,
    setLanguage,
  };
}
