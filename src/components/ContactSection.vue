<template>
  <section id="contact" class="py-36 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 section-title">
        <h2 class="text-navy-900">{{ t('contact.title') }}</h2>
        <div class="w-24 h-1 bg-[#0124D4] mx-auto mb-6"></div>
        <p class="text-navy-700 max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8" id="contactGrid">
          <div class="lg:col-span-1">
            <ContactInfo />
          </div>
          <div class="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactInfo from './ContactInfo.vue';
import ContactForm from './ContactForm.vue';
import { useLanguage } from '../composables/useLanguage';

const { t, direction, currentLanguage } = useLanguage();

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Ensure ScrollTrigger is registered
  gsap.registerPlugin(ScrollTrigger);

  // Initialize animations
  initAnimations();
});

// Watch for language changes to reset animations
watch(currentLanguage, () => {
  // Small delay to ensure DOM is updated
  setTimeout(() => {
    initAnimations();
  }, 100);
});

// Function to initialize animations
const initAnimations = () => {
  // Clear any existing animations
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Set initial states for section title
  gsap.set('#contact .section-title h2', { opacity: 0, y: -20 });
  gsap.set('#contact .section-title .w-24', { scaleX: 0 });
  gsap.set('#contact .section-title p', { opacity: 0, y: 20 });

  // Set initial states for grid items
  gsap.set('#contactGrid > div', { autoAlpha: 0, y: 30 });

  // Animate section title - triggered on scroll
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to('#contact .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to('#contact .section-title .w-24', {
        scaleX: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.to('#contact .section-title p', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      });
    },
  });

  // Animate contact grid items - triggered on scroll
  ScrollTrigger.create({
    trigger: '#contactGrid',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to('#contactGrid > div:first-child', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to('#contactGrid > div:last-child', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      });
    },
  });

  // Force ScrollTrigger to refresh
  ScrollTrigger.refresh();
};
</script>

<style scoped>
/* Component-specific styles */
</style>
