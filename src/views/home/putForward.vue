<template>
  <div>
    <ts-header back title="提现"></ts-header>
    <page>
      <div>
        <div class="x-bank" @click="choiceBank" ref="xBank">
          <!-- <img /> -->
          <div class="x-bank-head-left">
            <img :src="showCardList.bank_logo" class="img2">
          </div>
          <div class="x-bank-head-content">
            <p class="p1"> {{showCardList.bank_name}}({{showCardList.bank_card_no | bankCard}})</p>

            <!-- <p class="p2">单笔限额5000，单日限额50000</p> -->
          </div>
          <div class="x-head-right">
            <img src="../../assets/img/shouye/icon/list/you.png" class="img2">
          </div>
        </div>
        <div class="x-recharge-amount">
          <h1>提现金额</h1>
          <div class="x-recharge-amount-int">
            <span>￥</span>
            <input type="number" :placeholder="'最多可提现' + user_asset.withdraw_balance" v-model="numbers"
                   @blur="blur" @focus="focus">
            <div class="right-close-img">
              <img src="../../assets/img/balance/icon/lnput/del@2x.png" v-if="shows" @click="clear">
            </div>
            <p class="all" @click="all">全部提现</p>
          </div>
        </div>
        <div class="x-error" v-if="Booleans">
          {{mesg}}
        </div>
        <div class="x-xia">
          <!-- <button>下一步</button> -->
          <s-button :disabled="disabled" @tap="next">
            <span>下一步</span>
          </s-button>
          <p class="info">本日还可免费转出{{user_asset.free_withdraw_num}}次</p>
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
          <div class="bank-box">
            <div class="bank-box-title">
              <img src="../../assets/img/balance/icon/close@2x.png" @click="choicePopup"> 选择银行卡
            </div>
            <div class="bank-box-content">
              <ul class="have-click">
                <li class="border-1px" v-for="(bank,index) in supportBank(bankListArry)" @click="liPopup(index,bank)">
                  <div class="x-bank-head-left">
                    <img :src="bank.bank_logo">
                  </div>
                  <div class="x-bank-head-content">
                    <p class="p1">{{bank.bank_name}}({{bank.bank_card_no | bankCard}})</p>
                    <p class="p2">单笔限额5000，单日限额50000</p>
                  </div>
                  <div v-if="changeRed === index" class="x-head-right">
                    <img src="../../assets/img/balance/icon/select/dui.png" class="img6">
                  </div>
                </li>
              </ul>
              <div class="x-add-bank border-1px" @click="addBack">
                <div class="x-bank-head-left">
                  <img src="../../assets/img/bank/add@2x.png">
                </div>
                <div class="x-bank-head-content">
                  <p class="p1">添加银行卡</p>
                </div>
                <div class="x-head-right">
                  <img src="../../assets/img/shouye/icon/list/you.png" class="img8">
                </div>
              </div>
              <ul class="no-click">
                <li class="border-1px" v-for="(bank,index) in noSupportBank(bankListArry)">
                  <div class="x-bank-head-left">
                    <img :src="bank.bank_logo">
                  </div>
                  <div class="x-bank-head-content">
                    <p class="p1">{{bank.bank_name}}({{bank.bank_card_no | bankCard}})</p>
                    <p class="p2">该卡暂不支持充值</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </mt-popup>
        <Modal ref="modal" title="提现手续费" :btns="btns" @change="change">
          <div class="modal-wrap">
            <div class="modal-title">
              每月累计10,000元后，超出部分按0.1%收取手续费
            </div>
            <ul class="modal-contant">
              <li>
                <p>手续费</p>
                <p>￥5.00</p>
              </li>
              <li>
                <p>本月已使用额度
                  <br/>(包含本次)
                </p>
                <p>￥15000.00</p>
              </li>
              <li>
                <p>超出部分</p>
                <p>￥5000.00</p>
              </li>
            </ul>
          </div>
        </Modal>
        <payment ref="pay" :card="showCardList" :money="numbers"></payment>
      </div>
    </page>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '../../components/module/modal/Modal'
import Payment from '../../components/module/payment/Payment'

export default {
  name: 'recharge',
  data () {
    return {
      numbers: '',
      Booleans: false,
      mesg: '错误提示错误提示',
      shows: false,
      popupVisible: false,
      Payment: false,
      iscur: 0,
      changeRed: 0,
      showCardList: {},
      //交易银行列表
      bankListArry: [],
      disabled: true,
      btns: ['取消', '继续提现']
    }
  },
  computed: {
    ...mapState(['user_asset'])
  },
  created () {
    this.bankListFn()
  },
  methods: {
    /**
     * 提示框
     */
    change (type) {},
    //bankList
    bankListFn () {
      this.$api.tradeBankCardList().then(res => {
        this.bankListArry = res.data
        this.showCardList = res.data[0] || {}
      })
    },
    //筛选支持的银行卡
    supportBank: function (bankListArry) {
      return bankListArry.filter(function (bank) {
        if (bank.is_support == true) {
          return bank
        }
      })
    },
    //筛选不支持的银行卡
    noSupportBank: function (bankListArry) {
      return bankListArry.filter(function (bank) {
        if (bank.is_support == false) {
          return bank
        }
      })
    },
    choiceBank () {
      this.popupVisible = true
    },
    choicePopup () {
      this.popupVisible = false
    },
    liPopup (index, bank) {
      this.changeRed = index
      this.showCardList = bank
      setTimeout(() => {
        this.popupVisible = false
      }, 300)
    },
    /**
     * 获取焦点
     */
    focus () {
      if ((this.numbers + '').length > 0) {
        this.shows = true
      }
    },
    all () {
      this.numbers = this.user_asset.withdraw_balance + ''
    },
    /**
     * 失去焦点
     */
    blur () {
      this.shows = false
    },
    handleInput2 (e) {
      // 通过正则过滤小数点后两位
      // e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null
    },
    clear () {
      this.numbers = ''
    },
    addBack () {
      // this.$router
      this.$router.push({path: 'addBank'})
    },
    next () {
      // this.$refs.modal.open()

      if (this.numbers == '') {
        this.Booleans = true
        return
      } else if (this.Booleans == true) {
        return
      } else {
        this.$refs.pay.open()
      }
    }
  },
  watch: {
    numbers (newVal, oldVal) {
      if (newVal === '') {
        this.Booleans = false
        return
      }
      if ((newVal + '').length > 0) {
        this.shows = true
      } else {
        this.shows = false
      }
      if (newVal > this.user_asset.withdraw_balance) {
        this.Booleans = true
        this.disabled = true
        this.mesg = `已超出你持有的金额，最多提现${
          this.user_asset.withdraw_balance
          }元`
        return
      }
      if (newVal <= 100) {
        this.Booleans = true
        this.disabled = true
        this.mesg = '提现最低金额为100.00元'
        return
      } else {
        this.Booleans = false
        this.disabled = false
      }
    }
  },
  components: {Payment, Modal}
}
</script>

<style lang="scss" scoped>
.x-bank {
  display: flex;
  align-items: center;
  height: 78px;
  background: #fff;
  .x-bank-head-left {
    width: 42px;
    height: 42px;
    margin: 0 15px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .x-bank-head-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    font-size: 14px;
    color: #bdbdbd;
    .p1 {
      font-size: 17px;
      color: #333;
    }
    .p2 {
      margin-top: 5px;
    }
  }
  .x-head-right {
    width: 14px;
    height: 16px;
    margin: 0 15px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.x-recharge-amount {
  background: #fff;
  margin-top: 10px;
  h1 {
    padding: 15px;
    font-size: 14px;
    color: #BDBDBD;
    font-weight: 100;
  }
  .x-recharge-amount-int {
    position: relative;
    display: flex;
    align-items: center;
    height: 70px;
    span {
      display: block;
      padding: 15px;
      font-size: 28px;
      color: #333;
    }
    input {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      color: #333;
      padding-right: 50px;
      border: none;
      &::-ms-input-placeholder {
        color: #CCCCCC;
        font-size: 21px;
      }
      &::-webkit-input-placeholder {
        color: #CCCCCC;
        font-size: 21px;
      }
      &:-ms-input-placeholder {
        color: #CCCCCC;
        font-size: 21px;
      }
    }
    .right-close-img {
      display: flex;
      align-items: center;
      img {
        margin-top: 1px;
        width: 24px;
        height: 24px;
        z-index: 10;
      }
    }

    .all {
      padding-right: 15px;
      padding-left: 5px;
      flex-shrink: 0;
      font-size: 14px;
      color: #507daf;
    }
  }
}

.x-error {
  // padding: 15px;
  padding-left: 15px;
  margin-top: 15px;
  font-size: 14px;
  color: #ff4940;
}

.x-xia {
  margin-top: 15px;
  padding: 0 15px;
  .info {
    margin-top: 20px;
    font-size: 14px;
    color: #939393;
  }
}

.mint-popup {
  width: 100%;
  height: 360px;
  overflow-y: auto;

  .bank-box {
    font-size: 14px;
    color: #b0b0b0;
    .bank-box-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #f9f9f9;
      border-bottom: 1px #f0f0f0 solid;
      text-align: center;
      font-size: 18px;
      color: #333;
      img {
        position: absolute;
        left: 15px;
        width: 18px;
        height: 18px;
      }
    }

    .bank-box-content {
      .have-click,
      .no-click,
      .x-add-bank {
        li {
          display: flex;
          align-items: center;
          height: 65px;
          .x-bank-head-left {
            width: 28px;
            height: 28px;
            margin: 0 15px;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .x-bank-head-content {
            display: flex;
            width: 100%;
            flex-direction: column;
            font-size: 14px;
            color: #bdbdbd;
            .p1 {
              font-size: 17px;
              color: #333;
            }
            .p2 {
              margin-top: 5px;
            }
          }
          .x-head-right {
            width: 20px;
            height: 16px;
            margin: 0 15px;
            display: flex;
            align-items: center;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .x-add-bank {
        display: flex;
        align-items: center;
        height: 65px;
        .x-bank-head-left {
          width: 28px;
          height: 28px;
          margin: 0 15px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .x-bank-head-content {
          display: flex;
          width: 100%;
          flex-direction: column;
          font-size: 14px;
          color: #bdbdbd;
          .p1 {
            font-size: 17px;
            color: #333;
          }
        }
        .x-head-right {
          width: 14px;
          height: 16px;
          margin: 0 15px;
          display: flex;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .no-click {
        li {
          .x-bank-head-left {
            img {
              opacity: 0.5;
            }
          }
          .x-bank-head-content {
            .p1 {
              color: #b0b0b0;
            }
          }
        }
      }
    }
  }
}

.modal-wrap {
  padding: 0 10px;
  font-size: 14px;
  .modal-title {
    color: #000;
    text-align: left;
  }
  .modal-contant {
    color: #939393;
    li {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      p {
        text-align: left;
      }
    }
  }
}
</style>
