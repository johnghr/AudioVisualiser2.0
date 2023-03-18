<template>
  <div id="television">
    <div
      id="test-canvas"
      :class="visualisationStore.televisionOn && 'static'"
    />
    <TelevisionVisualiserCanvas />
    <IconCaretDown color="white" id="caret-down" />
    <IconCaretUp color="white" id="caret-up" />
    <Button
      variant="simple tv"
      id="channel-down-button"
      @click="visualisationStore.setChannel('down')"
    />
    <Button
      variant="simple tv"
      id="channel-up-button"
      @click="visualisationStore.setChannel('up')"
    />
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
@import "../../components/Button/Button.css";
</style>
