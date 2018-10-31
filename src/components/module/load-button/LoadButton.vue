<template>
  <mt-button type="danger" :disabled="disabled" @click.native="next">
    <div class="button-box">
      <span>
        <slot>

        </slot>
      </span>
      <div v-if="isLoading" class="icon">
        <img src="../../../assets/img/balance/icon/loading.png" height="20" width="20">
      </div>
    </div>
  </mt-button>
</template>

<script>
  import { Button } from 'mint-ui'
/**
 * title : 按钮名字
 * disabled :是否禁用按钮
 * isLoading： 是否显示loading圈圈
 * tap ： 点击事件 没有参数传递
 */
export default {
  name: 's-button',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  components:{
    'mt-button':Button
  },
  methods: {
    next() {
      this.$emit('tap')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
}
.button-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  span {
    margin-right: 10px;
  }
  .icon {
    width: 20px;
    height: 20px;
    animation: loading 1s infinite linear;
    @keyframes loading {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
