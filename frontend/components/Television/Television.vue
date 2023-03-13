<template>
  <div id="television">
    <div
      id="test-canvas"
      :class="visualisationStore.televisionOn && 'static'"
    />
    <TelevisionVisualiserCanvas />
    <div id="television__power-button">
      <div
        id="television__power-indicator"
        :class="visualisationStore.televisionOn && 'on'"
      />
      <Button
        :variant="
          visualisationStore.televisionOn
            ? 'television-power-button on'
            : 'television-power-button'
        "
        @click="
          visualisationStore.televisionOn = !visualisationStore.televisionOn
        "
      >
      </Button>
    </div>
    <TelevisionSVG />
  </div>
</template>

<script setup>
import { useVisualisationStore } from "~~/stores/VisualisationStore";

const visualisationStore = useVisualisationStore();
</script>

<style>
@import "./Television.css";
</style>
