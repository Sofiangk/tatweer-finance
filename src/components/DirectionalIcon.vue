<template>
  <div class="flex items-center" :class="alignmentClass">
    <component
      :is="icon"
      :class="[iconClass, { 'rtl-flip': shouldFlip && direction === 'rtl' }]"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  iconClass: {
    type: String,
    default: 'w-5 h-5',
  },
  shouldFlip: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'start', // 'start', 'end'
    validator: (value) => ['start', 'end'].includes(value),
  },
});

const { direction } = useLanguage();

const alignmentClass = computed(() => {
  if (props.position === 'start') {
    return direction.value === 'rtl' ? 'flex-row' : 'flex-row';
  } else {
    return direction.value === 'rtl' ? 'flex-row' : 'flex-row';
  }
});
</script>
