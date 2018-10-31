<template>
  <div>
    <ts-header title="总资产" back></ts-header>
    <page>

      <div class="wrap">
        <div class="assets">
          <div class="title">总资产(元)</div>
          <div class="money-num" v-if="user_asset.total">{{user_asset.total|tofixed2}}</div>
          <div class="money-num" v-else>00.00</div>
        </div>
        <div class="profit">
          <div class="newest">
            <div class="title">最新收益</div>
            <div class="val" v-if="user_asset.income_lastday">+{{user_asset.income_lastday|tofixed2}}</div>
            <div class="val" v-else>+00.00</div>

          </div>
          <div class="accumulative">
            <div class="title">累计收益</div>
            <div class="val" v-if="user_asset.income_total">+{{user_asset.income_total|tofixed2}}</div>
            <div class="val" v-else>+00.00</div>
          </div>
        </div>

        <div class="data-box">

          <div class="item border-1px">
            <div class="box">
              <div class="val-text">
                <span class="icon"></span>
                <div class="val">
                  <div class="title">理财</div>
                  <div class="num" v-if="user_asset.licai_total">{{user_asset.licai_total|tofixed2}}</div>
                  <div class="num" v-else>00.00</div>
                </div>
              </div>
              <div class="status-val" v-if="user_asset.licai_income_lastday">
                +{{user_asset.licai_income_lastday|tofixed2}}
              </div>
              <div class="status-val" v-else>+00.00</div>
            </div>
          </div>
          <div class="item border-1px">
            <div class="box">
              <div class="val-text">
                <span class="icon"></span>
                <div class="val">
                  <div class="title">基金</div>
                  <div class="num" v-if="user_asset.fund_total">{{user_asset.fund_total|tofixed2}}</div>
                  <div class="num" v-else>00.00</div>
                </div>
              </div>
              <div class="status-val" v-if="user_asset.fund_incomme_lastday">
                +{{user_asset.fund_incomme_lastday|tofixed2}}
              </div>
              <div class="status-val" v-else>+00.00</div>
            </div>
          </div>
          <div class="item">
            <div class="box">
              <div class="val-text">
                <span class="icon"></span>
                <div class="val">
                  <div class="title">余额</div>
                  <div class="num" v-if="user_asset.balance">{{user_asset.balance|tofixed2}}</div>
                  <div class="num" v-else>00.00</div>
                </div>
              </div>
              <!--<div class="status-val" v-if="user_asset.licai_income_lastday">+{{user_asset.licai_income_lastday}}</div>-->
              <!--<div class="status-val" v-else>+00.00</div>-->
            </div>
          </div>
        </div>

        <div class="data-chart-box">
          <div class="title">资产分析</div>
          <div class="box">
            <div class="data-text">
              <div class="item">
                <span class="identifier"></span>
                <span class="val-text">理财 25%</span>
                <span class="num" v-if="user_asset.licai_total">￥{{user_asset.licai_total|tofixed2}}</span>
                <span class="num" v-else>¥00.00</span>
              </div>
              <div class="item">
                <span class="identifier"></span>
                <span class="val-text">基金 25%</span>
                <span class="num" v-if="user_asset.fund_total">￥{{user_asset.fund_total|tofixed2}}</span>
                <span class="num" v-else>¥00.00</span>
              </div>
              <div class="item">
                <span class="identifier"></span>
                <span class="val-text">余额 50%</span>
                <span class="num" v-if="user_asset.balance">￥{{user_asset.balance|tofixed2}}</span>
                <span class="num" v-else>¥00.00</span>
              </div>
            </div>
            <div ref="pieChart_box" class="echart-wrap">

            </div>
          </div>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
//按需引入eacharts需要的模块 减少代码体积
import eacharts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import { mapState } from 'vuex'

export default {
  name: 'totalAssets',
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      let myChart = eacharts.init(this.$refs.pieChart_box)
      let data = [{value: this.user_asset.licai_total, name: '理财'}, {
        value: this.user_asset.fund_total,
        name: '基金'
      }, {value: this.user_asset.balance, name: '余额'}]
      myChart.setOption({
        width: 140,
        height: 140,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} '
        },
        legend: {
          show: false,
        },
        series: [{
          name: '资产分析',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data
        }
        ],
        color: ['#FF4940', '#FF8200', '#3483FF']
      })
    }
  },
  components: {},
  computed: {
    ...mapState(['user_asset'])
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin";

.wrap {
  .assets {
    height: 114px;
    @include bg-image('../../assets/img/mine/info-box');
    @include fja(center, flex-start);
    flex-direction: column;
    color: #FFFFFF;
    padding-left: 12px;
    .title {
      font-size: 12px;
    }
    .money-num {
      padding-top: 2px;
      font-size: 28px;
    }
  }
  .profit {
    height: 88px;
    @include bg-image('../../assets/img/mine/profit');
    @include fja();
    .newest, .accumulative {
      flex: 1;
      @include fja(center, flex-start);
      flex-direction: column;
      color: #FFFFFF;
      padding-left: 12px;
      .title {
        font-size: 12px;
      }
      .val {
        font-size: 16px;
        padding-top: 4px;
      }
    }
  }
  .data-box {
    background: #fff;
    padding: 0 12px;
    @include fja(space-between);
    flex-wrap: wrap;
    .item {
      @include wh(50%, 88px);
      padding: 24px 0;
      &:nth-child(1) {
        .box {
          .icon {
            @include bg-image('../../assets/img/mine/licai');
          }
          .status-val {
            padding-right: 12px;
          }
        }
      }
      &:nth-child(2) {
        .box {
          padding-left: 20px;
          &::after {
            display: none;
          }
          .icon {
            @include bg-image('../../assets/img/mine/fund');
          }

        }
      }
      &:nth-child(3) {
        .box {
          .icon {
            @include bg-image('../../assets/img/mine/yue');
          }
          .status-val {
            padding-right: 12px;
          }
        }
      }
      .box {
        position: relative;
        @include fja(space-between, flex-end);
        &::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 100%;
          top: 0;
          right: 0;
          background: #E6E6E6;
          transform: scaleX(0.6);
        }
        .val-text {
          @include fja(center, flex-start);
          .icon {
            @include wh(16px, 16px);
            margin-top: 3px;
          }
          .val {
            padding-left: 10px;
            .title {
              font-size: 16px;
              color: #333333;
            }
            .num {
              padding-top: 6px;
              font-size: 14px;
              color: #939393;
            }
          }
        }
        .status-val {
          font-size: 14px;
          color: #FF4940;
        }
      }

    }
  }
  .data-chart-box {
    margin-top: 10px;
    padding: 0 34px 0 12px;
    height: 190px;
    background: #fff;
    .title {
      font-size: 16px;
      color: #333;
      padding-top: 24px;
    }
    .box {
      margin-top: 22px;
      height: 100px;
      @include fja(space-between);
      .data-text {
        height: 100%;
        @include fja(center, flex-start);
        flex-direction: column;
        .item {
          flex: 1;
          @include fja();
          font-size: 14px;
          .identifier {
            @include wh(8px, 8px);
          }
          .val-text {
            color: #333;
            padding-left: 12px;
          }
          .num {
            padding-left: 10px;
            color: #BDBDBD;
          }
          &:nth-child(1) {
            .identifier {
              background: #FF4940;
            }
          }
          &:nth-child(2) {
            .identifier {
              background: #FF8200;
            }
          }
          &:nth-child(3) {
            .identifier {
              background: #3483FF;
            }
          }
        }
      }
      .echart-wrap {
        @include wh(140px, 140px);
      }
    }
  }
}
</style>
