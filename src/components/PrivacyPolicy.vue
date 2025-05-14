<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" v-if="isOpen">
    <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-navy-900" :class="direction === 'rtl' ? 'text-right' : 'text-left'">
            {{ t('privacy.title') }}
          </h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div :class="direction === 'rtl' ? 'text-right' : 'text-left'">
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.introduction.title') }}</h3>
          <p class="mb-4">{{ t('privacy.introduction.content') }}</p>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.dataCollection.title') }}</h3>
          <p class="mb-2">{{ t('privacy.dataCollection.content') }}</p>
          <ul class="list-disc mb-4" :class="direction === 'rtl' ? 'pr-5' : 'pl-5'">
            <li v-for="(item, index) in t('privacy.dataCollection.items')" :key="index" class="mb-1">
              {{ item }}
            </li>
          </ul>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.dataUse.title') }}</h3>
          <p class="mb-2">{{ t('privacy.dataUse.content') }}</p>
          <ul class="list-disc mb-4" :class="direction === 'rtl' ? 'pr-5' : 'pl-5'">
            <li v-for="(item, index) in t('privacy.dataUse.items')" :key="index" class="mb-1">
              {{ item }}
            </li>
          </ul>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.dataSecurity.title') }}</h3>
          <p class="mb-4">{{ t('privacy.dataSecurity.content') }}</p>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.cookies.title') }}</h3>
          <p class="mb-4">{{ t('privacy.cookies.content') }}</p>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.thirdParty.title') }}</h3>
          <p class="mb-4">{{ t('privacy.thirdParty.content') }}</p>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.rights.title') }}</h3>
          <p class="mb-2">{{ t('privacy.rights.content') }}</p>
          <ul class="list-disc mb-4" :class="direction === 'rtl' ? 'pr-5' : 'pl-5'">
            <li v-for="(item, index) in t('privacy.rights.items')" :key="index" class="mb-1">
              {{ item }}
            </li>
          </ul>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.changes.title') }}</h3>
          <p class="mb-4">{{ t('privacy.changes.content') }}</p>
          
          <h3 class="text-xl font-semibold mb-2">{{ t('privacy.contact.title') }}</h3>
          <p class="mb-4">{{ t('privacy.contact.content') }}</p>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button 
            @click="close" 
            class="bg-[#0124D4] hover:bg-[#0124D4]/90 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            {{ t('privacy.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useLanguage } from '../composables/useLanguage';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const { t, direction } = useLanguage();

const close = () => {
  emit('close');
};
</script>

<style scoped>
/* Prevent body scrolling when modal is open */
:deep(body.modal-open) {
  overflow: hidden;
}
</style>
