<template>
  <div class="bg-white rounded-lg shadow-lg p-6 min-h-full">
    <h3 class="text-xl font-bold text-navy-900 mb-6 text-right">
      {{ t('contact.form.title') }}
    </h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-navy-700 mb-2 text-right">
            {{ t('contact.form.name') }}
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-navy-700 mb-2 text-right">
            {{ t('contact.form.email') }}
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
            required
          />
        </div>
      </div>
      <div>
        <label for="phone" class="block text-navy-700 mb-2 text-right">
          {{ t('contact.form.phone') }}
        </label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
        />
      </div>
      <div>
        <label for="subject" class="block text-navy-700 mb-2 text-right">
          {{ t('contact.form.subject.label') }}
        </label>
        <select
          id="subject"
          v-model="form.subject"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
          required
        >
          <option value="" disabled selected>
            {{ t('contact.form.subject.placeholder') }}
          </option>
          <option value="account">
            {{ t('contact.form.subject.options.account') }}
          </option>
          <option value="info">
            {{ t('contact.form.subject.options.info') }}
          </option>
          <option value="support">
            {{ t('contact.form.subject.options.support') }}
          </option>
          <option value="other">
            {{ t('contact.form.subject.options.other') }}
          </option>
        </select>
      </div>
      <div>
        <label for="message" class="block text-navy-700 mb-2 text-right">
          {{ t('contact.form.message') }}
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
          required
        ></textarea>
      </div>
      <div class="flex items-center mt-4 justify-start">
        <input type="checkbox" id="privacy" v-model="form.privacy" required />
        <label for="privacy" class="text-navy-700 text-right mr-2">
          {{ t('contact.form.privacy.agree') }}
          <a href="#" class="text-[#0124D4] hover:underline ml-1">
            {{ t('contact.form.privacy.policy') }}
          </a>
        </label>
      </div>
      <button
        type="submit"
        class="w-full bg-[#0124D4] hover:bg-[#0124D4]/90 text-navy-100 font-bold py-3 px-4 rounded-lg transition duration-300"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? t('contact.form.sending') : t('contact.form.send') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const { t } = useLanguage();

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false,
});

const isSubmitting = ref(false);

// Form submission
const submitForm = () => {
  isSubmitting.value = true;

  // Simulate form submission
  setTimeout(() => {
    alert(t('contact.form.success'));
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false,
    };
    isSubmitting.value = false;
  }, 1500);
};
</script>

<style scoped>
/* Component-specific styles */
</style>
