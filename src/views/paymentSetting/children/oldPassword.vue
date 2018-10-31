<template>
  <div>
    <ts-header title="修改交易密码" back></ts-header>
    <page>
      <div class="wrap">
        <div class="wrap">
          <div class="title">请输入旧密码</div>
          <div class="input-box border-1px">
            <input type="password" maxlength="6" placeholder="请输入交易时的密码" v-model="password" @focus="vaerisse=true"
                   @blur="vaerisse=false"/>
            <del-val v-show="password!==''&&vaerisse===true" @click="password=''"></del-val>
          </div>
          <div class="forget-password" @click="forgetPay">
            <span>忘记密码</span>
          </div>
          <div class="btn-box">
            <s-button :disabled="password===''" :is-loading="isLoading" @tap="next">下一步</s-button>
          </div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'oldPassword',
  data () {
    return {
      isLoading: false,
      vaerisse: false,
      password: ''
    }
  },
  created () {},
  mounted () {},
  methods: {
    forgetPay () {
      this.$api.getForgetPayPwdSend().then(res => {
        if (res.code === '0') {
          this.$router.replace({name: 'forgetPasPhoneNum'})
        }
      })
    },
    next () {
      this.isLoading = true
      let pay_pwd = md5(this.password).toUpperCase()
      this.$api.getVerifyOldPayPwd({pay_pwd}).then(res => {
        if (res.code === '0') {

        } else {
          this.isLoading = false
          this.$modal({message: res.msg, cancel: true, lock: true, theme: 'sss'})
        }
      })
    }
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.wrap {
  background: #fff;
  padding: 0 10px;
  .title {
    font-size: 24px;
    color: #333;
    padding-top: 60px;
    text-align: center;
  }
  .input-box {
    height: 55px;
    margin-top: 32px;
    @include fja();
    input {
      font-size: 16px;
      border: none;
      flex: 1;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .forget-password {
    @include fja(flex-end);
    margin-top: 10px;
    span {
      font-size: 14px;
      color: #507DAF;
    }
  }
  .btn-box {
    margin-top: 10px;
  }
}
</style>
