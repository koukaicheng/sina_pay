<template>
  <div>
    <ts-header title="收支详情" back></ts-header>
    <page>
      <div class="wrap">
        <div v-if="list.status === 1" class="x-Income-title">
          <div class="head-img">
            <img src="../../assets/img/balance/icon/mingxi/success@2x.png">
          </div>
          <p class="head-content">{{list.trade_type_txt}}成功</p>
          <p class="head-money">1,040.00元</p>
        </div>
        <div v-else class="x-Income-title">
          <div class="head-img">
            <img src="../../assets/img/balance/icon/mingxi/error@2x.png">
          </div>
          <p class="head-content">{{list.trade_type_txt}}失败</p>
          <p class="head-money">{{list.trade_amount}}元</p>
        </div>
        <div v-if="list.status === '2'" class="x-Income-fail">
          <p>失败原因:{{list.fail_reason}}</p>
        </div>
        <div class="hr"></div>
        <div class="x-Income-number">
          <span>充值金额</span>
          <span class="money">1040.00元</span>
        </div>
        <ul class="x-Income-info">

          <li>
            <span>交易名称</span>
            <span>{{list.trade_name}}</span>
          </li>
          <li>
            <span>交易类型</span>
            <span>{{list.trade_type_txt}}</span>
          </li>
          <li>
            <span>余额</span>
            <span>{{list.balance}} 元</span>
          </li>
          <li>
            <span>创建时间</span>
            <span>{{list.trade_time}}</span>
          </li>
          <li>
            <span>交易单号</span>
            <span>{{list.trade_no}}</span>
          </li>
          <li>
            <span>订单号</span>
            <span>{{list.order_id}}</span>
          </li>

        </ul>

        <div v-if="list.status === '2'" class="x-Income-remarks">
          <span>备注</span>
          <span>{{list.note}}</span>
        </div>
      </div>

    </page>
  </div>
</template>

<script>
export default {
  // name: 'Income',
  data () {
    return {
      order_id: '',
      list: {}
    }
  },
  created () {
    this.order_id = this.$route.query.order_id
    this.getTradeTradeDetail(this.order_id)
  },
  methods: {
    /**
     * 获取详情
     */
    getTradeTradeDetail (order_id) {
      this.$api.tradeTradeDetail({order_id}).then(res => {
        console.log(res.data)
        let list = {
          balance: '123.22',
          fail_reason: '失败原因',
          note: '这个是备注',
          order_id: '101234567890',
          status: '1',
          trade_name: '理财提现',
          trade_no: '01234567890',
          trade_time: '2018-04-24 14:42:33',
          trade_type_txt: '提现'
        }
        this.list = list
        // this.list = res.data
      })
    }
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.wrap {
  background: #f9f9f9;
}

.x-Income-title {
  display: flex;
  align-items: center;
  height: 70px;
  background: #fff;
  font-size: 16px;
  color: #333;
  .head-img {
    width: 25px;
    height: 25px;
    margin: 0 15px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .head-content {
    width: 100%;
    font-weight: bold;
  }
  .head-money {
    flex-shrink: 0;
    padding: 0 15px;
    font-weight: bold;
  }
}

.x-Income-fail {
  position: relative;
  padding: 15px;
  background: #fff;
  font-size: 14px;
  color: #939393;
  line-height: 1.5;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 15px;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #e6e6e6;
    top: 0px;
  }
}

.hr {
  margin-top: 10px;
  width: 100%;
}

.x-Income-info {
  // margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 14px;
  color: #939393;
  li {
    line-height: 2.8;
    display: flex;
    justify-content: space-between;
  }
}

.x-Income-remarks,
.x-Income-number {
  position: relative;
  padding: 15px;
  background: #fff;
  font-size: 14px;
  color: #939393;
  display: flex;
  justify-content: space-between;
  .money {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 15px;
    height: 1.2px;
    -webkit-transform: scaleY(0.6);
    transform: scaleY(0.6);
    background-color: #e6e6e6;
    // top: 0px;
  }
  &.x-Income-remarks::after {
    top: 0px;
  }
  &.x-Income-number::after {
    bottom: 0px;
  }
}
</style>
