<template>
  <div>
    <ts-header title="填写单位电话" back></ts-header>
    <page>
      <div class="wrap">
        <div class="title">请填写您的单位电话</div>
        <div class="data-box">
          <div class="sub-item">
            <input ref="tel" type="tel"   @focus="vaerisse=true" @blur="vaerisse=false"
                   placeholder="请输入手机号或0开头座机"
                   v-model="company_telephone"/>
            <del-val v-show="vaerisse===true&&company_telephone!==''" @click="company_telephone=''"></del-val>
          </div>
        </div>
        <div class="tip" v-show="vaerisse===true">{{tip}}</div>
        <div class="btn-box">
          <s-button :disabled="!valid" :is-loading="isLoading" @tap="next">保存</s-button>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import { pnone_Org_tel, debouce } from '../../../utils/verify'
import userInfo from './public'

export default {
  name: 'corporateTel',
  data () {
    return {
      isLoading: false,
      vaerisse: false,
      company_telephone: '',
      tip: '0开头座机号或手机号'
    }
  },
  mixins: [userInfo],
  mounted () {
    let fun = debouce(this.telReg, 500, false)
    this.$refs.tel.addEventListener('keyup', (e) => {
      fun()
    })
  },
  methods: {
    telReg () {
      let status = pnone_Org_tel(this.company_telephone)
      if (!status) {
        this.tip = '请正确输入手机号或座机号'
      } else {
        this.tip = '0开头座机号或手机号'
        this.$refs.tel.blur()
      }
    },
    next () {
      this.$modal({
        message: '您所填写的单位电话保存后暂无法修改，确定保存吗？',
        cancel: true,
        lock: true,
        leftBtn: '取消保存',
        rightBtn: '确定保存'
      }).then(() => {
        this.getPersonCpmpanyTel()
      })
    },
    getPersonCpmpanyTel () {
      this.isLoading = true
      let data = {
        company_telephone: this.company_telephone,
        uid: this.user_info.s_uid
      }
      this.$api.getPersonCpmpanyTel(data).then(res => {
        this.followUp(res)
      }).catch(res => {
        this.isLoading = false
      })
    }

  },
  components: {},
  computed: {
    valid () {
      let status = pnone_Org_tel(this.company_telephone)
      return status
    }
  }
}
</script>

<style lang="scss" scoped>
@import "public";

.tip {
  font-size: 14px;
  color: #FF4940;
  margin: 20px 13px;
}
</style>
