<template>
  <div class="">
    <ts-header title="验证手机号" back></ts-header>
    <page>
      <div class="wrap">
        <tel-code-input v-model="code" :phone-num="phone" @codeChange="getBindPhone"></tel-code-input>
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
import Indicator from '../../components/module/indicator'
import { UserMixins, adPosition } from '../../utils/mixins'
import telCodeInput from '../../components/module/tel-code-input/telCodeInput'

export default {
  name: 'verifyPhoneNum',
  components: {telCodeInput},
  data () {
    return {
      code: '',
      seconds: 120,
      cInterval: null,
      phone: ''
    }
  },
  created () {
    this.phone = this.$route.query.phone
  },
  mounted () {
    this.timeChange()
  },
  mixins: [UserMixins, adPosition],
  methods: {
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
    getPhoneCode () {
      this.timeChange()
      let phone = this.phone
      this.$api.getBhoneSendVerify({phone}).then(res => {
        console.log(res)
      })
    },
    getBindPhone () {
      Indicator.open({text: '认证中', spinnerType: 'loading'})
      this.$api.getBindPhone({phone: this.phone, verify_code: this.code}).then(res => {
        Indicator.close()
        Indicator.open({text: '认证成功', spinnerType: 'success'})
        setTimeout(() => {
          Indicator.close()
          this.$router.replace({path: 'realName'})
          // this.$router.replace({path: '/mine'})
        }, 1000)
        if (res.code === 0) {
          // this.getUserStatus()
          // indicator.close()
          // this.getUserStatus()
          // this.getUserInfo()
          // indicator.open({text: '认证成功', spinnerType: 'success'})
          // setTimeout(() => {
          // indicator.close()
          //   this.$router.replace({path: '/mine'})
          // }, 1000)
        } else {
          // this.$modal({message: res.msg, cancel: true, lock: true, theme: 'sss'})
        }

      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

@keyframes animate {
  100% {
    opacity: 0;
  }
}

.wrap {
  background: #ffffff;
  position: relative;
  .tip {
    margin-top: 20px;
    text-align: center;
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
