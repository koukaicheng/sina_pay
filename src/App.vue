<template>
  <div id="app">
    <!--<ts-header title="新浪金融"></ts-header>-->
    <!--<transition :name="transitionName">-->
      <keep-alive :include="includePath">
        <router-view class="router"></router-view>
      </keep-alive>
    <!--</transition>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import transfer from './utils/transfer'

export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left',
      includePath: ['home', 'financing', 'mine', 'perfectIdentity'],
      excludePath: {
        home: true,
        mine: true,
        financing: true,
      }
    }
  },
  mounted () {
    transfer.$on('http_err', () => {
      setTimeout(() => {
        this.$modal({message: '您当前的网络环境不稳定，请稍后再试', cancel: true, lock: true, theme: 'ssss'})
      }, 1000)
    })
  },
  computed: {
    ...mapState(['network_status'])
  },
  watch: {
    $route (to, from) {
      let isBack = this.$router.isBack
      const isInclude = this.excludePath[from.name]
      const isToInclude = this.excludePath[to.name]
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        if (isInclude && isToInclude) {
          this.transitionName = ''
        } else {
          this.transitionName = 'slide-left'
        }
      }
      this.$router.isBack = false
    }
  },
}
</script>

<style lang="scss">
@import "./assets/css/global";
@import "./assets/css/variables";

.includeRouter {
  /*position: absolute;*/
  /*width: 100%;*/

  /*display: flex;*/
  /*flex-direction: column;*/
}

@mixin fullScreen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@mixin routeAnimation($duration) {
  z-index: $childZIndex;
  @extend .includeRouter;
  transition: $duration;
  background-color: #f7f7f7;
}

.router {
  @include routeAnimation(0.3s);
  backface-visibility: hidden;
}

.page-move-enter, .page-move-leave-active {
  transform: translate(100%, 0)
}

.page-move-enter-active, .page-move-leave-active {
  transition: transform .3s
}

.slide-left-enter,
.slide-right-leave-active {
  z-index: 1000;
  /*opacity: 0.2;*/
  /*transform: translate3d(100%, 0, 0);*/
}

.slide-left-leave-active {
  /*opacity: 0.2;*/
  //transform: translate3d(-100px, 0, 0);
}

.slide-right-enter {
  /*opacity: 0.2;*/
  /*//transform: translate3d(-200px, 0, 0);*/
}

.slide-child-leave-active,
.slide-child-enter {
  /*opacity: 0.2;*/
  //transform: translate3d(100%, 0, 0);
}

.child-route {
  transition: all 0.4s ease;
  z-index: 1000;
  @include fullScreen();
  @extend .includeRouter;
  .wrap {
    background-color: #f7f7f7;
  }
}
</style>
