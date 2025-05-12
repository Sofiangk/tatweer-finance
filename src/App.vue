<template>
  <div class="app" dir="rtl">
    <AppHeader />
    <main>
      <HeroSection id="home" />
      <AboutSection id="about" />
      <ServicesSection id="services" />
      <FeaturesSection id="why-us" />
      <AccountsSection id="accounts" />
      <ContactSection id="contact" />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLanguage } from './composables/useLanguage';

import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ServicesSection from './components/ServicesSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import AccountsSection from './components/AccountsSection.vue';
import ContactSection from './components/ContactSection.vue';
import AppFooter from './components/AppFooter.vue';

// Get language state
const { currentLanguage } = useLanguage();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const isMounted = ref(false);

// Smooth scroll implementation for all anchor links (except header links)
const setupSmoothScroll = () => {
  // Select all anchor links except those in the header
  const anchors = document.querySelectorAll('a[href^="#"]:not(header a)');

  // Remove existing event listeners to prevent duplicates
  anchors.forEach((anchor) => {
    const oldElement = anchor.cloneNode(true);
    anchor.parentNode.replaceChild(oldElement, anchor);
  });

  // Add new event listeners
  document.querySelectorAll('a[href^="#"]:not(header a)').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      gsap.to(window, {
        duration: 0.7,
        scrollTo: {
          y: targetElement,
          offsetY: 80,
          autoKill: true,
        },
        ease: 'power2.inOut',
        onComplete: () => {
          // Force ScrollTrigger to refresh after scroll completes
          ScrollTrigger.refresh();
        },
      });
    });
  });
};

onMounted(() => {
  isMounted.value = true; // Set isMounted to true when the component is mounted

  // Ensure ScrollTrigger is properly configured
  ScrollTrigger.config({
    ignoreMobileResize: true, // Helps with mobile performance
  });

  // Initial setup
  setupSmoothScroll();

  // Re-setup smooth scroll after a short delay to catch dynamically added links
  setTimeout(() => {
    setupSmoothScroll();
  }, 1000);

  // Force ScrollTrigger to refresh after initial load
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});

// Watch for language changes to reset smooth scrolling
watch(currentLanguage, () => {
  // Small delay to ensure DOM is updated
  setTimeout(() => {
    setupSmoothScroll();
    ScrollTrigger.refresh();
  }, 100);
});
</script>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Tajawal', sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Typography */
h1,
h2,
h3,
h5,
h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.section-title h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
}

.section-title .divider {
  width: 6rem; /* w-24 */
  height: 0.25rem; /* h-1 */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem; /* mb-6 */
}

/* RTL specific spacing */
.space-x-reverse > * + * {
  margin-right: 0.5rem;
  margin-left: 0;
}

/* Fix for flex layouts in RTL */
.md\:flex-row {
  flex-direction: row-reverse;
}

/* Fix for icon spacing in RTL */
.ml-2 {
  margin-left: 0;
  margin-right: 0.5rem;
}

.ml-3 {
  margin-left: 0;
  margin-right: 0.75rem;
}

.ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}

/* Ensure proper text alignment in RTL */
.text-left {
  text-align: right;
}

/* Fix for RTL specific padding */
.pr-2 {
  padding-right: 0;
  padding-left: 0.5rem;
}

.pr-3 {
  padding-right: 0;
  padding-left: 0.75rem;
}

.pr-4 {
  padding-right: 0;
  padding-left: 1rem;
}
</style>
