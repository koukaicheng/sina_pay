<template>
  <div>
    <ts-header title="设置交易密码" back=""></ts-header>
    <page>
      <div class="wrap">
        <div class="title">请设置交易密码</div>
        <div class="tip">交易密码不能是重复、连续数字</div>
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

export default {
  name: 'setPassword',
  data () {
    return {}
  },
  mixins: [maxins],
  created () {},
  methods: {
    next () {
      this.$api.setPayPwdCheck({password: this.password}).then(res => {
        if (res.code === '0') {
          this.$router.push({name: 'confirmPassword', params: {testPassword: this.password}})
        } else if (res.code === '10003') {
          this.$modal({message: res.msg, lock: true, theme: 'ss'}).then(res => {
            this.password = ''
            this.showKeyboard = true
          })
        } else {

        }
      })
    },
  },
  mounted () {},
  computed: {},
  watch: {},
}
</script>

<style lang="scss" scoped>
@import "password-input";
</style>
