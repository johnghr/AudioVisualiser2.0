<template>
  <button :class="variant" v-if="!label">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  label: {
    required: false,
    default: false,
  },
  variant: {
    required: false,
    default: "",
    type: String,
  },
});
</script>

<style>
@import "./Button.css";
</style>
