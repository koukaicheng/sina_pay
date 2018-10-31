<template>
  <div class="">
    <ts-header title="验证手机号" back=""></ts-header>
    <page>
      <div class="wrap">
        <tel-code-input v-model="code" phone-num="18610925224" @codeChange="getBindBank"></tel-code-input>
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
import { mapState } from 'vuex'
import { UserMixins } from '../../../utils/mixins'
import { STEP_TOKEN } from '../../../store/mutations/mutations-types'
import telCodeInput from '../../../components/module/tel-code-input/telCodeInput'

export default {
  name: 'bankVeifyPhone',
  components: {telCodeInput},
  data () {
    return {
      code: '',
      seconds: 120,
      cInterval: null,
      phone: '',
      info: {}
    }
  },
  created () {
    // this.info = this.$route.params
  },
  mounted () {
    this.timeChange()
  },
  mixins: [UserMixins],
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
      this.$api.getBankSendVerify(this.info).then(res => {
        if (res.code === '0') {
          this[STEP_TOKEN](res.data.req_seq)
          this.timeChange()
        } else {
          // this.$modal({message: res.msg, cancel: true, lock: true,})
        }
      })
    },
    getBindBank () {
      console.log(wqwqwq)
      let req_seq = this.step_token
      let obj = {req_seq, verify_code: this.code}
      this.$router.replace({path: '/setPassword'})
      Indicator.open({text: '认证中', spinnerType: 'loading'})
      this.$api.getBindBank(obj).then(res => {
        if (res.code === '0') {
          Indicator.close()
          Indicator.open({text: '认证成功', spinnerType: 'success'})
          this.getUserStatus()
          this.getUserInfo()
          setTimeout(() => {
            this.$router.replace({path: '/setPassword'})
          }, 500)
        } else {
          this.code = ''
          this.$refs.code.focus()
        }
        console.log(res)
      }).catch(res => {
        this.code = ''
        this.$refs.code.focus()
        Indicator.close()
      })
    }
  },
  computed: {
    ...mapState(['step_token', 'user_info']),
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
