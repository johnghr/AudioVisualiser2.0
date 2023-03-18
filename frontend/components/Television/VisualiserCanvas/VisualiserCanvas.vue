<template>
  <canvas id="visualiser-canvas" ref="canvas" :style="displayCanvas" />
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";
import { useVisualisationStore } from "~~/stores/VisualisationStore";
const audioStore = useAudioStore();
const visualisationStore = useVisualisationStore();
const canvas = ref(null);

const displayCanvas = computed(() => {
  if (
    visualisationStore.televisionOn === false ||
    audioStore.recordPlayerOn === false
  )
    return { display: "none" };
});

onMounted(() => {
  visualisationStore.canvas = canvas.value;
  visualisationStore.canvasContext = visualisationStore.canvas.getContext("2d");
});
</script>

<style>
canvas {
  width: 71%;
  height: 77%;
  position: absolute;
  left: 6%;
  top: 10%;
  z-index: 2;
}
</style>
