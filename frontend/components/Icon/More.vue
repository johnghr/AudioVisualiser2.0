<template>
  <div class="svg-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        :fill="color"
        d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
      />
    </svg>
  </div>
</template>
<script setup>
defineProps({
  color: {
    required: false,
    type: String,
    default: "black",
  },
});
</script>
<style>
@import "./svg.css";
</style>
