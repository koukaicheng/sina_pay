<template>
  <div>
    <ts-header title="收支明细" back></ts-header>
    <page>
      <div class="wrap">
        <div class="x-shai border-1px" @click="showToggle">
          <span>筛选</span>
          <div class="x-shai-right">
            <span>{{tabs[selected]}}</span>
            <img src="../../assets/img/balance/icon/shang.png" v-show="isShow">
            <img src="../../assets/img/balance/icon/xia.png" v-show="!isShow">
          </div>
        </div>

        <transition name="fade">
          <div class="x-shai-zhe sub" v-show="isShow" @click="closeMask">
            <div class="x-shai-tab">
              <ul>
                <li class="border-1px" :class="selected === index?'active':''" v-for="(item,index) in tabs"
                    @click.stop="tabChange(index)">
                  <label for="">
                    <div class="head-img" :class="'icon'+index"></div>
                    <p>{{item}}</p>
                    <div class="head-img-right"><input type="radio" name="all"></div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <transition name="fadeopacity">
          <div class="x-shai-zhe" v-show="isShow" @click="closeMask">
          </div>
        </transition>
        <div class="list-wrap">
          <BalanceList :list="list"/>
        </div>

      </div>

    </page>
  </div>
</template>

<script>
import BalanceList from '../../components/module/balance-list/BalanceList'

export default {
  data () {
    return {
      list: [],
      message: '全部',
      isShow: false,
      selected: 1,
      tabs: [],
      formData: {
        page_size: 10,
        page: 1
      }
    }
  },
  created () {
    this.getTradeTradeTypes()
    this.getTradeTradeList()
  },

  methods: {
    showToggle () {
      this.isShow = !this.isShow
    },
    tabChange: function (index) {
      console.log(index)
      this.selected = index
      this.isShow = !this.isShow
      this.formData.type = index
      this.getTradeTradeList(this.formData)
      // this.isShow = !this.isShow
    },
    closeMask () {
      this.isShow = !this.isShow
    },
    /**
     * 获取分类
     */
    getTradeTradeTypes () {
      this.$api.tradeTradeTypes().then(res => {
        // console.log(res.data)
        this.tabs = res.data
      })
    },
    /**
     * 获取明细
     */
    getTradeTradeList (formData) {
      this.$api.tradeTradeList(formData).then(res => {
        console.log(res.data)
        this.list = res.data.list
      })
    }
  },
  computed: {},
  components: {
    BalanceList
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background: #f9f9f9;
}

.x-shai {
  position: fixed;
  top: 1.2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 55px;
  background: #fff;
  font-size: 16px;
  color: #bdbdbd;
  z-index: 999;
  .x-shai-right {
    color: #333333;
    img {
      width: 15px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  transform: translateY(-100%);
}

.fadeopacity-enter-active,
.fadeopacity-leave-active {
  transition: opacity 0.5s;
}

.fadeopacity-enter, .fadeopacity-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.x-shai-zhe {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 10;

  &.sub {
    z-index: 11;
    background: none;
  }
  .x-shai-tab {
    margin-top: 54px;
    width: 100%;
    background: #fff;
    ul li {
      &.active {
        p {
          color: #333;
          // font-weight: bold;
          font-size: 16px;
        }
        .head-img-right {
          background: url('../../assets/img/balance/icon/select/dui.png');
          background-size: 100% 100%;
        }
        .head-img {
          // &.qb-sx {
          //   background: url('../../assets/img/balance/icon/yuE/qb-sx@2x.png');
          //   background-size: 100% 100%;
          // }
          // &.cz-sx {
          //   background: url('../../assets/img/balance/icon/yuE/cz-@2x.png');
          //   background-size: 100% 100%;
          // }
          // &.tx-sx {
          //   background: url('../../assets/img/balance/icon/yuE/tx-@2x.png');
          //   background-size: 100% 100%;
          // }
          &.icon1 {
            background: url('../../assets/img/balance/icon/yuE/qb-sx@2x.png');
            background-size: 100% 100%;
          }
          &.icon2 {
            background: url('../../assets/img/balance/icon/yuE/cz-@2x.png');
            background-size: 100% 100%;
          }
          &.icon3 {
            background: url('../../assets/img/balance/icon/yuE/tx-@2x.png');
            background-size: 100% 100%;
          }
        }
      }
      label {
        display: flex;
        align-items: center;
        height: 55px;
        font-size: 16px;
        color: #939393;
        .head-img {
          flex-shrink: 0;
          margin: 0 15px;
          width: 20px;
          height: 20px;
          &.icon1 {
            background: url('../../assets/img/balance/icon/yuE/qb-sx@2x.png');
            background-size: 100% 100%;
          }
          &.icon2 {
            background: url('../../assets/img/balance/icon/yuE/cz-sx@2x.png');
            background-size: 100% 100%;
          }
          &.icon3 {
            background: url('../../assets/img/balance/icon/yuE/tx-sx@2x.png');
            background-size: 100% 100%;
          }
        }
        p {
          width: 100%;
          line-height: 2;
        }
        .head-img-right {
          margin-right: 15px;
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          &.active {
            background: url('../../assets/img/balance/icon/select/dui.png');
            background-size: 100% 100%;
          }
        }
        &:active {
          background: #f5f5f5;
        }
      }
    }
  }
}

.list-wrap {
  width: 100%;
  height: 100%;
}
</style>
