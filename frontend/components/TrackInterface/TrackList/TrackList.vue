<template>
  <ul>
    <li
      class="track"
      :class="audioStore.currentTrack.title === title && 'selected'"
      v-for="({ title, duration }, index) in audioStore.currentTrackList"
    >
      <div
        class="track__container"
        @click="audioStore.handleTrackSelect(index)"
        @dblclick="hanldeDoubleClick"
      >
        <div class="track__number">
          {{ index + 1 }}
        </div>
        <div class="track__title">
          {{ title }}
        </div>
        <div class="track__duration">
          {{ duration }}
        </div>
      </div>
      <div
        style="width: 1rem; height: 1rem; margin-left: auto"
        @click="deleteTrack(title)"
      >
        <IconClose color="white" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";

const audioStore = useAudioStore();
const hanldeDoubleClick = () => console.log("twice the fun");
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
