<template>
  <input
    ref="textInputRef"
    type="text"
    :class="class"
    :value="value"
    @keyup="$emit('onChange', value)"
  />
</template>

<script setup>
defineProps({
  value: {
    required: true,
    type: String,
    default: "",
  },
});
</script>

<style scoped>
input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: #eeeeee00;
  color: white;
  font-size: 1rem;
}
</style>
