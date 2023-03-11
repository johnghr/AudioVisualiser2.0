<template>
  <div :class="variant" class="svg container">
    <svg viewBox="0 96 960 960" preserveAspectRatio="xMinYMin meet">
      <path
        :fill="color"
        d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
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
  variant: {
    required: false,
    type: String,
    default: "",
  },
});
</script>
<style>
@import "./svg.css";
</style>
