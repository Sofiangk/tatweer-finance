<template>
  <header class="bg-slate-900 text-white shadow-sm sticky top-0 z-50">
    <div
      class="container mx-auto px-4 sm:px-12 py-3 md:py-3 flex items-center justify-between"
    >
      <a href="/" class="flex items-center cursor-pointer">
        <img
          src="/images/tatweer logo - white.svg"
          alt="شركة تطوير للوساطة المالية"
          class="h-16 md:min-h-24 p-2"
        />
      </a>
      <div class="flex items-center">
        <nav
          class="hidden md:flex text-xl"
          :class="
            direction === 'rtl' ? 'space-x-6 space-x-reverse' : 'space-x-6'
          "
        >
          <a
            v-for="(link, index) in navLinks"
            :key="index"
            :href="link.url"
            class="text-white hover:text-sky-500 font-medium transition duration-300 cursor-pointer"
            >{{ link.text }}</a
          >
        </nav>

        <!-- Language Switcher -->
        <LanguageSwitcher class="hidden md:block" />

        <button @click="toggleMobileMenu" class="md:hidden text-white text-xl">
          <MenuIcon v-if="!mobileMenuOpen" class="w-8 h-8" />
          <XIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      ref="mobileMenuRef"
      class="md:hidden bg-navy-800 py-4 px-4 shadow-lg absolute w-full rounded-b-xl origin-top"
      :class="{ hidden: !mobileMenuOpen }"
    >
      <nav class="flex flex-col items-center space-y-4 text-lg">
        <a
          v-for="(link, index) in navLinks"
          :key="index"
          @click.prevent="
            () => {
              closeMobileMenu();
              smoothScrollTo(link.url.replace('#', ''));
            }
          "
          :href="link.url"
          class="text-white hover:text-sky-300 font-medium transition duration-300 cursor-pointer"
          >{{ link.text }}</a
        >
        <!-- Mobile Language Switcher -->
        <div
          class="mt-2 pt-2 border-t border-white/20 w-full flex justify-center"
        >
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeMount } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MenuIcon, XIcon } from 'lucide-vue-next';
import { useLanguage } from '@/composables/useLanguage';
import LanguageSwitcher from './LanguageSwitcher.vue';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const { t, currentLanguage, direction } = useLanguage();

// Navigation links using translations
const navLinks = computed(() => [
  { text: t('header.about'), url: '#about' },
  { text: t('header.services'), url: '#services' },
  { text: t('header.whyUs'), url: '#why-us' },
  { text: t('header.accounts'), url: '#accounts' },
  { text: t('header.contact'), url: '#contact' },
]);

// Mobile menu state and refs
const mobileMenuOpen = ref(false);
const mobileMenuRef = ref(null);

// Toggle mobile menu with animation
const toggleMobileMenu = () => {
  if (mobileMenuOpen.value) {
    // Close menu with animation
    gsap.to(mobileMenuRef.value, {
      scaleY: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        mobileMenuOpen.value = false;
      },
    });
  } else {
    // Open menu with animation
    mobileMenuOpen.value = true;
    gsap.fromTo(
      mobileMenuRef.value,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      }
    );
  }
};

// Close mobile menu
const closeMobileMenu = () => {
  gsap.to(mobileMenuRef.value, {
    scaleY: 0,
    opacity: 0,
    duration: 0.2,
    ease: 'power1.out',
    onComplete: () => {
      mobileMenuOpen.value = false;
    },
  });
};

// Improved smooth scroll function for consistent behavior
const smoothScrollTo = (targetId) => {
  // Make sure targetId starts with #
  if (!targetId.startsWith('#')) {
    targetId = '#' + targetId;
  }

  const targetElement = document.querySelector(targetId);
  if (!targetElement) {
    console.warn('Target element not found:', targetId);
    return;
  }

  // Enhanced GSAP scrolling for better cross-browser compatibility
  gsap.to(window, {
    duration: 0.8, // Slightly longer for smoother effect
    scrollTo: {
      y: targetElement,
      offsetY: 80,
      autoKill: false, // Changed to false to ensure completion
    },
    ease: 'power2.inOut',
    onStart: () => {
      // Disable user scrolling during animation for consistency
      document.body.style.overflow = 'hidden';
    },
    onComplete: () => {
      // Re-enable scrolling
      document.body.style.overflow = '';
    },
  });
};

// Watch for mobile menu changes to handle body scroll
watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  // Animate nav links on load
  gsap.from('nav a', {
    y: -10,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power1.out',
    clearProps: 'all',
  });
});
</script>

<style scoped>
/* Mobile menu animation styles */
#mobileMenuRef {
  transform-origin: top;
  will-change: transform, opacity;
}
</style>
