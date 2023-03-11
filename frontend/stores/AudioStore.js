import { defineStore } from "pinia";

export const useAudioStore = defineStore("AudioStore", () => {
  const ampOn = ref(false);
  const audioElement = ref(null);
  const currentTrack = ref({
    title: null,
    index: null,
    seconds: null,
    duration: null,
  });
  const duration = ref(0);
  const initialTrackList = ref([]);
  const currentTrackList = ref([]);
  const recordPlayerOn = ref(false);
  const volume = ref(0.5);
  const intervalRef = ref(null);
  const trackProgress = ref(0);
  const trackProgressMinutes = computed(() => {
    const minutes = Math.floor(trackProgress.value / 60);
    const seconds = Math.round(trackProgress.value - minutes * 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  });

  const handlePlay = () => {
    audioElement.value.src = `http://localhost:5000/uploads/${currentTrack.value.title}`;
    if (!recordPlayerOn.value) recordPlayerOn.value = true;
    duration.value = currentTrack.value.seconds;
    audioElement.value.play();
    startTimer();
  };

  const handleScrub = (time) => {
    clearInterval(intervalRef.value);
    audioElement.value.currentTime = time;
    trackProgress.value = audioElement.value.currentTime;
    startTimer();
  };

  const handleTrackSelect = (index) => {
    currentTrack.value = currentTrackList.value[index];
    currentTrack.value.index = index;
    handlePlay();
  };

  const toNextTrack = () => {
    trackProgress.value = 0;
    const currentIndex = currentTrack.value.index;
    if (currentIndex < currentTrackList.value.length - 1) {
      currentTrack.value = currentTrackList.value[currentIndex + 1];
      currentTrack.value.index = currentIndex + 1;
    } else {
      currentTrack.value = currentTrackList.value[0];
      currentTrack.value.index = 0;
    }
    handlePlay();
  };

  const startTimer = () => {
    clearInterval(intervalRef.value);
    intervalRef.value = setInterval(() => {
      audioElement.value.ended
        ? toNextTrack()
        : (trackProgress.value = audioElement.value.currentTime);
    }, [1000]);
  };

  watch(
    () => recordPlayerOn.value,
    (newValue) => (newValue ? handlePlay() : audioElement.value.pause())
  );
  watch(
    () => ampOn.value,
    (newValue) =>
      newValue
        ? (audioElement.value.volume = volume.value)
        : (audioElement.value.volume = 0)
  );
  watch(
    () => volume.value,
    (newValue) => {
      if (ampOn.value) audioElement.value.volume = newValue;
    }
  );
  return {
    ampOn,
    audioElement,
    currentTrack,
    currentTrackList,
    duration,
    initialTrackList,
    recordPlayerOn,
    trackProgress,
    trackProgressMinutes,
    volume,
    handleScrub,
    handleTrackSelect,
    toNextTrack,
  };
});
