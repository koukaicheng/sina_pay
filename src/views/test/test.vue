<template>
  <div>
    <ts-header title="总资产"></ts-header>
    <page>
      <div class="wrap">

      </div>
    </page>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: '',
  data() {
    return {}
  },
  created() {
    // console.log(1111)
    this.getUserVerifyPayPwd(this.MD5('asdf'))
  },
  mounted() {},
  methods: {
    /**
     * 交易密码验证
     */
    getUserVerifyPayPwd(pay_pwd) {
      this.$api.userVerifyPayPwd({ pay_pwd }).then(res => {
        console.log(res)
        let success = res.data.success
        if (success) {
          // this.getTradeRecharge(this.formData)
        }
      })
    },
    MD5(pass) {
      return md5(pass).toUpperCase()
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
