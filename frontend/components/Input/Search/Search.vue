<template>
  <div class="search">
    <IconSearch variant="search-input" color="white" />
    <input
      class="search__input"
      placeholder="Search..."
      type="search"
      :value="value"
      @keyup="(event) => $emit('onSearch', event)"
    />
    <IconClose variant="search-close" color="white" @click="$emit('onClear')" />
  </div>
</template>
<script setup>
defineProps({
  value: {
    required: true,
    type: String,
  },
});
</script>
<style>
.search {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 100px;
}
.search__input {
  border: 1px solid grey;
  border-radius: 5px;
  /* height: 20px; */
  height: 50%;
  width: 100%;
  padding: 6px 30px;
  outline: 0;
  background-color: rgb(19, 19, 19);
  border: solid 1px white;
  color: white;
}
</style>
