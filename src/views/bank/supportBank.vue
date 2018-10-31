<template>
  <div>
    <ts-header title="支持银行" back></ts-header>
    <page>
      <div class="wrap">
        <p class="title">目前仅支持如下银行的储蓄卡</p>
        <ul class="item-box">
          <li v-for="(item,index) in cardList" :key="index" class="item border-1px">
            <div class="head-img">
              <img :src="item.bank_logo" alt="">
            </div>
            <p>{{item.bank_name}}</p>
          </li>
        </ul>

      </div>
    </page>
  </div>
</template>

<script> 
export default {
  name: 'addBack',
  data() {
    return {
      cardList: []
    }
  },
  created() {
    this.getUserBankCardList()
  },
  mounted() {},
  methods: {
    /**
     * 获取银行卡列表
     */
    getUserBankCardList() {
      this.$api.authBankList().then(res => {
        this.cardList = res.data
        console.log(this.cardList)
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  .title {
    padding-left: 15px;
    font-size: 14px;
    color: #939393;
    line-height: 50px;
  }
  .item-box {
    background: #fff;
    .item {
      display: flex;
      align-items: center;
      height: 65px;
      margin-left: 15px;
      font-size: 16px;
      color: #333;
      .head-img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
