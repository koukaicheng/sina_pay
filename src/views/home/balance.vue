<template>
  <div>
    <ts-header title="余额" back></ts-header>
    <page>
      <div class="wrap">
        <div class="x-balance">
          <div class="balan-info">
            <span>账户余额(元)</span>
            <router-link class="right-mingxi" :to="{name:'incomeList'}" tag="span">
              明细
              <span class="right-icon"></span>
              <!-- <img src="../../assets/img/shouye/icon/list/you.png"> -->
            </router-link>
          </div>
          <div class="balance-num">
            {{user_asset.balance |tofixed2}}
          </div>
          <div class="balance-now">
            <span>当前可提现余额：</span>
            <span>{{user_asset.withdraw_balance |tofixed2}}元</span>
            <span class="info" @click="tiShuo">!</span>
          </div>
        </div>
        <div class="button-group x-chong">
          <div @click="recharge">
            <button>充值</button>
          </div>
        </div>
        <div class="button-group x-ti">
          <div @click="putForward">
            <button>提现</button>
          </div>
        </div>
        <div class="white-stripes">
          <WhiteStripes/>
        </div>
      </div>
      <Modal ref="modal" title="提现余额说明" :btns="['知道了']">
        <div class="modal-warp">
          <p>可提现金额：当前可以提现到银行卡的余额</p>
          <p class="modal-bottom">不可用余额：办理特殊业务(提现、充值处理中)，本人账户中暂时不能使用的那部分金额</p>
        </div>
      </Modal>
    </page>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import WhiteStripes from '../../components/module/white-stripes/WhiteStripes'
import Modal from '../../components/module/modal/Modal'

export default {
  name: 'balance',

  data () {
    return {
      //账户余额
      balance: ''
    }
  },
  created () {
    console.log(this.user_status)
    // console.log(this.user_asset)
  },
  mounted () {},
  methods: {
    /**
     * 余额提示
     */
    tiShuo () {
      this.$refs.modal.open()
    },
    /**
     * 充值
     */
    recharge () {
      this.authentication()
    },
    /**
     * 提现
     */
    putForward () {
      this.$router.push({path: 'putForward'})
    },
    /**
     * 鉴权，是否实名认证，是否银行卡认证，去往不同页面
     */
    authentication () {
      /**
       * 验证流程：
       *  是否实名认证
       *  |-- 是 --> 是否添加银行卡
       *  |          |- 是 --> 开始提现
       *  |          |- 否 --> 实名认证-银行认证
       *  |-- 否 --> 添加银行页面
       */
      let user_status = this.user_status
      // 验证是否实名认证
      if (user_status.is_realname) {
        console.log('实名认证通过')
        // 验证是否添加银行卡
        this.authIsBindCard()
      } else {
        console.log('实名认证未通过')
        this.$router.push({path: 'addbank'})
      }
    },
    /**
     * 是否添加银行卡
     */
    authIsBindCard () {
      let user_status = this.user_status
      if (user_status.is_bindcard) {
        console.log('绑定银行卡')
        this.$router.push({path: 'recharge'})
      } else {
        console.log('未绑定银行卡')
        this.$router.push({
          path: 'certificationBank',
          query: {
            realname: this.user_info.realname,
            idcard: this.user_info.idcard
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['user_asset', 'user_status', 'user_info'])
  },
  components: {
    WhiteStripes,
    Modal
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background: #fff;
  .x-balance {
    position: relative;
    padding-top: 30px;
    margin: 13px;
    height: 200px;
    box-shadow: 0 10px 30px 0 rgba(142, 131, 166, 0.15);
    border-radius: 4px;
    font-size: 14px;
    color: #939393;
    background: url('../../assets/img/shouye/yue@2x.png') no-repeat;
    background-size: 100% auto;
    background-position: 100% 100%;
    .balan-info {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      .right-mingxi {
        display: flex;
        align-items: center;
        .right-icon {
          margin-left: 5px;
          flex-shrink: 0;
          width: 10px;
          height: 14px;
          background: url('../../assets/img/shouye/icon/list/you.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .balance-num {
      padding: 0 20px;
      font-size: 36px;
      color: #333;
    }
    .balance-now {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 20px;
      left: 20px;
      font-size: 13px;
      color: #939393;
      .info {
        margin-left: 10px;
        display: block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        border-radius: 50%;
        background: #ccc;
        color: #fff;
      }
    }
  }
  .button-group {
    margin: 0 12px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    button {
      width: 100%;
      height: 42px;
      border: none;
      font-size: 16px;
      color: #fff;
      border-radius: 2px;
    }
    &.x-chong {
      margin-top: 25px;
      button {
        background: #ff4940;
      }
    }
    &.x-ti {
      margin-top: 12px;
      button {
        background: #fff;
        border: 1px #939393 solid;
        color: #636363;
      }
    }
  }
  .modal-warp {
    width: 100%;
    text-align: left;
    padding: 0 12px;
    color: #939393;
    line-height: 1.5;
    .modal-bottom {
      margin-top: 10px;
    }
  }
}

.white-stripes {
  position: fixed;
  bottom: 0;
  width: 100%;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 15px;
    right: 15px;
    height: 1px;
    background: #f2f2f2;
  }
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    border: 8px #fff solid;
    transform: rotate(-315deg);
    box-sizing: content-box;
    background: #f2f2f2;
    z-index: 2;
  }
}
</style>
