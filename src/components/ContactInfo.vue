<template>
  <div class="bg-white rounded-lg shadow-lg p-6 min-h-full">
    <h3 class="text-xl font-bold text-navy-900 mb-6 text-right">
      {{ t('contact.info.title') }}
    </h3>
    <div class="space-y-5">
      <div class="flex items-start">
        <div
          class="min-w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 mx-3"
        >
          <MapPinIcon class="w-5 h-5" />
        </div>
        <div class="text-right">
          <h4 class="font-bold text-navy-900">
            {{ t('contact.info.address.label') }}
          </h4>
          <p class="text-navy-700 whitespace-pre-line">
            {{ t('contact.info.address.value') }}
          </p>
        </div>
      </div>
      <div class="flex items-start">
        <div
          class="min-w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 mx-3"
        >
          <PhoneIcon class="w-5 h-5" />
        </div>
        <div class="text-right">
          <h4 class="font-bold text-navy-900">
            {{ t('contact.info.phone.label') }}
          </h4>
          <span dir="ltr" class="text-navy-700 block text-right">
            <a
              v-for="(phone, index) in t('contact.info.phone.values')"
              :key="index"
              class="transition-colors block cursor-pointer"
              :href="`tel:${phone}`"
            >
              {{ phone }}
            </a>
          </span>
        </div>
      </div>
      <div class="flex items-start">
        <div
          class="min-w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 mx-3"
        >
          <MailIcon class="w-5 h-5" />
        </div>
        <div class="text-right">
          <h4 class="font-bold text-navy-900">
            {{ t('contact.info.email.label') }}
          </h4>
          <a
            :href="`mailto:${t('contact.info.email.value')}`"
            class="text-navy-700 block cursor-pointer"
          >
            {{ t('contact.info.email.value') }}
          </a>
        </div>
      </div>
      <div class="flex items-start">
        <div
          class="min-w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 mx-3"
        >
          <ClockIcon class="w-5 h-5" />
        </div>
        <div class="text-right">
          <h4 class="font-bold text-navy-900">
            {{ t('contact.info.hours.label') }}
          </h4>
          <p class="text-navy-700">
            {{ t('contact.info.hours.value') }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-6 text-right">
      <h4 class="font-bold text-navy-900 mb-3">
        {{ t('contact.info.social') }}
      </h4>
      <div class="flex space-x-3 space-x-reverse justify-start text-xl">
        <a
          v-for="(social, index) in socialLinks"
          :key="index"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.name"
          class="w-10 h-10 rounded-full bg-[#0124D4] flex items-center justify-center text-white hover:bg-[#0124D4]/80 transition duration-300 cursor-pointer"
        >
          <component :is="social.icon" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageCircleIcon,
} from 'lucide-vue-next';
import { useLanguage } from '@/composables/useLanguage';

const { t } = useLanguage();

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
</script>

<style scoped>
/* Component-specific styles */
</style>
