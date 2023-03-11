<template>
  <div
    :id="title"
    class="track__container"
    @click="$emit('onClick', index, title)"
  >
    <div class="track__number">
      {{ index + 1 }}
    </div>
    <div class="track__title">
      {{ title }}
    </div>
    <div class="track__duration">
      {{ duration }}
    </div>
  </div>
  <div
    style="width: 1rem; height: 1rem; margin-left: auto"
    @click="$emit('onDelete', title)"
  >
    <IconClose color="white" />
  </div>
</template>
<script setup>
const emit = defineEmits(["onClick", "onDelete"]);
const props = defineProps({
  duration: {
    required: true,
    type: String,
  },
  index: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
});
</script>

<style>
@import "./Track.css";
</style>
