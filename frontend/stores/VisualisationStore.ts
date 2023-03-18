import { defineStore } from "pinia";
import { useAudioStore } from "./AudioStore";

export const useVisualisationStore = defineStore("VisualisationStore", () => {
  const audioStore = useAudioStore();
  const audioContext = ref<AudioContext>();

  type Visualiser =
    | "WAVEFORM"
    | "WAVEFORM_STROBE"
    | "FREQUENCY"
    | "FREQUENCY_STROBE";
  const visualisers: Visualiser[] = [
    "WAVEFORM",
    "WAVEFORM_STROBE",
    "FREQUENCY",
    "FREQUENCY_STROBE",
  ];

  const audioData = ref(new Uint8Array(0));
  const analyser = ref<AnalyserNode>();
  const canvas = ref<HTMLCanvasElement>();
  const canvasContext = ref();
  const currentVisualiser = ref<Visualiser>(visualisers[0]);
  const intervalId = ref(0);
  const source = ref<MediaElementAudioSourceNode>();
  const televisionOn = ref(false);

  const colours = [
    "#b92056",
    "#e85627",
    "#f0b54d",
    "#682957",
    "#67b9a9",
    "#2b5983",
  ];

  const connectAudioToAnalyser = () => {
    source.value = audioContext.value!.createMediaElementSource(
      audioStore.audioElement!
    );
    analyser.value = audioContext.value!.createAnalyser();
    source.value.connect(analyser.value!);
    analyser.value!.connect(audioContext.value!.destination);
  };

  const drawFrequency = () => {
    const randomIndex = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    currentVisualiser.value === "FREQUENCY_STROBE"
      ? (canvasContext.value.fillStyle = colours[randomIndex])
      : (canvasContext.value.fillStyle = "black");

    console.log(canvasContext.value.fillStyle);
    canvasContext.value.fillRect(
      0,
      0,
      canvas.value!.width,
      canvas.value!.height
    );

    const barWidth =
      (canvas.value!.width / analyser.value!.frequencyBinCount) * 2.5;
    let barHeight;
    let x = 0;

    for (var i = 0; i < analyser.value!.frequencyBinCount; i++) {
      // the height of a bar equals the current audio sample value halved
      barHeight = audioData.value[i] * 2.75;
      const red = (i * barHeight) / 20;
      const green = i * 6;
      const blue = barHeight / 2;
      canvasContext.value.fillStyle =
        "rgb(" + red + "," + green + "," + blue + ")";
      canvasContext.value.fillRect(
        x,
        canvas.value!.height - barHeight / 5,
        barWidth,
        barHeight
      );

      x += barWidth + 1;
    }
  };

  const drawWaveform = () => {
    const randomIndex = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const randomIndexTwo = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    let x = 0;
    canvasContext.value.clearRect(
      0,
      0,
      canvas.value!.width,
      canvas.value!.height
    );

    const sliceWidth = canvas.value!.width / audioData.value.length;
    currentVisualiser.value === "WAVEFORM_STROBE"
      ? (canvasContext.value.fillStyle = colours[randomIndex])
      : (canvasContext.value.fillStyle = "black");
    canvasContext.value.fillRect(
      0,
      0,
      canvas.value!.width,
      canvas.value!.height
    );
    canvasContext.value.lineWidth = 2;
    canvasContext.value.strokeStyle = colours[randomIndexTwo];
    canvasContext.value.beginPath();
    canvasContext.value.moveTo(0, canvas.value!.height / 2);

    for (const item of audioData.value) {
      const y = (item / 255) * canvas.value!.height;
      canvasContext.value.lineTo(x, y);
      x += sliceWidth;
    }

    canvasContext.value.lineTo(x, canvas.value!.height / 2);
    canvasContext.value.stroke();
  };

  const frequencyTick = () => {
    console.log("frequency tick");
    audioData.value = new Uint8Array(analyser.value!.fftSize / 2);
    analyser.value!.getByteFrequencyData(audioData.value);
    drawFrequency();
  };

  const handleTick = () => {
    intervalId.value && clearInterval(intervalId.value);
    if (!televisionOn.value || !audioStore.recordPlayerOn) {
      return;
    }
    if (currentVisualiser.value.includes("WAVEFORM"))
      intervalId.value = window.setInterval(waveformTick, 20);
    if (currentVisualiser.value.includes("FREQUENCY"))
      intervalId.value = window.setInterval(frequencyTick, 20);
  };

  const setChannel = (direction: "down" | "up") => {
    const lastIndex = visualisers.indexOf(currentVisualiser.value);
    if (direction === "down") {
      lastIndex === 0
        ? (currentVisualiser.value = visualisers[visualisers.length - 1])
        : (currentVisualiser.value = visualisers[lastIndex - 1]);
    } else {
      lastIndex === visualisers.length - 1
        ? (currentVisualiser.value = visualisers[0])
        : (currentVisualiser.value = visualisers[lastIndex + 1]);
    }
    if (intervalId.value) cancelAnimationFrame(intervalId.value);
    handleTick();
  };

  const waveformTick = () => {
    console.log("waveform tick");
    analyser.value!.fftSize = 2048;
    audioData.value = new Uint8Array(analyser.value!.fftSize);
    analyser.value!.getByteTimeDomainData(audioData.value);
    drawWaveform();
  };

  watch(
    () => televisionOn.value,
    () => audioStore.recordPlayerOn && handleTick()
  );

  watch(
    () => audioStore.recordPlayerOn,
    (newValue) =>
      !newValue && intervalId.value && clearInterval(intervalId.value)
  );

  return {
    analyser,
    audioContext,
    audioData,
    canvas,
    canvasContext,
    currentVisualiser,
    televisionOn,
    connectAudioToAnalyser,
    handleTick,
    setChannel,
    waveformTick,
  };
});
