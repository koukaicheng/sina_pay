<template>
  <div class="mint-spinner-snake" :style="{
    'border-top-color': spinnerColor,
    'border-left-color': spinnerColor,
    'border-bottom-color': spinnerColor,
    'height': spinnerSize,
    'width': spinnerSize
    }">
  </div>
</template>

<script>
  import common from './common.vue'

  export default {
    name: 'snake',
    mixins: [common]
  }
</script>

<style lang="scss" scoped>
  @import "spinner.css";
</style>
