<template>
  <canvas id="visualiser-canvas" ref="canvas" :style="displayCanvas" />
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";
import { useVisualisationStore } from "~~/stores/VisualisationStore";
const audioStore = useAudioStore();
const visualisationStore = useVisualisationStore();
const canvas = ref(null);
let context;
const colours = [
  "#b92056",
  "#e85627",
  "#f0b54d",
  "#682957",
  "#67b9a9",
  "#2b5983",
];

const displayCanvas = computed(() => {
  if (
    visualisationStore.televisionOn === false ||
    audioStore.recordPlayerOn === false
  )
    return { display: "none" };
});

const draw = (waveformData) => {
  const randomIndex = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  const randomIndexTwo = Math.floor(Math.random() * (6 - 1 + 1) + 1);

  let x = 0;

  const sliceWidth = canvas.value.width / waveformData.length;
  context.fillStyle = colours[randomIndex];
  context.fillRect(0, 0, canvas.value.width, canvas.value.height);
  context.lineWidth = 2;
  context.strokeStyle = colours[randomIndexTwo];
  context.beginPath();
  context.moveTo(0, canvas.value.height / 2);

  for (const item of waveformData) {
    const y = (item / 255) * canvas.value.height;
    context.lineTo(x, y);
    x += sliceWidth;
  }

  context.lineTo(x, canvas.value.height / 2);
  context.stroke();
};

watch(
  () => visualisationStore.waveFormData,
  (newValue) => {
    visualisationStore.televisionOn && draw(newValue);
  }
);

onMounted(() => {
  context = canvas.value.getContext("2d");
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
