<template>
  <div id="app-container">
    <div id="media-container">
      <Television />
      <RecordPlayer />
    </div>
    <TrackInterface />
  </div>
  <Modal v-if="!permissionGiven">
    <ModalContent>
      <p id="permission-text">Grant permission to use the Web Audio API</p>
      <Button variant="primary" @click="handleClick">Lets go!</Button>
    </ModalContent>
  </Modal>
</template>

<script setup>
import { useAudioStore } from "./stores/AudioStore";
import { useVisualisationStore } from "./stores/VisualisationStore";

const audioStore = useAudioStore();
const visualisationStore = useVisualisationStore();

const { data: tracks } = await useAsyncData("tracks", () =>
  $fetch("http://localhost:5000/")
);

const permissionGiven = ref(false);
const handleClick = () => {
  audioStore.initialTrackList = tracks.value;
  audioStore.currentTrackList = audioStore.initialTrackList;
  audioStore.currentTrack = tracks.value[0];
  audioStore.currentTrack.index = 0;
  audioStore.audioElement = new Audio(
    `http://localhost:5000/uploads/${audioStore.currentTrack.title}`
  );
  audioStore.audioElement.crossOrigin = "anonymous";

  audioStore.audioElement.volume = 0;
  audioStore.audioElement.preload = "metada";
  visualisationStore.audioContext = new AudioContext();
  permissionGiven.value = true;
  visualisationStore.connectAudioToAnalyser();
};
</script>

<style>
@import "./app.css";
</style>
