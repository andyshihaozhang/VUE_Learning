<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// App level logic can be added here
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  flex-shrink: 0;
}

/* 隐藏所有滚动条 */
::-webkit-scrollbar {
  display: none;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
