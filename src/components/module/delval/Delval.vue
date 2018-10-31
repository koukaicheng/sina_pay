<template>
  <div>
    <div class="del" @click="$emit('click')"></div>
  </div>
</template>

<script>

  export default {
    name: 'del-val',
    data () {
      return {}
    },
    created () {},
    mounted () {},
    methods: {},
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .del {
    @include wh(24px, 24px);
    @include bg-image('../../../assets/img/mine/del');
  }
</style>
