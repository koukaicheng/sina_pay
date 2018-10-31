<template>
  <div>
    <ts-header title="修改交易密码" back=""></ts-header>
    <page>
      <div class="wrap">
        <div class="title">请输入旧密码</div>
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
  name: 'inputOldPassword',
  mixins: [maxins],
  data () {
    return {}
  },
  created () {},
  methods: {
    next () {}
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
@import "password-input";
</style>
