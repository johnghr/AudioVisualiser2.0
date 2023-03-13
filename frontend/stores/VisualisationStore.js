import { defineStore } from "pinia";
import { useAudioStore } from "./AudioStore";

export const useVisualisationStore = defineStore("VisualisationStore", () => {
  const audioStore = useAudioStore();

  const audioContext = ref(null);
  const audioData = ref(null);
  const analyser = ref(null);
  const frequencyData = ref(new Uint8Array(0));
  const rafId = ref(null);
  const source = ref(null);
  const televisionOn = ref(false);
  const waveFormData = ref(null);

  const connectAudioToAnalyser = () => {
    source.value = audioContext.value.createMediaElementSource(
      audioStore.audioElement
    );
    analyser.value = audioContext.value.createAnalyser();
    source.value.connect(analyser.value);
    analyser.value.connect(audioContext.value.destination);
  };

  const waveformTick = () => {
    analyser.value.fftSize = 2048;
    audioData.value = new Uint8Array(analyser.value.fftSize);
    analyser.value.getByteTimeDomainData(audioData.value);
    waveFormData.value = [...audioData.value];
    rafId.value = requestAnimationFrame(waveformTick);
  };

  return {
    audioContext,
    televisionOn,
    waveFormData,
    connectAudioToAnalyser,
    waveformTick,
  };
});
