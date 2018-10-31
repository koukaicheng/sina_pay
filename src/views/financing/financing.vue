<template>
  <div>
    <ts-header title="理财"></ts-header>
    <page>
      <div class="money">
        <div class="money-list">
          <ul>
            <li>
              <img src="../../assets/img/shouye/icon/rukou/beiyongjin.png">
              <div>备用金</div>
            </li>
            <li>
              <img src="../../assets/img/shouye/icon/rukou/jijin.png">
              <div>基金</div>
            </li>
            <li>
              <img src="../../assets/img/shouye/icon/rukou/licai.png">
              <div>理财</div>
            </li>
          </ul>
        </div>
        <div class="due">
          <div class="due-title">
            <div class="due-title-left">活期理财</div>
            <div class="due-title-right">更灵活的理财产品</div>
          </div>
          <div class="due-item">
            <div class="due-item-title">活期理财产品</div>
            <div class="due-item-rate">5.8%</div>
            <div class="due-item-annotation">七日逾期年化</div>
            <div class="due-item-btn">立即转入</div>
            <div class="due-item-annotation-2">随时计息，收益自动复投</div>

          </div>
        </div>
        <div class="due">
          <div class="due-title">
            <div class="due-title-left">定期理财</div>
            <div class="due-title-right">更多
              <span class="icon"></span>
            </div>
          </div>
          <div class="regular-item">
            <span>
              <div class="regular-item-title">新浪财富赢家计划</div>
              <div class="regular-item-rate">5.8%</div>
              <div class="regular-item-annotation">短期83天</div>
            </span>
            <span>
              <div class="regular-item-title">新浪财富赢家计划</div>
              <div class="regular-item-rate">5.8%</div>
              <div class="regular-item-annotation">短期83天</div>
            </span>
            <span>
              <div class="regular-item-title">新浪财富赢家计划</div>
              <div class="regular-item-rate">5.8%</div>
              <div class="regular-item-annotation">短期83天</div>
            </span>
            <span>
              <div class="regular-item-title">新浪财富赢家计划</div>
              <div class="regular-item-rate">5.8%</div>
              <div class="regular-item-annotation">短期83天</div>
            </span>
            <span>
              <div class="regular-item-title">新浪财富赢家计划</div>
              <div class="regular-item-rate">5.8%</div>
              <div class="regular-item-annotation">短期83天</div>
            </span>
          </div>
        </div>
        <div class="show">
          <div class="show-left">
            <div class="show-left-title">基金小白 轻松理财</div>
            <div class="show-left-annotation">抓涨避跌交给AI</div>
          </div>
          <div class="show-right">
            <img src="../../assets/img/shouye/love.jpg">
          </div>
        </div>
        <div class="fund">
          <div class="fund-title">
            <div class="fund-title-left">精选基金</div>
            <div class="fund-title-right">更多
              <span class="icon"></span>
            </div>
          </div>
          <div class="fund-list">
            <ul>
              <li v-for="(item ,index) in fundData" :key='index' class="border-1px">
                <div class="fund-list-left ">
                  <div>+65.5%</div>
                  <div class="annotation">七日预期年化</div>
                </div>
                <div class="fund-list-right">
                  <div>{{item.name}}</div>
                  <div class="annotation">{{item.describle}}</div>
                </div>
              </li>
              <!-- <li class="border-1px">
                <div class="fund-list-left">
                  <div>+65.5%</div>
                  <div class="annotation">七日预期年化</div>
                </div>
                <div class="fund-list-right">
                  <div>产品名称</div>
                  <div class="annotation">随时申请转出</div>
                </div>
              </li>
              <li>
                <div class="fund-list-left">
                  <div>+65.5%</div>
                  <div class="annotation">七日预期年化</div>
                </div>
                <div class="fund-list-right">
                  <div>产品名称</div>
                  <div class="annotation">随时申请转出</div>
                </div>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="footer-tip">
          财 富
          <span></span> 娱 乐
          <span></span> 生 活
        </div>
      </div>
    </page>
    <ds-footer></ds-footer>
  </div>
</template>

<script>
export default {
  name: 'financing',
  data () {
    return {
      fundData: []
    }
  },
  created () {
    // this.getWapCurrent()
    this.getWapFixed()
    this.getWapFund()
  },
  methods: {
    /**
     * 活期理财
     */
    // getWapCurrent() {
    //   this.$api.wapCurrent().then(res => {
    //     console.log(res)
    //   })
    // },
    /**
     * 定期理财
     */
    getWapFixed () {
      // this.$api.wapFixed().then(res => {
      //   console.log(res)
      // })
    },
    /**
     * 精选基金
     */
    getWapFund () {
      this.$api.getChoiceFund().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.fundData = res.data
        }
      })
    }
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables';
@import '../../assets/css/mixin';

.money {
  background: #f9f9f9;
}

.money-list {
  background: #fff;
  margin-bottom: 10px;
  ul {
    height: 104px;
    @include fja(space-between);
    li {
      @include fja();
      flex-direction: column;
      height: 100%;
      flex: 1;
      img {
        width: 27px;
        height: 27px;
      }
      div {
        display: block;
        font-size: 14px;
        color: #333333;
        padding-top: 9px;
      }
    }
  }
}

.due {
  background: #fff;
  border: solid 1px #fff;
  margin-bottom: 10px;
  .due-title {
    padding: 25px 13px;
    @include fja(space-between);
    font-size: 17px;
    .due-title-left {
      color: #333333;
      font-weight: bold;
    }
    .due-title-right {
      font-size: 14px;
      color: #bdbdbd;
      @include fja();
      img {
        @include wh(14px, 14px);
      }
    }
  }
  .due-item {
    margin: 0 15px;
    text-align: center;
    height: 175px;
    background: url('../../assets/img/shouye/due2.png');
    background-size: 100% 100%;
    .due-item-title {
      font-size: 16px;
      color: #333;
      padding-top: 15px;
      font-weight: bold;
    }
    .due-item-annotation {
      color: #c8b79b;
      font-size: 12px;
    }
    .due-item-annotation-2 {
      color: #c8b79b;
      font-size: 12px;
    }
    .due-item-rate {
      color: #ff4940;
      font-size: 28px;
      font-weight: 600;
      padding-top: 6px;
    }
    .due-item-btn {
      width: 130px;
      height: 32px;
      background: #ff4940;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      margin: 10px auto;
      border-radius: 15px;
      color: #ffffff;
    }
  }
  .regular-item {
    height: 162px;
    padding: 2px 12px 18px 12px;
    overflow-x: scroll;
    white-space: nowrap;
    span {
      background: #fff;
      display: inline-block;
      width: 150px;
      height: 106px;
      padding: 13px;
      box-shadow: 0 10px 20px 0 rgba(126, 120, 176, 0.15);
      .regular-item-title {
        font-size: 14px;
        color: #333333;
      }
      .regular-item-rate {
        font-size: 24px;
        color: #ff4940;
        margin: 5px 0px;
      }
      .regular-item-annotation {
        font-size: 13px;
        color: #b3b3b3;
      }
    }
  }
}

.show {
  padding: 0px 13px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  height: 95px;
  margin-bottom: 10px;
  .show-left {
    .show-left-title {
      font-size: 21px;
      font-weight: bold;
      color: #333333;
      margin-top: 23px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .show-left-annotation {
      font-size: 14px;
      margin-top: 9px;
      color: #999999;
    }
  }
  .show-right img {
    height: 90px;
  }
}

.fund {
  background: #fff;
  .fund-title {
    padding: 25px 13px 0 13px;
    /*height: 67px;*/
    /*line-height: 67px;*/
    display: flex;
    justify-content: space-between;
    .fund-title-left {
      font-size: 17px;
      color: #333333;
      font-weight: bold;
    }
    .fund-title-right {
      font-size: 14px;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      img {
        margin-top: 1px;
        @include wh(14px, 14px);
      }
    }
  }
  .fund-list {
    padding: 0px 0px 0px 13px;
    ul {
      li {
        display: flex;
        height: 93px;
        padding: 25px 13px;
        .fund-list-left {
          flex-basis: 160px;
          div {
            color: #ff4940;
            font-size: 24px;
          }
          .annotation {
            font-size: 12px;
            color: #bdbdbd;
          }
        }
        .fund-list-right {
          margin-top: 4px;
          div {
            font-size: 16px;
            color: #333333;
          }
          .annotation {
            margin-top: 4px;
            font-size: 14px;
            color: #bdbdbd;
          }
        }
      }
    }
  }
}

.footer-tip {
  @include fja();
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #bdbdbd;
  height: 52px;
  span {
    display: inline-block;
    @include wh(4px, 4px);
    background: #bdbdbd;
    transform: rotate(-315deg);
    margin: 0 10px;
  }
}

.icon {
  margin-top: 1px;
  margin-left: 5px;
  @include wh(9px, 15px);
  background-image: url("../../assets/img/mine/you@2x.png");
  background-size: 100% auto;
}
</style>
