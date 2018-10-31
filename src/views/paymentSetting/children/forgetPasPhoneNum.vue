<template>
  <div class="">
    <ts-header title="验证手机号" back=""></ts-header>
    <page>
      <div class="wrap">
        <tel-code-input v-model="code" :phone-num="user_info.mobile_no" @codeChange="next"></tel-code-input>
        <div class="tip">
          <!--<div class="status">验证码已过期，请重新获取并输入</div>-->
          <div class="operation-text" v-show="cInterval===null" @click="getPhoneCode">重新发送</div>
          <div class="seconds" v-show="cInterval!==null">{{seconds}}s后重新发送</div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import Indicator from '../../../components/module/indicator'
import telCodeInput from '../../../components/module/tel-code-input/telCodeInput'
import { mapState, mapMutations } from 'vuex'
import { STEP_TOKEN } from '../../../store/mutations/mutations-types'

export default {
  name: 'forgetPasPhoneNum',
  components: {telCodeInput},
  data () {
    return {
      code: '',
      maxLength: 6,
      seconds: 120,
      cInterval: null,
    }
  },
  created () {

  },
  mounted () {
    this.timeChange()
  },
  methods: {
    ...mapMutations([STEP_TOKEN]),
    timeChange () {
      this.cInterval = window.setInterval(() => {
        if (this.seconds === 1) {
          window.clearInterval(this.cInterval)
          this.cInterval = null
          this.seconds = 120
        }
        this.seconds--
      }, 1000)
    },
    getPhoneCode () {},
    next () {
      Indicator.open({text: '认证中', spinnerType: 'loading'})
      setTimeout(() => {
        Indicator.close()
        Indicator.open({text: '认证成功', spinnerType: 'success'})
      }, 1000)
      setTimeout(() => {
        Indicator.close()
        this.$router.replace({path: './bandCardVerifcation'})
      }, 2000)
      //此接口暂时不通
      // this.$api.getForgetPayPwdVerfiyCode({verify_code: this.code}).then(res => {
      //   if (res.code === '200') {
      //     this[STEP_TOKEN](res.step_token)
      //     this.$router.replace({path: './bandCardVerifcation'})
      //   }
      // })
    },
  },

  computed: {
    ...mapState(['user_info']),
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

@keyframes animate {
  100% {
    opacity: 0;
  }
}

.wrap {
  background: #ffffff;
  position: relative;
  .tip {
    margin: 20px 20px 0 20px;
    text-align: right;
    .status {
      font-size: 14px;
      color: #FF4940;
    }
    .operation-text {
      font-size: 14px;
      margin-top: 10px;
      color: #507DAF;
    }
    .seconds {
      font-size: 14px;
      color: #B0B0B0;
    }
  }
}
</style>
