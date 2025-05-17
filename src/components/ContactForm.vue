<template>
  <div class="bg-white rounded-lg shadow-lg p-6 min-h-full">
    <!-- Privacy Policy Modal -->
    <PrivacyPolicy
      :is-open="showPrivacyPolicy"
      @close="showPrivacyPolicy = false"
    />
    <h3
      class="text-xl font-bold text-navy-900 mb-6"
      :class="direction === 'rtl' ? 'text-right' : 'text-left'"
    >
      {{ t('contact.form.title') }}
    </h3>

    <!-- Success Message -->
    <div
      v-if="formSuccess"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
      :class="direction === 'rtl' ? 'text-right' : 'text-left'"
    >
      {{ t('contact.form.success') }}
    </div>

    <!-- Error Message -->
    <div
      v-if="formError"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      :class="direction === 'rtl' ? 'text-right' : 'text-left'"
    >
      {{ formError }}
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            for="name"
            class="block text-navy-700 mb-2"
            :class="direction === 'rtl' ? 'text-right' : 'text-left'"
          >
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
          <label
            for="email"
            class="block text-navy-700 mb-2"
            :class="direction === 'rtl' ? 'text-right' : 'text-left'"
          >
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
        <label
          for="phone"
          class="block text-navy-700 mb-2"
          :class="direction === 'rtl' ? 'text-right' : 'text-left'"
        >
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
        <label
          for="subject"
          class="block text-navy-700 mb-2"
          :class="direction === 'rtl' ? 'text-right' : 'text-left'"
        >
          {{ t('contact.form.subject.label') }}
        </label>
        <div class="relative">
          <select
            id="subject"
            v-model="form.subject"
            class="custom-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 appearance-none"
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
          <!-- Custom dropdown arrow -->
          <div
            class="pointer-events-none absolute inset-y-0"
            :class="direction === 'rtl' ? 'left-0 pl-3' : 'right-0 pr-3'"
            style="display: flex; align-items: center"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label
          for="message"
          class="block text-navy-700 mb-2"
          :class="direction === 'rtl' ? 'text-right' : 'text-left'"
        >
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
        <label
          for="privacy"
          class="text-navy-700"
          :class="[direction === 'rtl' ? 'text-right mr-2' : 'text-left ml-2']"
        >
          {{ t('contact.form.privacy.agree') }}
          <a
            href="#"
            @click.prevent="showPrivacyPolicy = true"
            class="text-[#0124D4] hover:underline"
            :class="direction === 'rtl' ? 'mr-1' : 'ml-1'"
          >
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
import PrivacyPolicy from './PrivacyPolicy.vue';
import emailjs from '@emailjs/browser';

const { t, direction } = useLanguage();
const showPrivacyPolicy = ref(false);
const formError = ref('');
const formSuccess = ref(false);

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
const submitForm = async () => {
  isSubmitting.value = true;
  formError.value = '';
  formSuccess.value = false;

  try {
    // Get the selected subject text
    let subjectText = form.value.subject;
    if (form.value.subject === 'account') {
      subjectText = t('contact.form.subject.options.account');
    } else if (form.value.subject === 'info') {
      subjectText = t('contact.form.subject.options.info');
    } else if (form.value.subject === 'support') {
      subjectText = t('contact.form.subject.options.support');
    } else if (form.value.subject === 'other') {
      subjectText = t('contact.form.subject.options.other');
    }

    // Get current time in a readable format
    const now = new Date();
    const currentTime = now.toLocaleString();

    // Prepare template parameters to match your EmailJS template
    const templateParams = {
      name: form.value.name,
      email: form.value.email,
      phone_num: form.value.phone, // Changed from 'phone' to 'phone_num' to match your template
      title: subjectText,
      message: form.value.message,
      time: currentTime, // Added current time
      reply_to: form.value.email,
    };

    // Send email using EmailJS
    const result = await emailjs.send(
      'service_3xqjakd',
      'template_ww6bw5t',
      templateParams
    );

    if (result.text === 'OK') {
      formSuccess.value = true;
      // Reset form
      form.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false,
      };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    formError.value =
      t('contact.form.error') ||
      'There was an error sending your message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom select styling for cross-browser consistency */
.custom-select {
  /* Remove default styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Ensure consistent text alignment */
  text-align: inherit;

  /* Prevent text overflow */
  text-overflow: ellipsis;

  /* Ensure consistent background */
  background-color: white;
}

/* Remove default arrow in IE */
.custom-select::-ms-expand {
  display: none;
}

/* Ensure proper padding for the custom arrow */
.custom-select {
  padding-right: 2.5rem;
}

/* RTL support for padding */
:deep([dir='rtl']) .custom-select {
  padding-right: 1rem;
  padding-left: 2.5rem;
}

/* Ensure focus styles are consistent */
.custom-select:focus {
  border-color: #0124d4;
  outline: none;
  box-shadow: 0 0 0 2px rgba(1, 36, 212, 0.2);
}
</style>
