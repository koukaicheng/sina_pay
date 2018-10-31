<template>
  <div>
    <transition name="fadeopacity">
      <div v-show="isShow" class="picker-wrap-up"></div>
    </transition>
    <transition name="fade">
      <div v-show="isShow" class="picker-wrap" @click="closeMask">
        <div class="picker-box" @click.stop="">
          <div class="picker-head">
            <div class="picker-close" @click="closeMask">
              取消
            </div>
            <div class="picker-content">
              请选择发卡行
            </div>
            <div class="picker-confirm" @click="confirm">
              确定
            </div>
          </div>
          <picker value-key="bank_name" :slots="slots" :itemHeight="46" :visibleItemCount='5' @change="onValuesChange"></picker>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Picker } from 'mint-ui'

export default {
  name: 'bank-list-picker',
  props: {
    slots: {
      type: Array
    }
  },
  data() {
    return {
      isShow: false,
      cardList: {}
    }
  },
  methods: {
    open() {
      this.isShow = true
    },
    closeMask() {
      this.isShow = false
    },
    confirm() {
      if (!this.cardList) {
        this.cardList = this.slots[0].values[0]
      }
      this.$emit('changeCard', this.cardList)
      this.isShow = false
    },
    onValuesChange(picker, values) {
      this.cardList = values[0]
    }
  },
  components: {  Picker }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s;
}
.fade-enter, .fade-leave-to  {

  transform: translateY(100%);
}
.fadeopacity-enter-active,
.fadeopacity-leave-active {
  transition: opacity 0.8s;
}
.fadeopacity-enter, .fadeopacity-leave-to {
  opacity: 0;
}
.picker-wrap-up {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background: rgba($color: #000000, $alpha: 0.2);
}
.picker-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
  .picker-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    .picker-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background: #f9f9f9;
      font-size: 16px;
      color: #333;
      .picker-close,
      .picker-confirm {
        padding: 0 15px;
        &.picker-confirm {
          color: #4576ff;
        }
      }
    }
  }
}
</style>
