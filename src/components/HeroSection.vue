<template>
  <section id="hero" class="relative h-screen text-white overflow-hidden">
    <!-- Video Background -->
    <div class="inset-0 -z-10 fixed">
      <video
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 w-full h-full object-cover opacity-30"
        aria-hidden="true"
        preload="auto"
      >
        <source src="/video/tatweer-fin-hero-vid.mp4" type="video/mp4" />
        <!-- Fallback image if video doesn't load -->
        <img
          src="/images/tatweer-fin-hero.jpg"
          alt="Tatweer Financial"
          class="w-full h-full object-cover"
        />
      </video>
      <div
        class="absolute inset-0 bg-gradient-to-b from-navy-800/60 to-navy-900/80"
      ></div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 py-60 md:py-80 relative">
      <div class="max-w-3xl mx-auto text-center" id="heroContent">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 opacity-0">
          {{ t('hero.title') }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-sky-300 opacity-0">
          {{ t('hero.subtitle') }}
        </p>
        <div class="opacity-0">
          <button
            @click="smoothScrollTo('contact')"
            class="bg-sky-500 hover:bg-sky-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block cursor-pointer"
          >
            {{ t('hero.cta') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Wave Shape -->
    <div class="absolute bottom-0 left-0 right-0 translate-y-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        class="w-full h-auto"
      >
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLanguage } from '../composables/useLanguage';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const { t, currentLanguage } = useLanguage();

// ScrollToPlugin options
const scrollToOptions = {
  ease: 'power2.inOut',
  autoKill: true,
  offsetY: 80,
};

// Smooth scroll function
const smoothScrollTo = (targetId) => {
  if (!targetId.startsWith('#')) {
    targetId = '#' + targetId;
  }

  const targetElement = document.querySelector(targetId);
  if (!targetElement) {
    console.warn('Target element not found:', targetId);
    return;
  }

  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

  gsap.to(window, {
    scrollTo: {
      y: targetElement,
    },
    ...scrollToOptions,
  });
};

// Function to initialize animations
const initAnimations = () => {
  // Hero animations - simplified and optimized
  const heroContent = document.querySelector('#heroContent');
  if (heroContent) {
    // Clear any existing animations
    gsap.killTweensOf(heroContent.children);

    // Set initial state
    gsap.set(heroContent.children, { opacity: 0, y: 20 });

    // Create animation
    gsap.to(heroContent.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }
};

onMounted(() => {
  // Initialize animations when component is mounted
  initAnimations();
});

// Watch for language changes to reset animations
watch(currentLanguage, () => {
  // Small delay to ensure DOM is updated
  setTimeout(() => {
    initAnimations();
  }, 100);
});
</script>

<style scoped>
/* Component-specific styles */
</style>
