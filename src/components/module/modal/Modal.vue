<template>
  <div>
    <transition name="fade">
      <div v-if="show" class="wrap" @click="close">
        <div class="modal" @click.stop="">
          <div class="title">
            {{title}}
          </div>
          <div class="content">
            <!-- <p>默认内容</p> -->
            <slot />
          </div>
          <div class="footer ">
            <button v-for="(item,index) in btns" class="footer-item " :class="index === 0 && btns.length !==1?'one':''" @click="close(index === 0 && btns.length !==1)">{{item}}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    btns: {
      type: Array,
      default: () => {
        return ['确定']
      }
    },
    title: {
      type: String,
      default: '默认内容'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close(types) {
      types = !types
      this.show = false
      this.$emit('change', { types })
    },
    submits(types) {
      this.$emit('change', { types })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  overflow: hidden;
  .modal {
    display: flex;
    flex-direction: column;
    margin-top: -50px;
    width: 280px;
    border-radius: 8px;
    background: #ffffff;
    font-size: 16px;
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .title {
      height: 50px;
      flex-shrink: 0;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }
    .content {
      padding: 20px 10px;
      padding-top: 0;
      font-size: 14px;
      max-height: 280px;
      overflow-y: scroll;
      text-align: center;
      line-height: 1.5;
    }
    .footer {
      display: flex;
      flex-shrink: 0;
      height: 50px;
      color: #333;
      border-top: 1px #e6e6e6 solid;
      .footer-item {
        width: 100%;
        line-height: 50px;
        border: none;
        background: #fff;
        font-size: 17px;
        color: #4576ff;
        &.one {
          color: #333;
          border-right: 1px #e6e6e6 solid;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
