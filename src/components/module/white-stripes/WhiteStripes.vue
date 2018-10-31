<template>
  <div class="x-white-stripes">
    <div class="stripes-img"></div>
    <div v-show="!this.is_support" class="stripes-text">
      <p class="title">新浪白条，花钱不眨眼</p>
      <p>最高12,000元额度</p>
    </div>
    <div v-show="this.is_support" class="stripes-text">
      <p class="title">{{this.total_limit | abs}}元可用额度</p>
      <p>本月待还 {{this.need_repayment | abs}}元</p>
    </div>
    <div v-show="!this.is_support" class="stripes-bton">
      <button>立即使用</button>
    </div>
    <div v-show="this.is_support" class="stripes-bton">
      <button>去还款</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhiteStripes',
  props: {},
  data () {
    return {
      is_support: '', //是否在白名单中 如果为false就不显示整条
      total_limit: '', //总额度
      need_repayment: '' //本月应还
    }
  },
  created () {
    this.getUseraWhiteBar()
  },
  methods: {
    /**
     * 获取白条
     */
    getUseraWhiteBar () {
      this.$api.useraWhiteBar().then(res => {
        this.is_support = res.data.is_support
        this.total_limit = res.data.total_limit
        this.need_repayment = res.data.need_repayment
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.x-white-stripes {
  display: flex;
  align-items: center;
  padding: 28px 13px 25px 13px;
  .stripes-img {
    flex-shrink: 0;
    width: 28px;
    height: 34px;
    background: url('../../../assets/img/shouye/icon/baitiao.png') no-repeat;
    background-size: 100%;
  }
  .stripes-text {
    padding-left: 15px;
    width: 100%;
    font-size: 14px;
    color: #bdbdbd;
    p:first-child {
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
  }
  .stripes-bton {
    width: 80px;
    flex-shrink: 0;
    button {
      width: 100%;
      border: none;
      background: #ff4940;
      line-height: 30px;
      color: #fff;
      font-size: 14px;
      border-radius: 2px;
    }
  }
}
</style>
