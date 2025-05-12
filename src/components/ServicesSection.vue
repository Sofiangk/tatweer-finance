<template>
  <section id="services" class="py-40 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 section-title">
        <h2 class="text-navy-900">{{ t('services.title') }}</h2>
        <div class="w-24 h-1 bg-[#0124D4] mx-auto mb-6"></div>
        <p class="text-navy-700 max-w-2xl mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>
      <div class="max-w-6xl mx-auto">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="servicesGrid"
        >
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :image="service.image"
            :title="service.title"
            :description="service.description"
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
import ServiceCard from './ServiceCard.vue';
import { useLanguage } from '../composables/useLanguage';

const { t, direction, currentLanguage } = useLanguage();

// Service images
const serviceImages = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.pexels.com/photos/8442328/pexels-photo-8442328.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

// Services data from translations
const services = computed(() => {
  return t('services.items').map((item, index) => ({
    image: serviceImages[index],
    title: item.title,
    description: item.description,
  }));
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
  // Set initial states for grid items
  gsap.set('#servicesGrid > div', { autoAlpha: 0, y: 20 });

  // Set initial state for section title
  gsap.set('.section-title h2', { opacity: 0, y: -20 });
  gsap.set('.section-title p', { opacity: 0, y: 20 });
  gsap.set('.section-title .w-24', { scaleX: 0 });

  // Animate section title
  ScrollTrigger.create({
    trigger: '#services',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to('.section-title h2', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to('.section-title .w-24', {
        scaleX: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.to('.section-title p', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
      });
    },
  });

  // Animate grid with optimized settings
  ScrollTrigger.batch('#servicesGrid > div', {
    interval: 0.1,
    batchMax: 3, // Process max 3 elements at once for better performance
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    start: 'top 80%',
    once: true,
  });

  // Force ScrollTrigger to refresh
  ScrollTrigger.refresh();
};
</script>

<style scoped>
/* Component-specific styles */
</style>
