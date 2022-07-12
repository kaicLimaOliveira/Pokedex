<template>
  <div class="anim-3-circle anim-3"></div>
</template>

<style scoped>
.anim-3-circle {
  border-radius: 50%;
  border: 5px solid transparent;
}

.anim-3 {
  height: 60px;
  width: 60px;
  border-top-color: rgba(36, 36, 36, 0.5) !important;
  border-right-color: rgb(36, 36, 36) !important;
  border-left-color: rgb(36, 36, 36) !important;
  border-bottom-color: rgb(36, 36, 36) !important;
  border-top: 5px solid;
  animation: anim3 0.8s infinite cubic-bezier(0.77, 0.35, 0.3, 0.6);
}

@keyframes anim3 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>