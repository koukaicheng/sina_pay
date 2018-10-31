<template>
  <div class="kkc-loading-box" :style="{
   'height': spinnerSize,
    'width': spinnerSize
  }">

  </div>
</template>

<script>
  import common from './common.vue'

  export default {
    name: 'loading',
    data () {
      return {}
    },
    created () {},
    mixins: [common],
    methods: {},
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/css/mixin";

  .kkc-loading-box {
    background-size: 100% 100%;
    @include bg-image('../../../../assets/img/mine/loading');
    animation: mint-spinner-rotate 1.6s infinite linear;
  }

  @keyframes mint-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
