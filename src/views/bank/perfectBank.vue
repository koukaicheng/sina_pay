<template>
  <div>
    <ts-header title="完善银行卡信息" back></ts-header>
    <page>
      <div class="wrap">
        <div class="title-box">
          <p>当前卡</p>
          <div class="content-right">
            <div class="head-img">
              <img :src="formData.card.bank_logo" alt="">
            </div>
            <p>{{formData.card.bank_name}}({{formData.card.bank_card_no|bankCard}})</p>
          </div>
        </div>
        <li class="top-title">
          <p class="title">请填写添加的银行卡预留信息</p>
        </li>
        <ul>
          <li class="item-box border-1px">
            <p class="title">真实姓名</p>
            <div class="input-box">
              <input type="text" v-model="formDataNew.name" placeholder="请输入本人真实姓名">
            </div>
            <div class="icon-close" v-if="formDataNew.name" @click="clear('name')">
              <img src="../../assets/img/balance/icon/lnput/del@2x.png">
            </div>
          </li>
          <li class="item-box border-1px">
            <p class="title">身份证号</p>
            <div class="input-box">
              <input type="text" v-model="formDataNew.ID" placeholder="请输入身份证号码">
            </div>
            <div class="icon-close" v-if="formDataNew.ID" @click="clear('ID')">
              <img src="../../assets/img/balance/icon/lnput/del@2x.png">
            </div>
          </li>
          <li class="item-box border-1px">
            <p class="title">手机号</p>
            <div class="input-box">
              <input type="number" v-model="formDataNew.phone" placeholder="请输入银行预留手机号">
            </div>
            <div class="icon-close" v-if="formDataNew.phone" @click="clear('phone')">
              <img src="../../assets/img/balance/icon/lnput/del@2x.png">
            </div>
            <div v-else class="icon-close" @click="info">
              <div class="right-info">!</div>
            </div>
          </li>
        </ul>
        <p class="support">为了您的资金安全，支付成功后将自动完成实名认证</p>
        <div class="x-xia">
          <s-button :disabled="disabled" :isLoading="isLoading" @tap="next">下一步</s-button>
        </div>
        <div class="footer-tip">
          <div class="img">
          </div>
          <div class="text">信息已加密且仅用于身份验证</div>
        </div>
      </div>
      <modal ref="modal" title="预留手机号" :btns="btns">
        <div class="modal-box">
          预留手机号码是在银行办理银行卡时填写的办卡人的手机号，如果没有办理，请前往相应柜台操作
        </div>
      </modal>

    </page>
  </div>
</template>

<script>
import Modal from '../../components/module/modal/Modal'
import { mapMutations } from 'vuex'
import { STEP_TOKEN } from '../../store/mutations/mutations-types'
export default {
  name: 'addBack',
  data() {
    return {
      disabled: true,
      isLoading: false,
      shows: false,
      formData: {
        ID: '13060419910702241x',
        name: '吴昊',
        phone: '13717814857'
      },
      btns: ['知道了']
    }
  },
  created() {
    this.formData.card = this.$route.query
  },
  mounted() {},
  methods: {
    ...mapMutations([STEP_TOKEN]),
    pickerOpen() {
      this.$refs.picker.open()
    },
    cardSelect(vals) {
      console.log(vals)
      this.cardName = vals.bank_name
    },
    support() {
      this.$router.push({ path: 'supportBank' })
    },
    next() {
      this.isLoading = true
      this.disabled = true
      // console.log(this.formDataNew)
      // setTimeout(() => {

      this.send()
      // }, 500)
    },
    clear(types) {
      this.formData[types] = ''
    },
    info() {
      this.$refs.modal.open()
    },
    send() {
      let obj = {
        bank_card_no: this.formDataNew.card.bank_card_no,
        bank_code: this.formDataNew.card.bank_code,
        bank_phone: this.formDataNew.phone,
        realname: this.formDataNew.name,
        idcard: this.formDataNew.ID
      }
      this.getBankSendVerifyAjax(obj)
    },
    getBankSendVerifyAjax(obj) {
      this.$api
        .getBankSendVerify(obj)
        .then(res => {
          if (res.code === '0') {
            console.log(res)
            this[STEP_TOKEN](res.data.req_seq)
            this.$router.push({ name: 'bankVeifyPhone', params: obj })
          } else {
            this.$modal({ message: res.msg, cancel: true, lock: true })
            this.isLoading = false
            this.disabled = false
          }
        })
        .catch(res => {
          this.isLoading = false
          this.disabled = false
        })
    }
  },
  computed: {
    formDataNew() {
      // console.log(this.formData)
      if (this.formData.name && this.formData.ID && this.formData.phone) {
        this.disabled = false
        this.shows = true
      } else {
        this.disabled = true
        this.shows = false
      }
      return this.formData
    }
  },

  components: { Modal }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
.modal-box {
  padding: 0 20px;
  font-size: 14px;
  color: #000;
}
.wrap {
  background: #fff;
  font-size: 15px;
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 10px #f7f7f7 solid;
    padding: 0 15px;
    height: 60px;
    font-size: 15px;
    color: #939393;
    .content-right {
      display: flex;
      align-items: center;
      .head-img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .top-title {
    padding: 15px;
    padding-bottom: 0;
    .title {
      font-size: 14px;
      color: #bdbdbd;
    }
  }
  ul {
    // margin-top: 20px;
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
      .input-box {
        position: relative;
        width: 100%;
        height: 100%;
        .show-wrod {
          display: flex;
          align-items: center;
          height: 100%;
        }
        input {
          position: absolute;
          top: 0;
          width: 100%;
          font-size: 15px;
          line-height: 50px;
          // color: rgba($color: #000000, $alpha: 0);
          // opacity: 0;
          border: none;
        }
      }
      .select-bank {
        width: 100%;
        // color: #ddd;
      }
      .icon-close {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100px;
        height: 100%;
        margin-right: -4px;
        img {
          width: 30px;
          height: 30px;
        }
        .right-info {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
          background: #ccc;
          border-radius: 50%;
          color: #fff;
          margin-right: 6px;
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
    color: #bdbdbd;
    padding: 10px 0;
    text-align: center;
  }
  .x-xia {
    margin: 10px 0;
    padding: 0 15px;
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
      color: #b0b0b0;
    }
  }
}
</style>
