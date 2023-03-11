<template>
  <ul>
    <li
      class="track"
      :class="audioStore.currentTrack.title === title && 'selected'"
      v-for="({ title, duration }, index) in audioStore.currentTrackList"
    >
      <Track
        :duration="duration"
        :index="index"
        :title="title"
        @on-click="(index) => audioStore.handleTrackSelect(index)"
      />
    </li>
  </ul>
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";

const audioStore = useAudioStore();
const deleteTrack = (track) => {
  useFetch(`http://localhost:5000/${track}`, {
    method: "DELETE",
  });
  audioStore.initialTrackList = audioStore.initialTrackList.filter(
    ({ title }) => title !== track
  );
  audioStore.currentTrackList = audioStore.initialTrackList;
};
</script>

<style scoped>
@import "./TrackList.css";
</style>
