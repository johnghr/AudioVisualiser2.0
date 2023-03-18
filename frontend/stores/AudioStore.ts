import { defineStore } from "pinia";
import { ITrack } from "~~/sharedTypes";
import { useVisualisationStore } from "./VisualisationStore";

export const useAudioStore = defineStore("AudioStore", () => {
  const visualisationStore = useVisualisationStore();

  const currentTrack = ref<ITrack>({
    title: "",
    index: 0,
    seconds: 0,
    duration: 0,
  });

  const ampOn = ref(false);
  const audioElement = ref<HTMLMediaElement>();
  const duration = ref(0);
  const initialTrackList = ref<ITrack[]>([]);
  const currentTrackList = ref<ITrack[]>([]);
  const recordPlayerOn = ref(false);
  const volume = ref(0.5);
  const intervalRef = ref(0);
  const trackProgress = ref(0);
  const trackProgressMinutes = computed(() => {
    const minutes = Math.floor(trackProgress.value / 60);
    const seconds = Math.round(trackProgress.value - minutes * 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  });

  const handlePlay = () => {
    audioElement.value!.src = `http://localhost:5000/uploads/${currentTrack.value.title}`;
    audioElement.value!.currentTime = trackProgress.value;
    if (!recordPlayerOn.value) recordPlayerOn.value = true;
    duration.value = currentTrack.value.seconds;
    audioElement.value!.play();
    visualisationStore.handleTick();
    startTimer();
  };

  const handleScrub = (time: number) => {
    clearInterval(intervalRef.value);
    audioElement.value!.currentTime = time;
    trackProgress.value = audioElement.value!.currentTime;
    startTimer();
  };

  const handleTrackSelect = (index: number) => {
    currentTrack.value = currentTrackList.value[index];
    currentTrack.value.index = index;
    trackProgress.value = 0;
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
    intervalRef.value = window.setInterval(() => {
      audioElement.value!.ended
        ? toNextTrack()
        : (trackProgress.value = audioElement.value!.currentTime);
    }, 1000);
  };

  watch(
    () => recordPlayerOn.value,
    (newValue) => (newValue ? handlePlay() : audioElement.value!.pause())
  );
  watch(
    () => ampOn.value,
    (newValue) =>
      newValue
        ? (audioElement.value!.volume = volume.value)
        : (audioElement.value!.volume = 0)
  );
  watch(
    () => volume.value,
    (newValue) => {
      if (ampOn.value) audioElement.value!.volume = newValue;
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
