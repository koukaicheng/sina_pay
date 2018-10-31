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
  name: 'success',
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
  background-image: url("../../../../assets/img/mine/success.png");
  animation: mint-spinner-rotate 1.6s infinite linear;
}
</style>
