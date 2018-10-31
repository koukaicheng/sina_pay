<template>
  <div>
    <ts-header title="我的银行卡" back></ts-header>
    <div class="tab-header">
      <div class="item" :class="{'active':tabIndex===0}" @click="tabIndex=0"><span>储蓄卡</span></div>
      <div class="item" :class="{'active':tabIndex===1}" @click="tabIndex=1"><span>信用卡</span></div>
    </div>
    <page>

      <div class="wrap">
        <div class="tab-box" v-show="tabIndex===0">
          <div class="box">
            <div class="bank-item" v-for="(item,index) in user_bankCard_info.deposits" :class="item.bank_code"
                 :key="index">
              <div class="bank_card_type">{{item.bank_card_type}}</div>
              <div class="bank_card_no">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>{{item.bank_card_no |bank_no}}</span>
              </div>
            </div>
            <div class="footer" v-show="tabIndex===0&&user_bankCard_info.deposits">
              <span class="add">+</span>
              <span class="text" @click="addBankcard">添加银行卡</span>
            </div>
            <div class="bank-item add_bank"
                 v-show="!user_bankCard_info.deposits||user_bankCard_info.deposits.length===0">
              <div class="add_icon"></div>
              <div class="title">添加银行卡</div>
              <div class="tip">添加银行卡方便资产管理，享受理财生活服务</div>

            </div>
          </div>
        </div>
        <div class="tab-box" v-show="tabIndex===1">
          <div class="box">
            <div class="bank-item" v-for="(item,index) in user_bankCard_info.credits" :class="item.bank_code"
                 :key="index">
              <div class="bank_card_type">{{item.bank_card_type}}</div>
              <div class="bank_card_no">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>{{item.bank_card_no |bank_no}}</span>
              </div>
            </div>
            <div class="no-data" v-show="!user_bankCard_info.credits||user_bankCard_info.credits.length===0">暂无信用卡</div>
          </div>
        </div>
      </div>

    </page>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userBankCard',
  data () {
    return {
      tabIndex: 0
    }
  },
  filters: {
    bank_no (val) {
      return val.substr(val.length - 4)
    }
  },
  created () {},
  mounted () {},
  methods: {
    addBankcard(){
      this.$router.push({path:'addBank'})
    }
  },
  computed: {
    ...mapState(['user_bankCard_info']),
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.tab-header {
  background: #fff;
  height: 44px;
  @include fja();
  .item {
    flex: 1;
    @include fja();
    font-size: 16px;
    height: 100%;
    color: #333333;
    &.active {
      color: #FF4940;
      span {
        position: relative;
        &::before {
          width: 24px;
          height: 3px;
          display: block;
          content: '';
          background: #FF4940;
          position: absolute;
          bottom: -8px;
          transform: translate(50%, 0);

        }
      }
    }
  }
}

.wrap {
  .tab-box {
    height: 100%;
    overflow-y: scroll;
    .box {
      @include fja(flex-start);
      flex-direction: column;
      position: relative;
      min-height: 100%;
      padding-bottom: 60px;
      .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        @include fja();
        background: #fff;
        font-size: 16px;
        color: #FF4940;
        .add {
          display: inline-block;
          font-size: 26px;
          line-height: 100%;
          padding-right: 6px;
        }
      }
      .no-data {
        font-size: 14px;
        color: #939393;
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translate(0, -50%);
        text-align: center;
      }
      .bank-item {
        margin-top: 10px;
        @include wh(350px, 130px);
        &.add_bank {
          border: 2px dashed #E6E6E6;
          border-radius: 10px;
          @include fja();
          flex-direction: column;
          .add_icon {
            @include wh(38px, 32px);
            @include bg-image('../../assets/img/mine/addbank')
          }
          .title {
            color: #333;
            font-size: 18px;
            margin-top: 10px;
          }
          .tip {
            padding-top: 4px;
            font-size: 12px;
            color: #939393;
          }
        }
        .bank_card_type {
          font-size: 14px;
          color: #FFFFFF;
          text-align: right;
          padding: 20px 24px 0 0;
        }
        .bank_card_no {
          padding: 32px 0 0 25px;
          font-size: 24px;
          color: #FFFFFF;
          span {
            display: inline-block;
            padding-left: 14px;
            &:first-child {
              padding-left: 0;
            }
          }
        }
        &:first-child {
          margin-top: 13px;
        }
        &.ABC {
          @include bg-image('../../assets/img/total/bank/ABC')
        }
        &.BOCOM {
          @include bg-image('../../assets/img/total/bank/BOCOM')
        }
        &.CCB {
          @include bg-image('../../assets/img/total/bank/CCB')
        }
        &.CEB {
          @include bg-image('../../assets/img/total/bank/CEB')
        }
        &.CGB {
          @include bg-image('../../assets/img/total/bank/CGB')
        }
        &.CMB {
          @include bg-image('../../assets/img/total/bank/CMB')
        }
        &.CMBC {
          @include bg-image('../../assets/img/total/bank/CMBC')
        }
        &.CNCB {
          @include bg-image('../../assets/img/total/bank/CNCB')
        }
        &.CTB {
          @include bg-image('../../assets/img/total/bank/CTB')
        }
        &.HXB {
          @include bg-image('../../assets/img/total/bank/HXB')
        }
        &.ICBC {
          @include bg-image('../../assets/img/total/bank/ICBC')
        }
        &.PAB {
          @include bg-image('../../assets/img/total/bank/PAB')
        }
        &.PSBC {
          @include bg-image('../../assets/img/total/bank/PSBC')
        }
        &.SPDB {
          @include bg-image('../../assets/img/total/bank/CMB')
        }
        &.BOS{
          @include bg-image('../../assets/img/total/bank/BOS')
        }
      }
    }

  }
}


</style>
