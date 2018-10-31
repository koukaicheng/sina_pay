<template>
  <div>
    <ts-header title="填写公司名称" back></ts-header>
    <page>
      <div class="wrap">
        <div class="title">请填写您的公司名称</div>
        <div class="data-box">
          <div class="sub-item">
            <input type="text" @focus="vaerisse=true" @blur="vaerisse=false" placeholder="请输入公司全名"
                   v-model="company_name"/>
            <del-val v-show="vaerisse===true&&company_name!==''" @click="company_name=''"></del-val>
          </div>
        </div>

        <div class="btn-box">
          <s-button :disabled="company_name===''" :is-loading="isLoading" @tap="next">保存</s-button>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import userInfo from './public'

export default {
  name: 'corporateName',
  data () {
    return {
      isLoading: false,
      vaerisse: false,
      company_name: '',
    }
  },
  mixins: [userInfo],
  created () {

  },
  mounted () {},
  methods: {
    next () {
      this.$modal({
        message: '您所填写的公司名称保存后暂无法修改，确定保存吗？',
        cancel: true,
        lock: true,
        leftBtn: '取消保存',
        rightBtn: '确定保存'
      }).then(() => {
        this.getPersonCompany()
      })
    },
    getPersonCompany () {
      this.isLoading = true
      let data = Object.assign({company_name: this.company_name, uid: this.user_info.s_uid}, {})
      this.$api.getPersonCompany(data).then(res => {
        this.followUp(res)
      }).catch(res => {
        this.isLoading = false
      })
    }
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "public";
</style>
