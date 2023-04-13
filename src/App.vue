<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

#app {
  width: 1510px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

/* 当鼠标移上滚动条时，显示的滑块样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
