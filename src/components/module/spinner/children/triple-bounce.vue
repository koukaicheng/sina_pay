<template>
  <div class="mint-spinner-triple-bounce">
    <div class="mint-spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
  </div>
</template>

<script>
  import common from './common.vue'

  export default {
    name: 'triple-bounce',
    mixins: [common],
    computed: {
      spinnerSize () {
        return ((this.size || this.$parent.size || 28) / 3) + 'px'
      },
      bounceStyle () {
        return {
          width: this.spinnerSize,
          height: this.spinnerSize,
          backgroundColor: this.spinnerColor
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "spinner.css";
</style>
