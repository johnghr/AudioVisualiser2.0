<template>
  <input
    :id="id"
    :max="max"
    :min="min"
    :step="step"
    type="range"
    :value="value"
    @change="(event) => $emit('onChange', event)"
  />
</template>

<script setup>
defineProps({
  class: {
    default: "",
    required: false,
    type: String,
  },
  id: {
    default: "",
    required: false,
    type: String,
  },
  max: {
    default: 100,
    required: false,
    type: Number,
  },
  min: {
    default: 0,
    required: false,
    type: Number,
  },
  step: {
    default: 1,
    required: false,
    type: Number,
  },
  value: {
    default: 0,
    required: false,
    type: Number,
  },
});
</script>

<style>
@import "./Range.css";
</style>
