<template>
  <div class="modal-content">
    <slot></slot>
  </div>
</template>

<style>
.modal-content {
  color: rgb(218, 218, 218);
  background-color: rgb(19, 19, 19);
  border-radius: 1rem;
  margin: 40vh auto;
  padding: 30px;
  border: 2px solid rgb(217, 217, 217);
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: large;
  font-weight: bold;
}
</style>
