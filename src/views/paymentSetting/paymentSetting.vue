<template>
  <div class="">
    <ts-header title="支付设置" back></ts-header>
    <page>
      <div class="wrap">
        <div class="list-box">
          <router-link to="./oldPassword" tag="div" class="item border-1px">
            <span class="title">修改交易密码</span>
            <span class="icon"></span>
          </router-link>
          <div class="item" @click="forgetPay">
            <span class="title">忘记交易密码</span>
            <span class="icon"></span>
          </div>
        </div>
      </div>
    </page>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'paymentSetting',
  data () {
    return {}
  },
  created () {},
  methods: {
    forgetPay () {
      this.$api.getForgetPayPwdSend().then(res => {
        if (res.code === '0') {
          this.$router.push({name: 'forgetPasPhoneNum'})
        }
      })
    }
  },
  mounted () {},
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.list-box {
  background: #fff;
  padding-left: 13px;
  margin-top: 13px;
  .item {
    @include fja(space-between);
    height: 55px;
    .title {
      font-size: 17px;
      color: #333;
    }
    .icon {
      @include wh(10px, 14px);
      @include bg-image('../../assets/img/mine/you');
      margin-right: 13px;
    }
  }
}
</style>
