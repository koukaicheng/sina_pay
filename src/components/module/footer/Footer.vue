<template>
  <section class="ts-footer">

    <router-link class="footer-tab-item" to="/home">
      <img class="icon-index" :src="getPath('weihome')"/>
      <span class="text-item">首页</span>
    </router-link>
    <router-link class="footer-tab-item" to="/financing">
      <img class="icon-order" :src="getPath('weifinancing') "/>

      <span class="text-item">理财</span>
    </router-link>
    <router-link class="footer-tab-item" to="/mine">
      <img class="icon-personal" :src="getPath('weimine')"/>

      <span class="text-item">我的</span>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'ds-footer',
  data () {
    return {
      status: '',
      imgNames: {home: 'weihome', financing: 'weifinancing', mine: 'weimine'},
      getPath: path => {
        let currentRouterName = this.$route.name
        if (this.imgNames[currentRouterName] === path) {
          path = path.substr(3)
        }
        return require(`../../../assets/img/widgets/${path}.png`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/variables';
@import '../../../assets/css/mixin';

.ts-footer {
  position: fixed;
  z-index: 1002;
  width: 100%;
  left: 0;
  bottom: 0;
  @include fja(space-between);
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  background-color: #fff;
  height: 46px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.2px;
    background: #e6e6e6;
    transform: scaleY(0.6);
  }
  .footer-tab-item {
    flex: 1;
    @include fja();
    flex-direction: column;
    width: 0;
    text-align: center;
    height: 100%;
    &.router-link-active {
      .text-item {
        color: #4A4861;
      }
    }
    img {
      margin-top: 4px;
      @include wh(21px, 21px);
    }
    .icon-index {
    }
    .icon-order {
    }
    .icon-personal {
    }
    .text-item {
      @include sc(10px, #BDBDBD);
      margin-top: 2px;
    }
  }
}
</style>
