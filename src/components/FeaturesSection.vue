<template>
  <section id="why-us" class="py-40 bg-navy-900 text-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 section-title">
        <h2 class="text-white">{{ t('features.title') }}</h2>
        <div class="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
        <p class="text-gray-300 max-w-2xl mx-auto">
          {{ t('features.subtitle') }}
        </p>
      </div>
      <div class="max-w-6xl mx-auto">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          id="featuresGrid"
        >
          <FeatureCard
            v-for="(feature, index) in features"
            :key="index"
            :icon="featureIcons[index]"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeatureCard from './FeatureCard.vue';
import {
  MonitorIcon,
  ZapIcon,
  ShieldIcon,
  HeadphonesIcon,
  BookOpenIcon,
} from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const { t, currentLanguage } = useLanguage();

// Feature icons
const featureIcons = [
  MonitorIcon,
  ZapIcon,
  ShieldIcon,
  HeadphonesIcon,
  BookOpenIcon,
];

// Features data from translations
const features = computed(() => {
  return t('features.items');
});

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
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.vars.id?.includes('features') ||
      trigger.vars.id?.includes('why-us')
    ) {
      trigger.kill();
    }
  });

  // Set initial states for section title
  gsap.set('#why-us .section-title h2', { opacity: 0, y: -20 });
  gsap.set('#why-us .section-title .w-24', { scaleX: 0 });
  gsap.set('#why-us .section-title p', { opacity: 0, y: 20 });

  // Set initial states for grid items
  gsap.set('#featuresGrid > div', { autoAlpha: 0, y: 30 });

  // Animate section title - triggered on scroll
  ScrollTrigger.create({
    trigger: '#why-us',
    start: 'top 80%',
    id: 'whyUsTitle',
    onEnter: () => {
      gsap.to('#why-us .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to('#why-us .section-title .w-24', {
        scaleX: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.to('#why-us .section-title p', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      });
    },
  });

  // Animate features grid - triggered on scroll
  ScrollTrigger.create({
    trigger: '#featuresGrid',
    start: 'top 75%',
    id: 'featuresGrid',
    onEnter: () => {
      gsap.to('#featuresGrid > div', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
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
