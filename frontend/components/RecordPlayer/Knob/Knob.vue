<template>
  <div @mousedown="handleDrag" class="drag-container">
    <slot></slot>

    <div class="knob" :class="class">
      <svg
        viewBox="0 0 126 133"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :style="style"
        ref="circle"
        class="rotator"
        :class="class"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.4907 114.586C43.1149 139.168 83.0043 139.134 107.586 114.509C132.168 89.8851 132.134 49.9957 107.509 25.4139C98.1263 16.047 86.5267 10.2543 74.4023 8.03446L74.6044 1.20775L60.9675 0.803926L60.7828 7.03876C45.3886 7.57758 30.1551 13.7292 18.4139 25.4906C-6.16792 50.1149 -6.13355 90.0042 18.4907 114.586Z"
          fill="url(#paint0_linear_24_347)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_24_347"
            x1="107.25"
            y1="134.662"
            x2="126.738"
            y2="-225.979"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.311756" stop-color="#1B1B1B" />
            <stop offset="0.707589" stop-color="#BBBBBB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggled", "turned"]);
const props = defineProps({
  class: {
    required: true,
    type: String,
  },
  degrees: {
    required: true,
    type: Number,
  },
  type: {
    required: false,
    type: String,
    default: "linear",
  },
});
const circle = ref(null);

const offSet = 360 - props.degrees;
const startDegree = 360 - props.degrees - offSet;
const maxDegree = 360 / 2 - offSet / 2;
const minDegree = 360 / 2 + offSet / 2;

const currentDegree = ref(
  props.type === "two-way-selector" ? minDegree : startDegree
);

const style = computed(() => `transform: rotate(${currentDegree.value}deg)`);

const moveHandler = (event) => {
  const width = circle.value.clientWidth / 2;
  const height = circle.value.clientHeight / 2;
  const mouseXCoordinate =
    event.clientX - circle.value.getBoundingClientRect().left;
  const mouseYCoordinate =
    event.clientY - circle.value.getBoundingClientRect().top;
  // The difference between the window width and the mouse x-coordinate and
  // the same for mouse y coordinate and window height
  const deltaX = width - mouseXCoordinate;
  const deltaY = height - mouseYCoordinate;

  // Represents the mouses position on the screen in radians. A radian is the
  // angle made when the radius - the distance between the center of a circle
  // and its circumference - is wrapped round the perimeter of the circle
  const radian = Math.atan2(deltaY, deltaX);

  // 1 Radian is about 57.2958... degrees. A semi cirlce, which is 180 degrees,
  // is 3.1416.. radians or in other words PI.
  // The above only works up to 180 degrees
  let radians = Math.round(radian * (180 / Math.PI));
  let finalValue = radians < 0 ? (radians + 360) % 360 : radians;
  if (finalValue > maxDegree && finalValue < minDegree) return;
  if (props.type === "linear") {
    if (finalValue <= maxDegree) {
      const value = (0.5 / (props.degrees / 2)) * finalValue + 0.5;
      emit("turned", value);
    }
    if (finalValue >= minDegree) {
      const value =
        (0.5 / (props.degrees / 2)) * Math.abs(minDegree - finalValue);
      emit("turned", value);
    }
  }
  if (props.type === "two-way-selector") {
    if (finalValue >= minDegree) {
      currentDegree.value = minDegree;
      emit("toggled", false);
    } else {
      emit("toggled", true);
      currentDegree.value = maxDegree;
    }
    return;
  }
  currentDegree.value = finalValue;
};

const handleDrag = () => {
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", moveHandler);
  });
};
</script>

<style>
@import "./Knob.css";
</style>
