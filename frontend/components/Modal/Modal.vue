<template>
  <div class="modal">
    <div class="modal-content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.modal {
  text-align: center;
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
