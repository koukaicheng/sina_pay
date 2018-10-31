<template>
  <div>
    <ts-header title="设置交易密码" back=""></ts-header>
    <page>
      <div class="wrap">
        <div class="title">确认交易密码</div>
        <div class="tip">请再次输入您的交易密码</div>
        <div class="password-box" @touchstart.stop.prevent="focus">
          <div class="labels">
            <label for="password" v-for="(item,index) in maxLength" :key="index">{{password[index] | passwordText
              }}</label>
          </div>
        </div>
      </div>
    </page>
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false"/>
  </div>
</template>

<script>
import maxins from './public'
import md5 from 'js-md5'
import transfer from '../../../utils/transfer'
import { UserMixins } from '../../../utils/mixins'

export default {
  mixins: [maxins, UserMixins],
  name: 'confirmPassword',
  data () {
    return {
      testPassword: '',
    }
  },
  created () {
    this.testPassword = this.$route.params.testPassword
  },
  mounted () {
  },
  methods: {
    next () {
      this.setPayPwd()
      if (this.password !== this.testPassword) {
        this.$modal({message: '两次输入的密码不一致，请重新输入', lock: true, theme: 'ss'}).then(res => {
          this.password = ''
          this.showKeyboard = true
        })
      } else {
        this.setPayPwd()
      }
    },
    setPayPwd () {
      let obj = {
        origin_password: this.password,
        password: md5(this.password).toUpperCase(),
        confirm_password: md5(this.password).toUpperCase()
      }
      this.$api.setPayPwd(obj).then(res => {
        if (res.code === '0') {
          this.getUserStatus()
          this.getUserInfo()
        }
      })
    }
  },
  computed: {},
  watch: {
    testPassword (val) {
      console.log(val)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "password-input";
</style>
