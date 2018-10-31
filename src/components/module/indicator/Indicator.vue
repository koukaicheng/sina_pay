<template>
  <transition name="mint-indicator">
    <div class="mint-indicator" v-show="visible">
      <div class="mint-indicator-wrapper">
        <div class="box">
          <spinner class="mint-indicator-spin" :type="convertedSpinnerType" :size="55"></spinner>
          <!--<div class="spinner">-->
          <!--<img src="../../../assets/img/mine/loading@3x.png" alt="">-->
          <!--</div>-->
          <span class="mint-indicator-text" v-show="text">{{ text }}</span>
        </div>
      </div>
      <div class="mint-indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Spinner from '../spinner/spinner.vue'

export default {
  data () {
    return {
      visible: false
    }
  },

  components: {
    Spinner
  },

  computed: {
    convertedSpinnerType () {
      switch (this.spinnerType) {
        case 'double-bounce':
          return 1
        case 'triple-bounce':
          return 2
        case 'fading-circle':
          return 3
        case 'loading':
          return 4
        case'success':
          return 5
        default:
          return 0
      }
    }
  },

  props: {
    text: String,
    spinnerType: {
      type: String,
      default: 'snake'
    }
  }
}
</script>
<style>

.mint-indicator {
  -webkit-transition: opacity .2s linear;
  transition: opacity .2s linear;
}

.mint-indicator-wrapper {
  width: 140px;
  height: 140px;
  top: 50%;
  left: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mint-indicator-wrapper .box {
  display: flex;
  flex-direction: column;
}

.mint-indicator-text {
  display: inline-block;
  color: #fff;
  text-align: center;
  padding-top: 16px;
  font-size: 17px;
}

.mint-indicator-spin {
  display: flex;
  justify-content: center;
  text-align: center;
}

.mint-indicator-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
}

.mint-indicator-enter, .mint-indicator-leave-active {
  opacity: 0;
}


</style>
