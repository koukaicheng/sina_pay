<template>
  <div>
    <ts-header title="绑定手机号" back></ts-header>
    <page>
      <div class="wrap">
        <div class="logo"></div>
        <div class="phone-box border-1px">
          <span class="area-code">+86</span>
          <input type="tel" placeholder="请输入手机号码" v-model="phone" @focus="vaerisse=true" @blur="vaerisse=false"/>
          <del-val v-show="phone!==''&&vaerisse===true" @click="phone=''"></del-val>
        </div>
        <div class="btn-box">
          <s-button :disabled="!valid" @tap="next" :isLoading="loading">下一步</s-button>
        </div>
        <div class="sub-condition">
          <div class="radio" :class="check===true?'check':'check-out'" @click="check=!check"></div>
          <p class="tips">
            我已阅读并同意
            <router-link tag="span" to="./openAccount">《开户协议》</router-link>
            <router-link tag="span" to="./rights">《投资人权益须知》</router-link>
          </p>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import { phoneNum } from '../../utils/verify'

export default {
  name: 'bindingPhone',
  data () {
    return {
      vaerisse: false,
      check: true,
      loading: false,
      phone: '18513663769',
    }
  },
  created () {},
  mounted () {
  },

  methods: {
    next () {
      let phone = this.phone
      this.loading = true
      this.$router.push({path: 'verifyPhoneNum', query: {phone}})
      this.$api.getBhoneSendVerify({phone}).then(res => {
        if (res.code === 0) {
          setTimeout(() => {
            this.$router.replace({path: 'verifyPhoneNum', query: {phone}})
          }, 500)
        } else {
          this.loading = false
          // this.$modal({message: res.msg, cancel: true, lock: true, theme: 'sss'})
        }
      })
    },
  },
  components: {},
  computed: {
    valid () {
      return phoneNum(this.phone) && this.check !== false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.wrap {
  padding: 0 20px;
  background: #fff;
  .logo {
    margin: 62px auto 0 auto;
    @include wh(60px, 60px);
    @include bg-image('../../assets/img/mine/logo');
  }
  .phone-box {
    margin-top: 40px;
    height: 55px;
    @include fja(space-between);
    font-size: 17px;
    .area-code {
      flex-shrink: 0;
      color: #333;
    }
    input {
      flex: 1;
      margin-left: 30px;
      border: none;
      caret-color: #4576FF;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .btn-box {
    margin-top: 30px;
  }
  .sub-condition {
    margin-top: 15px;
    @include fja();
    font-size: 14px;
    .radio {
      @include wh(14px, 14px);
      &.check-out {
        @include bg-image('../../assets/img/mine/check-out');
      }
      &.check {
        @include bg-image('../../assets/img/mine/check');
      }
    }
    .tips {
      @include fja();
      padding-left: 10px;
      span {
        color: #6B91BB;;
      }
    }
  }
}
</style>
