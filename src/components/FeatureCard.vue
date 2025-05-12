<template>
  <div
    class="bg-navy-800 rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg feature-card"
    :data-index="index"
  >
    <div
      class="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-navy-900 mx-auto mb-4 transform transition-transform duration-500 hover:scale-110"
    >
      <component :is="icon" class="w-8 h-8" />
    </div>
    <h3 class="text-xl font-bold mb-3">{{ title }}</h3>
    <p class="text-gray-300 mb-4">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
  learnMoreText: {
    type: String,
    default: 'تواصل معنا',
  },
});
</script>

<style scoped>
.feature-card {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.feature-card:hover {
  background-color: rgba(30, 41, 59, 0.9);
}

.feature-card:hover .rounded-full {
  transform: scale(1.1) rotate(5deg);
}
</style>
