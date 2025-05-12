<template>
  <div class="rtl-checkbox flex items-center" :class="{ 'flex-row': isRTL }">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="form-checkbox h-4 w-4 text-primary"
      :class="{ 'margin-fix': true }"
    />
    <label :for="id" class="select-none cursor-pointer">
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useLanguage } from '../../composables/useLanguage';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
});

defineEmits(['update:modelValue']);

const { isRTL } = useLanguage();

const marginClass = computed(() => {
  return {
    'ml-2': !isRTL.value,
    'mr-2': isRTL.value,
  };
});
</script>

<style scoped>
.rtl-checkbox input[type='checkbox'] {
  cursor: pointer;
}

/* Fix for positioning in RTL */
.flex-row input[type='checkbox'] {
  margin-right: 0;
}

.margin-fix {
  @apply ml-2;
}

[dir='rtl'] .margin-fix {
  @apply ml-0 mr-2;
}
</style>
