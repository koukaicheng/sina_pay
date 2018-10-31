<template>
  <div>
    <ts-header :title="title" back></ts-header>
    <page>
      <div class="wrap">
        <div class="title">{{tip}}</div>
        <div class="data-box">
          <div class="sub-item" @click="addrVisible=!addrVisible">
            <div class="sub-title">所在地区</div>
            <div class="val-text">
              <div class="text" v-show="address.province===''">点击选择所在地区</div>
              <div v-show="address.province!==''">{{addressText}}</div>
              <span class="xia"></span>
            </div>
          </div>
        </div>
        <div class="data-box">
          <div class="sub-item last">
            <div class="sub-title">居住地址</div>
            <div class="val-text">
              <textarea @focus="vaerisse=true" @blur="vaerisse=false" v-model="address.live_detail_address"
                        placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"></textarea>
            </div>
            <del-val v-show="vaerisse===true&&address.live_detail_address!==''"
                     @click="address.live_detail_address=''"></del-val>
          </div>
        </div>
        <div class="btn-box">
          <s-button :disabled="!valid" :isLoading="isLoading" @tap="next">保存</s-button>
        </div>
      </div>
      <addr-picker @complete="setAddr" v-model="addrVisible"></addr-picker>
    </page>
  </div>
</template>

<script>
import { requiredObjProp } from '../../../utils/verify'
import userInfo from './public'

export default {
  name: 'personalAddress',
  data () {
    return {
      vaerisse: false,
      addrVisible: false,
      isLoading: false,
      title: '填写居住地址',
      tip: '请填写您的居住地址',
      address: {
        province: '',
        city: '',
        area: '',
        live_detail_address: ''
      }
    }
  },
  mixins: [userInfo],
  created () {
    if (this.$route.query.identity) {
      this.title = '填写单位地址'
      this.tip = '请填写您所在公司的地址'
    }
  },
  methods: {
    setAddr (val) {
      [this.address.province, this.address.city, this.address.area] = [val.province, val.city, val.area]
    },
    next () {
      let status = !this.$route.query.identity
      let str = status === true ? '居住' : '单位'
      this.$modal({
        message: `您所填写的${str}地址保存后暂无法修改，确定保存吗？`,
        cancel: true,
        lock: true,
        leftBtn: '取消保存',
        rightBtn: '确定保存'
      }).then(() => {
        if (status) {
          this.getPersonInfoAddress()
        } else {
          this.getPersonCpmpanyAddr()
        }

      })
    },
    getPersonInfoAddress () {
      this.isLoading = true
      let data = Object.assign({uid: this.user_info.s_uid}, this.address)
      this.$api.getPersonInfoAddress(data).then(res => {
        this.followUp(res)
      }).catch(res => {this.isLoading = false})
    },
    getPersonCpmpanyAddr () {
      this.isLoading = true
      let {province, city, area} = this.address
      let company_detail_address = this.address.live_detail_address
      let data = {province, city, area, company_detail_address, uid: this.user_info.s_uid}
      this.$api.getPersonCpmpanyAddr(data).then(res => {
        this.followUp(res)
      }).catch(res => {this.isLoading = false})
    }
  },
  components: {
    'addr-picker': () => import('../../../components/module/addr-picker/AddrPicker_.vue'),
  },
  computed: {
    addressText () {
      return this.address.province + ' ' + this.address.city + ' ' + this.address.area
    },
    valid () {
      return requiredObjProp(this.address).isValid
    }
  }
}
</script>
<style lang="scss" scoped>
@import "public";
</style>
