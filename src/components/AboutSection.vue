<template>
  <section id="about" class="py-20 md:py-40 bg-white">
    <div class="mx-auto px-4 flex flex-col gap-8 md:gap-12">
      <div class="text-center mb-8 md:mb-12 section-title">
        <h2 class="text-navy-900">{{ t('about.title') }}</h2>
        <div class="w-24 h-1 bg-[#0124D4] mx-auto"></div>
      </div>
      <div class="px-4 sm:px-8 md:px-20 mx-auto w-full">
        <!-- For mobile, we use a standard column layout with text first, image second -->
        <!-- For desktop, we use flex-row-reverse to maintain RTL order -->
        <div
          class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16"
        >
          <!-- Image container - second on mobile, first on desktop -->
          <div class="w-full md:w-1/2 about-image">
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
          <!-- Text container - first on mobile, second on desktop -->
          <div class="w-full md:w-2/5 flex flex-col gap-4 about-content">
            <h3
              class="text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-right"
            >
              {{ t('about.heading') }}
            </h3>
            <p
              class="text-lg md:text-xl leading-relaxed text-navy-700 mb-4 text-right"
            >
              {{ t('about.paragraph1') }}
            </p>
            <p
              class="text-lg md:text-xl leading-relaxed text-navy-700 mb-4 text-right"
            >
              {{ t('about.paragraph2') }}
            </p>
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
import { useLanguage } from '../composables/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const { t, currentLanguage, direction } = useLanguage();

// Function to initialize animations
const initAnimations = () => {
  // Clear any existing animations
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.id === 'aboutTrigger') {
      trigger.kill();
    }
  });

  // Set initial states for section title
  gsap.set('#about .section-title h2', { opacity: 0, y: -20 });
  gsap.set('#about .section-title .w-24', { scaleX: 0 });

  // Set initial states for about section - responsive for both mobile and desktop
  // For mobile (vertical layout)
  if (window.innerWidth < 768) {
    gsap.set('.about-image', { opacity: 0, y: 30 });
    gsap.set('.about-content', { opacity: 0, y: -30 });
  }
  // For desktop (horizontal layout)
  else {
    // Adjust animation direction based on language direction
    if (direction.value === 'rtl') {
      gsap.set('.about-image', { opacity: 0, x: -30 });
      gsap.set('.about-content', { opacity: 0, x: 30 });
    } else {
      gsap.set('.about-image', { opacity: 0, x: 30 });
      gsap.set('.about-content', { opacity: 0, x: -30 });
    }
  }

  // Animate section title
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    id: 'aboutTrigger',
    onEnter: () => {
      // Animate title
      gsap.to('#about .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to('#about .section-title .w-24', {
        scaleX: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      // For mobile (vertical layout)
      if (window.innerWidth < 768) {
        gsap.to('.about-content', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
        });

        gsap.to('.about-image', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
        });
      }
      // For desktop (horizontal layout)
      else {
        // Adjust animation direction based on language direction
        if (direction.value === 'rtl') {
          gsap.to('.about-image', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          });

          gsap.to('.about-content', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
          });
        } else {
          gsap.to('.about-content', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          });

          gsap.to('.about-image', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
          });
        }
      }
    },
  });
};

onMounted(() => {
  // Initialize animations
  initAnimations();

  // Handle resize events to adjust animations
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
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
