<template>
  <form method="post" enctype="multipart/form-data" ref="formRef">
    <div class="track-interface">
      <div id="track-interface__header">
        <div id="track-interface__track-number">
          <IconHash color="#fbfbfb" />
        </div>
        <div id="track-interface__track-title">
          <div
            :style="!searching && { display: 'none' }"
            id="track-interface__search"
            ref="searchInput"
          >
            <InputSearch
              :value="searchQuery"
              @on-search="handleSearch"
              @on-clear="searchQuery = ''"
            />
          </div>
          <p id="track-interface__track-title-text">Title</p>
          <div
            :style="searching && { display: 'none' }"
            ref="searchTrigger"
            id="search-icon__container"
          >
            <IconSearch variant="svg-container" color="#fbfbfb" />
          </div>
        </div>
        <div id="track-interace__track-duration">
          <div id="track-interace__duration-icon">
            <IconDuration color="#fbfbfb" />
          </div>
        </div>
      </div>
      <TrackList v-if="audioStore.currentTrackList" />

      <div id="track-interace__upload">
        <label class="track-interace__upload-button">
          <input
            name="track"
            id="file-input"
            type="file"
            accept="audio/*"
            @change="(event) => uploadFiles(event)"
          />
          Upload Track
        </label>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useAudioStore } from "~~/stores/AudioStore";

const audioStore = useAudioStore();
const formRef = ref(null);
const searching = ref(false);
const searchInput = ref(null);
const searchTrigger = ref(null);
const searchQuery = ref("");

const handleClickOutside = (event) => {
  if (!searchInput.value.contains(event.target) && searching.value) {
    searching.value = false;
  }
  if (searchTrigger.value.contains(event.target)) {
    searching.value = true;
  }
};

const uploadFiles = async (event) => {
  event.preventDefault();
  let formData = new FormData(formRef.value);
  const { data: newTrack } = await useFetch("http://localhost:5000/upload", {
    method: "post",
    body: formData,
  });
  audioStore.initialTrackList = [
    ...audioStore.initialTrackList,
    newTrack.value,
  ];
  audioStore.currentTrackList = audioStore.initialTrackList;
};

const handleSearch = (event) => {
  searchQuery.value = event.target.value;
  if (searchQuery.value === "") {
    audioStore.currentTrackList = audioStore.initialTrackList;
  } else {
    audioStore.currentTrackList = audioStore.initialTrackList.filter(
      ({ title }) => title.includes(searchQuery.value)
    );
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});
</script>
<style>
@import "./TrackInterface.css";
</style>
