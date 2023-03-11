<template>
  <div id="television">
    <div id="test-canvas" :class="televisionOn && 'static'" />
    <div id="television__power-button">
      <div id="television__power-indicator" :class="televisionOn && 'on'" />
      <Button
        :variant="
          televisionOn
            ? 'television-power-button on'
            : 'television-power-button'
        "
        @click="televisionOn = !televisionOn"
      >
      </Button>
    </div>
    <TelevisionSVG />
  </div>
</template>

<script setup>
const televisionOn = ref(false);
</script>

<style>
@import "./Television.css";
</style>
