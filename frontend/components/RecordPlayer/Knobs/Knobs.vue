<template>
  <RecordPlayerKnob
    :class="'power'"
    :degrees="60"
    type="two-way-selector"
    @toggled="(value) => $emit('toggled', value)"
  >
    <RecordPlayerKnobSvgPower />
  </RecordPlayerKnob>
  <RecordPlayerKnob
    :class="'volume'"
    :degrees="300"
    @turned="(value) => (audioStore.volume = value)"
  >
    <RecordPlayerKnobSvgVolume />
  </RecordPlayerKnob>
  <RecordPlayerKnob :class="'bass'" :degrees="300">
    <RecordPlayerKnobSvgBass />
  </RecordPlayerKnob>
  <RecordPlayerKnob :class="'treble'" :degrees="300">
    <RecordPlayerKnobSvgTreble />
  </RecordPlayerKnob>
  <RecordPlayerKnob :class="'balance'" :degrees="240">
    <RecordPlayerKnobSvgBalance />
  </RecordPlayerKnob>
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";
defineEmits(["toggled"]);
const audioStore = useAudioStore();
</script>
