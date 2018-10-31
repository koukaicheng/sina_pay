<template>
  <div class="">
    <ts-header title="填写银行卡信息" back=""></ts-header>
    <page>
      <div class="wraps">
        <div class="info-box">
          <div class="item border-1px">
            <p class="title">
              银行卡号
            </p>
            <div style="width: 100%;padding-left: 26px">
              <card-input v-model="info.cardNumber" @valChange="issuingBank" @focus="focus('cardNumber')"
                          @blur="blur('cardNumber')"></card-input>
            </div>
            <!--<input type="text" -->
            <!--v-model="cardNumber"-->
            <!--placeholder="请输入银行卡卡号"-->
            <!--onkeyup="this.value =this.value.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');"/>-->

            <del-val @click="del('cardNumber')" v-show="name_focus===true&&info.cardNumber!==''"></del-val>

          </div>

          <div class="item border-1px" @click="pickerOpen">
            <div class="title">
              发卡行
            </div>
            <input type="text" v-show="!vals.bank_name"
                   placeholder="请选择发卡银行" disabled/>
            <div class="val-text" v-show="vals.bank_name">
              <img class="bank-icon" :src="vals.bank_logo" alt="">
              <div class="bank-name">{{vals.bank_name}}</div>
            </div>
            <span class="icon"></span>
          </div>
          <router-link to="/supportBank">
            <div class="href-text">支持银行</div>
          </router-link>
          <div class="item border-1px">
            <div class="title">
              手机号
            </div>
            <input type="text" @focus="focus('ipone')" @blur="blur('ipone')" v-model="info.ipone"
                   placeholder="请输入银行预留手机号"/>
            <del-val v-show="idCard_focus===true&&info.ipone!==''" @click="del('ipone')"></del-val>
          </div>
          <div class="btn">
            <s-button :disabled="!valid" :isLoading="isLoading" @tap="next">下一步</s-button>
          </div>
        </div>
        <div class="footer-tip">
          <div class="img">
          </div>
          <div class="text">
            信息已加密且仅用于身份验证
          </div>
        </div>
        <!--<modal ref="modal"></modal>-->
      </div>
      <bank-list-picker ref="picker" :slots="cardList" @changeCard="cardSelect"/>
    </page>

  </div>
</template>

<script>
import Picker from '../../components/module/bank-list-picker/BankListPicker'
import { requiredObjProp } from '../../utils/verify/index'
import { mapMutations, mapState } from 'vuex'
import { STEP_TOKEN } from '../../store/mutations/mutations-types'
import CardInput from '../../components/module/card-input/CardInput'

export default {
  name: 'certificationBank',
  components: {'bank-list-picker': Picker, CardInput},
  data () {
    return {
      cardList: [],
      name_focus: false,
      idCard_focus: false,
      isLoading: false,
      cardNumber: '',
      info: {
        // cardNumber: '6214830115516371',
        cardNumber: '',
        ipone: '',
        realname: '',
        idcard: ''
      },
      vals: {}
    }
  },
  created () {

    this.info.realname = this.$route.query.realname
    this.info.idcard = this.$route.query.idcard
    // this.info.realname = this.user_info.realname
    // this.info.idcard = this.user_info.idcard
    this.getUserBankCardList()
  },
  methods: {
    ...mapMutations([STEP_TOKEN]),
    getUserBankCardList () {
      this.$api.authBankList().then(res => {
        this.cardList = [{values: res.data}]
      })
    },
    pickerOpen () {
      console.log(122121)
      this.$refs.picker.open()
    },
    cardSelect (val) {
      this.vals = val
    },
    focus (key) {
      let status = key === 'cardNumber'
      this.name_focus = true
      if (status) {
        [this.name_focus, this.idCard_focus] = [true, false]
      } else {
        [this.name_focus, this.idCard_focus] = [false, true]
      }
    },
    next () {
      let obj = {
        bank_card_no: this.info.cardNumber,
        bank_code: this.vals.bank_code,
        bank_phone: this.info.ipone,
        realname: this.info.realname,
        idcard: this.info.idcard
      }
      this.isLoading = true
      this.$api.getBankSendVerify(obj).then(res => {
        if (res.code === '0') {
          this[STEP_TOKEN](res.data.req_seq)
          this.$router.replace({name: 'bankVeifyPhone', params: obj})
        } else {
          this.$modal({message: res.msg, cancel: true, lock: true,})
          this.isLoading = false
        }
      }).catch(res => {
        this.isLoading = false
      })
    },
    blur (key) {
      let status = key === 'cardNumber'
      if (status) {
        this.name_focus = false
      } else {
        this.idCard_focus = false
      }
    },
    issuingBank (val) {
      this.vals = val
    },
    del (key) {
      let status = key === 'cardNumber'
      if (status) {
        this.info.cardNumber = ''
        this.vals = {}
      } else {
        this.info.ipone = ''
      }
    },
  },
  mounted () {

  },
  computed: {
    ...mapState(['user_info']),
    valid () {
      return requiredObjProp(this.info).isValid
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

:-moz-placeholder {
  font-size: 16px;
  color: #CCCCCC;
  line-height: 34px;
}

::-moz-placeholder {
  font-size: 16px;
  color: #CCCCCC;
  line-height: 34px;
}

input:-ms-input-placeholder {
  font-size: 16px;
  color: #CCCCCC;
  line-height: 34px;
}

input::-webkit-input-placeholder {
  font-size: 16px;
  color: #CCCCCC;
  line-height: 34px;
}

.wraps {
  font-size: 16px;
  background: #ffffff;
  position: relative;
  .info-box {
    margin: 35px 20px 0 20px;
    .href-text {
      font-size: 14px;
      color: #507DAF;
      text-align: right;
      padding-top: 20px;
    }
    .item {
      position: relative;
      /*<!--@include fja(space-between);-->*/
      display: flex;
      align-items: center;
      height: 56px;
      .val-text {

      }
      .title {
        min-width: 68px;
        flex-shrink: 0;
        font-size: 16px;
        color: #333;
      }
      input {
        flex: 1;
        margin-left: 26px;
        border: none;
        font-size: 16px;
        line-height: 34px;
        background: none;
      }
      .val-text {
        flex: 1;
        margin-left: 26px;
        @include fja();
        justify-content: flex-start;
        .bank-icon {
          @include wh(18px, 18px);
          img {
            @include wh(100%, 100%);
          }
        }
        .bank-name {
          font-size: 16px;
          color: #333;
          padding-left: 7px;
        }
      }
      .icon {
        @include wh(18px, 12px);
        @include bg-image('../../assets/img/mine/xia')
      }
    }
  }
  .btn {
    margin-top: 20px;
  }
  .footer-tip {
    position: absolute;
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
      color: #B0B0B0;
    }
  }
}
</style>
