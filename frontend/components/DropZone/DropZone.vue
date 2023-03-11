<template>
  <div :class="class" @drop.prevent="onDrop">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  class: {
    required: false,
    default: "",
  },
});
const emit = defineEmits(["filesDropped"]);

const onDrop = (event) => emit("filesDropped", [...event.dataTransfer.files]);

const preventDefaults = (event) => {
  event.preventDefault();
};

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>
