<template>
  <section id="about" class="py-40 bg-white">
    <div class="mx-auto px-4 flex flex-col gap-12">
      <div class="text-center mb-12 section-title">
        <h2 class="text-navy-900">{{ t('about.title') }}</h2>
        <div class="w-24 h-1 bg-[#0124D4] mx-auto"></div>
      </div>
      <div class="sm:px-20 px-4 mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-16">
          <div class="md:w-1/2 about-image">
            <div class="relative">
              <div
                class="absolute -top-4 -right-4 w-full h-full border-4 border-[#0124D4] rounded-lg"
              ></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="مكتب شركة تطوير للوساطة المالية"
                class="rounded-lg shadow-lg relative z-10 w-full"
              />
            </div>
          </div>
          <div class="md:w-2/5 flex flex-col gap-4 about-content">
            <h3 class="text-4xl font-bold text-navy-900 mb-4">
              {{ t('about.heading') }}
            </h3>
            <p class="text-navy-700 mb-4 text-xl leading-relaxed text-justify">
              {{ t('about.paragraph1') }}
            </p>
            <p class="text-navy-700 mb-4 leading-relaxed text-xl text-justify">
              {{ t('about.paragraph2') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../composables/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const { t } = useLanguage();

onMounted(() => {
  // Set initial states for about section - RTL layout
  gsap.set('.about-image', { opacity: 0, x: 30 });
  gsap.set('.about-content', { opacity: 0, x: -30 });

  // About section - simplified animation
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to('.about-image', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power1.out',
      });

      gsap.to('.about-content', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power1.out',
      });
    },
  });
});
</script>

<style scoped>
/* Component-specific styles */
</style>
