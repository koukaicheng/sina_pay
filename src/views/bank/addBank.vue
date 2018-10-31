<template>
  <div>
    <ts-header title="添加银行卡" back></ts-header>
    <page>
      <div class="wrap">
        <ul>
          <li class="item-box border-1px">
            <p class="title">添加银行卡</p>
            <card-input v-model="cardNumber" @valChange="issuingBank"></card-input>
            <!-- <div class="input-box">
              <input type="number" v-model="cardNumber" placeholder="请输入银行卡卡号" @blur="blur">
            </div>-->
            <div class="icon-close" v-if="shows" @click="clear">
              <img src="../../assets/img/balance/icon/lnput/del@2x.png">
            </div>
          </li>
          <li class="item-box border-1px">
            <p class="title">发卡行</p>
            <div class="select-bank" @click="pickerOpen">
              <div v-if="vals.bank_logo" class="img-logo">
                <img :src="vals.bank_logo" alt="">
              </div>
              {{vals.bank_name}}
            </div>
            <p class="icon-right">
              <img src="../../assets/img/balance/icon/xia.png" alt="">
            </p>
          </li>
        </ul>
        <p class="support" @click="support">支持银行</p>
        <div class="x-xia">
          <s-button :disabled="!voidrt" :isLoading="isLoading" @tap="next">下一步</s-button>
        </div>
        <div class="footer-tip">
          <div class="img">
          </div>
          <div class="text">信息已加密且仅用于身份验证</div>
        </div>
      </div>
      <Picker ref="picker" :slots="cardList" @changeCard="cardSelect"/>
      <Modal ref="modal" title="提示" :btns="btns" @change="change">
        {{msg}}
      </Modal>
    </page>
  </div>
</template>

<script>
import Picker from '../../components/module/bank-list-picker/BankListPicker'
import Modal from '../../components/module/modal/Modal'
import CardInput from '../../components/module/card-input/CardInput'

export default {
  name: 'addBack',
  data () {
    return {
      cardList: [],
      disabled: true,
      cardNumber: '',
      isLoading: false,
      shows: false,
      msg: '',
      btns: ['取消', '重试'],
      vals: {
        bank_name: '请选择发卡银行'
      },
      isClear: false
    }
  },
  created () {
    this.getUserBankCardList()
  },
  mounted () {},
  methods: {
    /**
     * 发行卡
     */
    pickerOpen () {
      this.$refs.picker.open()
    },
    /**
     * 选择卡片
     */
    cardSelect (vals) {
      console.log(vals)
      this.vals = vals
    },
    /**
     * 支持银行卡
     */
    support () {
      this.$router.push({path: 'supportBank'})
    },
    /**
     * 验证开卡行
     */
    issuingBank (obj) {
      console.log(obj)
      this.vals = obj

    },
    next () {
      this.isLoading = true
      this.disabled = true
      this.vals.bank_card_no = this.cardNumber.replace(/\s*/g, '')
      setTimeout(() => {
        this.isLoading = false
        this.disabled = false
        this.$router.push({path: 'perfectBank', query: this.vals})
      }, 500)
    },
    clear () {
      this.isClear = false
      this.cardNumber = ''
    },
    change (type) {},
    /**
     * 获取银行卡列表
     */
    getUserBankCardList () {
      this.$api.authBankList().then(res => {
        this.cardList = [{values: res.data}]
      })
    },

    Trim (str, is_global) {
      let result
      result = str.replace(/(^\s+)|(\s+$)/g, '')
      if (is_global.toLowerCase() == 'g') {
        result = result.replace(/\s/g, '')
      }
      return result
    }
  },
  computed: {
    voidrt () {
      return this.cardNumber !== '' && this.vals.bank_card_no
    }
  },
  watch: {
    cardNumber (newVal, oldVal) {
      if (newVal !== '') {
        this.shows = true
      } else {
        this.disabled = true
        this.shows = false
      }
      // this.cardNumber = newVal
      //   .replace(/\s/g, '')
      //   .replace(/[^\d]/g, '')
      //   .replace(/(\d{4})(?=\d)/g, '$1 ')
      // console.log(newVal.length)
      // if (newVal.length > 23) {
      //   this.cardNumber = oldVal
      // }
    }
  },
  components: {Picker, Modal, CardInput}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.wrap {
  background: #fff;
  font-size: 16px;
  ul {
    margin-top: 35px;
    .item-box {
      display: flex;
      align-items: center;
      height: 55px;
      margin: 10px 15px;
      .title {
        flex-shrink: 0;
        width: 100px;
        line-height: 50px;
      }
      .select-bank {
        display: flex;
        align-items: center;
        width: 100%;
        color: #CCCCCC;
        .img-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          margin-right: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .icon-close {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        margin-right: -4px;
        margin-top: 1px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .icon-right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .support {
    font-size: 14px;
    color: #507daf;
    padding: 10px 15px 20px 15px;
    text-align: right;
  }
  .x-xia {
    padding: 0 15px;
  }
  .footer-tip {
    position: fixed;
    bottom: 20px;
    width: 100%;
    @include fja();
    .img {
      @include wh(16px, 16px);
      background-image: url('../../assets/img/mine/security.png');
      background-size: 100% 100%;
    }
    .text {
      padding-left: 5px;
      text-align: center;
      font-size: 12px;
      color: #b0b0b0;
    }
  }
}
</style>
