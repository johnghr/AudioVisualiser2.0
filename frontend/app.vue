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
html {
  height: 100vh;
}
body {
  background: linear-gradient(90deg, #2b5983, #67b9a9);
  margin: 0;
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
  color: #fbfbfb;
  height: 100%;
}
#__nuxt {
  height: 100%;
}
#app-container {
  width: 100%;
  height: 100%;
  display: flex;
}
#media-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
}
#permission-text {
  max-width: 19ch;
  text-align: center;
}
</style>
