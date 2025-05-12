<template>
  <footer class="bg-navy-900 text-white py-12">
    <div class="container mx-auto px-8">
      <div class="max-w-5xl mx-auto">
        <div
          class="flex flex-col lg:flex-row justify-between items-start w-full"
        >
          <!-- Logo & Description -->
          <div class="mb-6 lg:mb-0 lg:w-1/3">
            <div class="text-right">
              <img
                src="/images/tatweer logo white.png"
                alt="شركة تطوير للوساطة المالية"
                class="h-24 mb-4 ml-auto"
                loading="lazy"
              />
              <p class="text-gray-400 max-w-md ml-auto">
                {{ t('footer.description') }}
              </p>
            </div>
          </div>

          <!-- Links & Contact -->
          <div
            class="flex sm:flex-row flex-wrap items-end lg:w-2/3 lg:justify-end gap-8 lg:gap-12"
          >
            <!-- Quick Links -->
            <div>
              <h3 class="text-xl font-bold mb-4 text-right">
                {{ t('footer.quickLinks') }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(link, index) in quickLinks"
                  :key="index"
                  class="text-right"
                >
                  <a
                    href="#"
                    @click.prevent="smoothScrollTo(link.url.replace('#', ''))"
                    class="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h3 class="text-xl font-bold mb-4 text-right">
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
                    class="text-gray-400 hover:text-white transition-colors cursor-pointer text-right block"
                    dir="ltr"
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
              <div class="flex mt-4 justify-start space-x-3 space-x-reverse">
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
          <p class="text-gray-400 text-right">
            &copy; {{ new Date().getFullYear() }} {{ t('footer.copyright') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';

gsap.registerPlugin(ScrollToPlugin);

const { t } = useLanguage();

const quickLinks = computed(() => [
  { text: t('header.about'), url: '#about' },
  { text: t('header.services'), url: '#services' },
  { text: t('header.whyUs'), url: '#why-us' },
  { text: t('header.accounts'), url: '#accounts' },
  { text: t('header.contact'), url: '#contact' },
]);

const socialLinks = [
  { icon: FacebookIcon, url: '#', name: 'Facebook' },
  { icon: InstagramIcon, url: '#', name: 'Instagram' },
  { icon: LinkedinIcon, url: '#', name: 'LinkedIn' },
];

const formatPhone = (phone) => {
  return phone.replace(/(\+?\d{3})(\d{2})(\d{3})(\d{4})/, '$1-$2-$3-$4');
};

const smoothScrollTo = (targetId) => {
  const element = document.querySelector(`#${targetId}`);
  if (!element) {
    console.warn('Target element not found:', targetId);
    return;
  }

  gsap.to(window, {
    duration: 0.7,
    scrollTo: {
      y: element,
      offsetY: 80,
      autoKill: true,
    },
    ease: 'power2.inOut',
  });
};
</script>

<style scoped>
/* Optional custom styles */
</style>
