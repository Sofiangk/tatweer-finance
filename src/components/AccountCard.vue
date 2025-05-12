<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl account-card"
    :class="[
      featured ? 'shadow-xl border-2 border-[#0124D4]' : 'border-gray-200',
      { 'hover:-translate-y-2': true },
    ]"
    :data-index="index"
  >
    <div
      v-if="featured"
      class="absolute top-0 left-0 right-0 bg-[#0124D4] text-white text-center py-1 font-bold text-sm"
    >
      {{ popularText }}
    </div>
    <div class="p-6 border-b border-gray-200" :class="{ 'pt-8': featured }">
      <h3 class="text-xl font-bold text-navy-900 mb-2">
        {{ title }}
      </h3>
      <p class="text-navy-700 mb-4">
        {{ description }}
      </p>
    </div>
    <div class="p-6">
      <ul class="space-y-3">
        <li
          v-for="(feature, index) in features"
          :key="index"
          class="flex items-center"
          :class="{ 'flex-row justify-end': direction === 'rtl' }"
        >
          <CheckIcon
            class="w-5 h-5 text-[#0124D4] flex-shrink-0"
            :class="direction === 'rtl' ? 'mr-2' : 'ml-2'"
          />
          <span>{{ feature }}</span>
        </li>
      </ul>
      <a
        href="#contact"
        class="block text-center font-bold py-2 px-4 rounded-lg mt-6 transition duration-300 transform hover:scale-105"
        :class="[
          featured
            ? 'bg-[#0124D4] hover:bg-[#0124D4]/90 text-white'
            : 'bg-navy-900 hover:bg-navy-800 text-white',
        ]"
      >
        {{ buttonText }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from 'lucide-vue-next';
import { useLanguage } from '../composables/useLanguage';

const { direction } = useLanguage();

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: 'Open Account',
  },
  popularText: {
    type: String,
    default: 'Most Popular',
  },
  index: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.account-card {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  position: relative;
}

.account-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* RTL specific adjustments */
[dir='rtl'] .account-card ul li {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

[dir='rtl'] .account-card ul li svg {
  margin-left: 0;
  margin-right: 0.5rem;
}
</style>
