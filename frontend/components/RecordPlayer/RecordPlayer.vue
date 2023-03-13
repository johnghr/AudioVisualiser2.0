<template>
  <div id="record-player">
    <div id="record-player__buttons">
      <div class="record-player__button" id="stop">
        <p class="record-player__text">START</p>
        <Button
          :variant="audioStore.recordPlayerOn ? 'simple on' : 'simple'"
          @click="audioStore.recordPlayerOn = true"
        />
      </div>
      <div class="record-player__button" id="start">
        <p class="record-player__text">STOP</p>
        <Button
          :variant="!audioStore.recordPlayerOn ? 'simple on' : 'simple'"
          @click="audioStore.recordPlayerOn = false"
        />
      </div>
    </div>
    <RecordPlayerSvgOff v-if="!audioStore.recordPlayerOn" />
    <RecordPlayerSvgOn v-if="audioStore.recordPlayerOn" />
    <RecordPlayerKnobs @toggled="(value) => (audioStore.ampOn = value)" />
    <div
      :class="audioStore.ampOn ? 'on' : 'off'"
      id="record-player__power-indicator"
    />
    <div id="record-player__track-progress-container">
      <InputRange
        :id="'record-player__track-progress'"
        :max="audioStore.duration"
        :value="audioStore.trackProgress"
        @on-change="(event) => audioStore.handleScrub(event.target.value)"
      />
      <p>
        {{ audioStore.trackProgressMinutes }} /
        {{ audioStore.currentTrack.duration }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";

const audioStore = useAudioStore();
</script>

<style scoped>
#record-player {
  width: 85%;
  position: relative;
}
.record-player__button {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#record-player__buttons {
  position: absolute;
  display: flex;
  align-items: center;
  right: 15%;
  top: 22%;
  height: 13%;
  width: 15%;
}
#record-player__power-indicator {
  width: 0.75%;
  position: absolute;
  bottom: 14%;
  height: 2%;
  border-radius: 50%;
  left: 24%;
  border: solid 2px black;
}
#record-player__power-indicator.off {
  background: radial-gradient(
    circle,
    rgb(214, 141, 72) 0%,
    rgb(177, 126, 55) 100%
  );
}
#record-player__power-indicator.on {
  background: radial-gradient(
    circle,
    rgb(217, 90, 40) 0%,
    rgb(232, 161, 27) 100%
  );
  box-shadow: 0px 0px 0px 1px rgba(230, 110, 59, 0.384),
    0px 0px 0px 2px rgba(201, 106, 77, 0.325),
    0px 0px 0px 3px rgba(174, 132, 104, 0.214);
}
.record-player__text {
  margin: 2px;
  font-size: 0.5em;
}
#record-player__track-progress-container {
  position: absolute;
  top: 23%;
  left: 30%;
  width: 35%;
  text-align: center;
  font-size: 1rem;
}
p {
  margin: 0;
  padding: 0;
}
</style>
