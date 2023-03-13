import { defineStore } from "pinia";
import { useAudioStore } from "./AudioStore";

export const useVisualisationStore = defineStore("VisualisationStore", () => {
  const audioStore = useAudioStore(null);
  const audioContext = ref<AudioContext>();
  const audioData = ref(new Uint8Array(0));
  const analyser = ref<AnalyserNode>();
  const currentVisualiser = ref("waveform");
  const frequencyData = ref(new Uint8Array(0));
  const rafId = ref(0);
  const source = ref<MediaElementAudioSourceNode>();
  const televisionOn = ref(false);
  const waveFormData = ref<number[]>([]);

  const connectAudioToAnalyser = () => {
    source.value = audioContext.value!.createMediaElementSource(
      audioStore.audioElement!
    );
    analyser.value = audioContext.value!.createAnalyser();
    source.value.connect(analyser.value!);
    analyser.value!.connect(audioContext.value!.destination);
  };

  const waveformTick = () => {
    analyser.value!.fftSize = 2048;
    audioData.value = new Uint8Array(analyser.value!.fftSize);
    analyser.value!.getByteTimeDomainData(audioData.value);
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
