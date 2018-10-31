<template>
  <div class="scroll-list">
    <pull-to v-if="list.length !== 0">
      <template v-for="item in list">
        <div class="x-time-title">
          2018年4月
        </div>
        <ul class="list-wrap">
          <li class="list-item" @click="detail(item)">
            <div class="list-icon">
              <div class="icon" :class="{
              'tx-':item.trade_type === '1'&&item.status ==='1' ,
              'cz-':item.trade_type === '2'&&item.status ==='1' ,
              'cz-sb':item.trade_type === '2' &&item.status ==='2' ,
              'tx-sb':item.trade_type === '1' &&item.status ==='2'
              }">

              </div>

            </div>
            <div class="list-content">
              <div class="list-content-item">
                <p :class="item.status == 2?'error':''">
                  <!-- <span v-if="item.status == 2" class="err">失败</span> -->
                  {{item.trade_name}}
                </p>
                <p>{{item.trade_time}}</p>
              </div>
              <div class="list-content-item">
                <p :class="item.status == 2?'error':''">{{item.trade_type === '1' ?'+':'-'}}{{item.trade_amount}}</p>
                <p>余额 {{item.balance}}</p>
              </div>
            </div>
          </li>
        </ul>
      </template>

    </pull-to>
    <div v-else class="noData">
      暂无交易明细
    </div>
  </div>
</template>

<script>
import PullTo from '../pull-to/PullTo'
export default {
  name: 'BalanceList',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      BOTTOM_DEFAULT_CONFIG: {
        pullText: '上拉获取更多内容',
        triggerText: '释放获取更多内容',
        loadingText: ' ',
        doneText: '加载完成',
        failText: '加载失败',
        loadedStayTime: 1000,
        stayDistance: 50,
        triggerDistance: 70
      },
      iconLink: ''
    }
  },
  methods: {
    refresh(loaded) {
      //   this.dataList = res.data.dataList
      setTimeout(() => {
        loaded('done')
      }, 2000)
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },
    detail(item) {
      this.$router.push({ path: 'Income', query: { order_id: item.order_id } })
    }
  },
  components: {
    PullTo
  }
}
</script>

<style lang="scss" scoped>
.scroll-list {
  padding-top: 55px;
  width: 100%;
  height: 100%;
  .noData {
    text-align: center;
    margin-top: 200px;
    font-size: 14px;
    color: #939393;
  }
}
.x-time-title {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  color: #939393;
  background: #f7f7f7;
}
.list-wrap {
  background: #fff;
  .list-item {
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 0;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 15px;
      right: 0;
      height: 1px;
      background: #f5f5f5;
    }
    .list-icon {
      flex-shrink: 0;
      .icon {
        flex-shrink: 0;
        margin: 7px 15px;
        width: 16px;
        height: 16px;
        &.cz- {
          background: url('../../../assets/img/balance/icon/yuE/cz-@2x.png');
          background-size: 100% 100%;
        }
        &.cz-sb {
          background: url('../../../assets/img/balance/icon/yuE/cz-sb@2x.png');
          background-size: 100% 100%;
        }
        &.tx- {
          background: url('../../../assets/img/balance/icon/yuE/tx-@2x.png');
          background-size: 100% 100%;
        }
        &.tx-sb {
          background: url('../../../assets/img/balance/icon/yuE/tx-sb@2x.png');
          background-size: 100% 100%;
        }
      }
    }
    .list-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      width: 100%;
      padding-right: 15px;
      line-height: 1.8;
      color: #bdbdbd;
      .list-content-item {
        .err {
          border: 1px #ff4940 solid;
          font-size: 12px;
          padding: 0px 2px;
          border-radius: 4px;
        }
      }
      .list-content-item:first-child {
        text-align: left;
        & p:first-child {
          font-size: 16px;
          color: #333;
          &.error {
            color: #ff4940;
          }
        }
      }
      .list-content-item:last-child {
        text-align: right;
        & p:first-child {
          font-size: 18px;
          color: #333;
          &.error {
            color: #ff4940;
          }
        }
      }
    }
  }
}

.bottom-load-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  color: #bdbdbd;
  .icon {
    width: 6px;
    height: 15px;
    margin: 0 10px;
    background: url('../../../assets/img/balance/up.png') no-repeat;
    background-size: 100% 100%;
    img {
      width: 100%;
    }
    &.icon-loading {
      height: 25px;
      width: 25px;
      background: url('../../../assets/img/balance/icon/loading.png') no-repeat;
      background-size: 100% 100%;
      transform: rotate(0deg);
      animation-name: loading;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }
}
.icon-arrow {
  transition: 0.2s;
  transform: rotate(180deg);
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
