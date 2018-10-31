<template>
  <div>
    <ts-header title="验证身份" back></ts-header>
    <page>
      <div class="wrap">
        <div class="tip">请填写添加的银行卡预留信息</div>
        <ul>
          <li class="item-box border-1px">
            <p class="title">发卡行</p>
            <div class="select-bank" @click="pickerStatus=!pickerStatus">
              <div v-if="vals.bank_logo" class="img-logo">
                <img :src="vals.bank_logo" alt="">
              </div>
              {{vals.bank_name.substr(2)}}{{vals.bank_card_no|lastNum}}
            </div>
            <p class="icon-right">
              <img src="../../../assets/img/balance/icon/xia.png" alt="">
            </p>
          </li>
          <li class="item-box border-1px">
            <p class="title">身份证号</p>
            <div class="input-box">
              <input type="text" v-model="info.idCard" @focus="vaerisse=true" @blur="vaerisse=false"
                     placeholder="请输入身份证号码">
            </div>
            <del-val v-show="vaerisse===true&&info.idCard!==''" @click="info.idCard=''"></del-val>
          </li>
        </ul>
        <div class="btn">
          <s-button :disabled="!valid" :isLoading="isLoading" @tap="next">下一步</s-button>
        </div>
      </div>
    </page>
    <MyblankPicker v-model="pickerStatus" @change="setBandcard" :bandCardList=bandCardList></MyblankPicker>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { STEP_TOKEN } from '../../../store/mutations/mutations-types'
import { requiredObjProp } from '../../../utils/verify'

export default {
  name: 'bandCardVerifcation',
  data () {
    return {
      vaerisse: false,
      pickerStatus: false,
      isLoading: false,
      bandCardList: [],
      info: {
        idCard: ''
      },
      vals: {}
    }
  },
  created () {
  },
  mounted () {
    this.getUserBandcardList()
  },
  methods: {
    ...mapMutations([STEP_TOKEN]),
    getUserBandcardList () {
      this.$api.userBankCardList().then(res => {
        let bandCardList = res.data.deposits
        bandCardList.forEach((i) => {i.check = false})
        bandCardList[0].check = true;
        [this.vals, this.bandCardList] = [bandCardList[0], bandCardList]
      })
    },
    setBandcard (val) {
      this.vals = val
    },
    next () {
      this.isLoading = true
      let data = Object.assign({}, {
        bank_card_no: this.vals.bank_card_no,
        idcard: this.info.idCard,
        step_token: this.step_token
      })
      this.$api.getForgetPayPwdVerifyUser(data).then(res => {
        console.log(res)
        if (res.code === '0') {
          this[STEP_TOKEN]('')
          this.$router.replace({path: '/oldPassword'})
        } else {
          this.$modal({message: res.msg, cancel: true, lock: true, theme: 'sss'})
          this.isLoading = false
        }
      })
    }
  },
  filters: {
    lastNum (val) {
      if (!val) {return ''}
      return `(尾号${val.substr(val.length - 4)})`
    }
  },
  components: {
    MyblankPicker: () => import('../../../components/module/myblank-picker/MyblankPicker')
  },
  computed: {
    ...mapState(['step_token']),
    valid () {
      return requiredObjProp(this.vals).isValid && requiredObjProp(this.info).isValid
    }
  }
}
</script>s

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.wrap {
  background: #fff;
  font-size: 16px;
  .tip {
    margin: 30px 15px;
    font-size: 14px;
    color: #BDBDBD;
  }
  ul {
    margin-top: 20px;
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
          font-size: 16px;
          line-height: 54px;
          border: none;
          display: flex;
        }
      }
      .select-bank {
        display: flex;
        align-items: center;
        width: 100%;
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
  .btn {
    margin: 30px 15px 0 15px;
  }
}
</style>
