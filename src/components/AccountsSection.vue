<template>
  <section id="accounts" class="py-24 md:py-32 lg:py-36 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 section-title">
        <h2 class="text-navy-900">{{ t('accounts.title') }}</h2>
        <div class="w-24 h-1 bg-[#0124D4] mx-auto mb-6"></div>
        <p class="text-navy-700 max-w-2xl mx-auto">
          {{ t('accounts.subtitle') }}
        </p>
      </div>
      <div class="max-w-6xl mx-auto">
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          id="accountsGrid"
        >
          <AccountCard
            v-for="(account, index) in accounts"
            :key="index"
            :title="account.title"
            :description="account.description"
            :features="account.features"
            :featured="index === 1"
            :buttonText="t('accounts.openAccount')"
            :popularText="t('accounts.popular')"
            :index="index"
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
import AccountCard from './AccountCard.vue';
import { useLanguage } from '../composables/useLanguage';

const { t, currentLanguage, direction } = useLanguage();

// Accounts data from translations
const accounts = computed(() => {
  return t('accounts.types');
});

onMounted(() => {
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
    if (trigger.vars.id?.includes('accounts')) {
      trigger.kill();
    }
  });

  // Set initial states for section title
  gsap.set('#accounts .section-title h2', { opacity: 0, y: -20 });
  gsap.set('#accounts .section-title .w-24', { scaleX: 0 });
  gsap.set('#accounts .section-title p', { opacity: 0, y: 20 });

  // Create a timeline for the section title
  const titleTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#accounts',
      start: 'top 80%',
      id: 'accountsTitle',
      once: true,
    },
  });

  titleTl
    .to('#accounts .section-title h2', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
    .to(
      '#accounts .section-title .w-24',
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )
    .to(
      '#accounts .section-title p',
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );

  // Set initial state for account cards
  gsap.set('#accountsGrid > div', {
    y: 50,
    opacity: 0,
    scale: 0.95,
  });

  // Create staggered animation for account cards
  ScrollTrigger.create({
    trigger: '#accountsGrid',
    start: 'top 75%',
    id: 'accountsGrid',
    once: true,
    onEnter: () => {
      gsap.to('#accountsGrid > div', {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: {
          each: 0.15,
          from: direction.value === 'rtl' ? 'end' : 'start',
        },
        duration: 0.6,
        ease: 'back.out(1.2)',
      });
    },
  });

  // Force ScrollTrigger to refresh
  ScrollTrigger.refresh();
};
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  #accounts {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* RTL specific adjustments */
[dir='rtl'] #accountsGrid {
  direction: rtl;
}
</style>
