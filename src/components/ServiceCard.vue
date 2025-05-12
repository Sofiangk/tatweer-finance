<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl service-card"
    :data-index="index"
  >
    <div class="h-48 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-navy-900 mb-3">
        {{ title }}
      </h3>
      <p class="text-navy-700 mb-4">
        {{ description }}
      </p>
      <a
        href="#contact"
        class="inline-block text-[#0124D4] hover:text-[#0124D4]/80 font-medium transition duration-300"
      >
        {{ learnMoreText }} →
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
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
.service-card {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.service-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
