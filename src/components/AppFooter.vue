<template>
  <footer class="bg-navy-900 text-white py-12">
    <div class="container mx-auto px-8">
      <div class="max-w-5xl mx-auto">
        <div
          class="flex flex-col lg:flex-row justify-between items-start w-full"
        >
          <!-- Logo & Description -->
          <div class="mb-6 lg:mb-0 lg:w-1/3">
            <div :class="direction === 'rtl' ? 'text-right' : 'text-left'">
              <img
                src="/images/tatweer logo - white.svg"
                alt="شركة تطوير للوساطة المالية"
                class="h-24 mb-4"
                :class="direction === 'rtl' ? 'ml-auto' : 'mr-auto'"
                loading="lazy"
              />
              <p
                class="text-gray-400 max-w-md"
                :class="direction === 'rtl' ? 'ml-auto' : 'mr-auto'"
              >
                {{ t('footer.description') }}
              </p>
            </div>
          </div>

          <!-- Links & Contact -->
          <div
            class="flex sm:flex-row lg:w-2/3 items-start lg:justify-end gap-8 lg:gap-12"
          >
            <!-- Quick Links -->
            <div>
              <h3
                class="text-xl font-bold mb-4"
                :class="direction === 'rtl' ? 'text-right' : 'text-left'"
              >
                {{ t('footer.quickLinks') }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(link, index) in quickLinks"
                  :key="index"
                  :class="direction === 'rtl' ? 'text-right' : 'text-left'"
                >
                  <a
                    :href="link.url"
                    @click.prevent="smoothScrollTo(link.url)"
                    class="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h3
                class="text-xl font-bold mb-4"
                :class="direction === 'rtl' ? 'text-right' : 'text-left'"
              >
                {{ t('footer.contactUs') }}
              </h3>
              <ul class="space-y-2">
                <!-- Phone -->
                <li
                  v-for="(phone, index) in t('contact.info.phone.values')"
                  :key="index"
                  class="flex flex-row items-start"
                >
                  <PhoneIcon class="w-4 h-4 text-gray-400 mx-2" />
                  <a
                    :href="`tel:${phone}`"
                    class="text-gray-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    {{ formatPhone(phone) }}
                  </a>
                </li>

                <!-- Email -->
                <li class="flex flex-row items-center">
                  <MailIcon class="w-4 h-4 text-gray-400 mx-2" />
                  <a
                    :href="`mailto:${t('contact.info.email.value')}`"
                    class="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {{ t('contact.info.email.value') }}
                  </a>
                </li>
              </ul>

              <!-- Social Links -->
              <div
                class="flex mt-4 justify-start"
                :class="
                  direction === 'rtl'
                    ? 'space-x-3 space-x-reverse'
                    : 'space-x-3'
                "
              >
                <a
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.name"
                  class="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <component :is="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-navy-800 mt-8 pt-8">
          <p
            class="text-gray-400"
            :class="direction === 'rtl' ? 'text-right' : 'text-left'"
          >
            &copy; {{ new Date().getFullYear() }} {{ t('footer.copyright') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageCircleIcon,
} from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';

gsap.registerPlugin(ScrollToPlugin);

const { t, direction, currentLanguage } = useLanguage();

// Directly compute quickLinks based on currentLanguage
const quickLinks = computed(() => {
  // Force re-evaluation by directly referencing currentLanguage.value
  console.log('Language changed to:', currentLanguage.value);

  return [
    { text: t('header.about'), url: '#about' },
    { text: t('header.services'), url: '#services' },
    { text: t('header.whyUs'), url: '#why-us' },
    { text: t('header.accounts'), url: '#accounts' },
    { text: t('header.contact'), url: '#contact' },
  ];
});

const socialLinks = [
  {
    icon: FacebookIcon,
    url: 'https://www.facebook.com/profile.php?id=61560571358583',
    name: 'Facebook',
  },
  {
    icon: MessageCircleIcon,
    url: 'https://api.whatsapp.com/send?phone=%2B218915708555&context=AffGpQHTpibBLYnBDYEM3F7JUiwNT07HeF8frJ1Qd6YitntOXa1xi65GNf8ovw1kmUHPxbWGjH4Aal3s81f1DH71BOVktFGeFxEOw3pIzEZ5IuACBb2ibMG3rWDc7tDEAMntIyItRnC7NM3E51WmZvMg-Q&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawKQFgdleHRuA2FlbQIxMABicmlkETA1MGF3V2FHWUlXZTlETGVvAR4E8Tu5FBuh0KDD-aieabFc3fLzR3VMzI6QDL-aI4QG8Le64KSP4xOVnqzWvA_aem_WgUKy34H-S4k3T7OLSurzw',
    name: 'WhatsApp',
  },
  {
    icon: InstagramIcon,
    url: '#',
    name: 'Instagram',
  },
  {
    icon: LinkedinIcon,
    url: '#',
    name: 'LinkedIn',
  },
];

const formatPhone = (phone) => {
  return phone.replace(/(\+?\d{3})(\d{2})(\d{3})(\d{4})/, '$1-$2-$3-$4');
};

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
</script>

<style scoped>
/* Optional custom styles */
</style>
