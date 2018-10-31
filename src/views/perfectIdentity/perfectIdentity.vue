<template>
  <div>
    <ts-header title="完善信息" back></ts-header>
    <page>
      <div class="wrap">
        <div class="info-box">
          <div class="info-header item">
            <span class="status-text">您已实名认证</span>
            <div class="avatar sina-avatar"></div>
          </div>
          <div class="info-text item">
            <span class="name">{{user_info.realname|chname}}</span>
            <span class="in-card">{{user_info.idcard|idCard}}</span>
          </div>
        </div>
        <div class="title">基础信息</div>
        <div class="data-box">
          <div class="sub-item border-1px"
               @click="info.live_address_all===null?link('./perfectIdentity/personalAddress'):''">
            <div class="sub-title">居住地址</div>
            <div class="val-text">
              <div class="text" v-show="info.live_address_all===null">请输入居住地址</div>
              <div class="text" v-show="info.live_address_all!==null">{{info.live_address_all}}</div>
              <span :class="info.live_address_all===null?'icon':'success'"></span>
            </div>
          </div>
          <div class="sub-item border-1px" @click="info.company_name===null?link('./perfectIdentity/corporateName'):''">
            <div class="sub-title">公司名称</div>
            <div class="val-text">
              <div class="text" v-show="info.company_name===null">请输入公司名称</div>
              <div class="text" v-show="info.company_name!==null">{{info.company_name}}</div>
              <span :class="info.company_name===null?'icon':'success'"></span>
            </div>
          </div>
          <div class="sub-item border-1px"
               @click="info.company_telephone===null?link('./perfectIdentity/corporateTel'):''">
            <div class="sub-title">公司电话</div>
            <div class="val-text">
              <div class="text" v-show="info.company_telephone===null">输入单位电话</div>
              <div class="text" v-show="info.company_telephone!==null">{{info.company_telephone}}</div>
              <span :class="info.company_telephone===null?'icon':'success'"></span>
            </div>
          </div>
          <div class="sub-item border-1px"
               @click="info.company_address_all===null?link('./perfectIdentity/personalAddress?identity=company'):''">
            <div class="sub-title">公司地址</div>
            <div class="val-text">
              <div class="text" v-show="info.company_address_all===null">请输入单位地址</div>
              <div class="text" v-show="info.company_address_all!==null">{{info.company_address_all}}</div>
              <span :class="info.company_address_all===null?'icon':'success'"></span>
            </div>
          </div>
          <div class="sub-item" @click="info.income===null?visible=true:''">
            <div class="sub-title">月收入</div>
            <div class="val-text">
              <div class="text" v-show="info.income===null">请选择月收入</div>
              <div class="text" v-show="info.income!==null">{{incomeText}}</div>
              <span :class="info.income===null?'xia':'success'"></span>
            </div>
          </div>
        </div>
        <div class="title sc">已验证</div>
        <div class="data-box">
          <div class="sub-item border-1px">
            <div class="sub-title">身份证验证</div>
            <div class="val-text">
              <div class="text"></div>
              <span class="success"></span>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-title">人脸信息</div>
            <div class="val-text">
              <div class="text"></div>
              <span class="success"></span>
            </div>
          </div>
        </div>

      </div>
      <income-picker :incomeData="incomeVal" v-model="visible" @complete="incomeChange"></income-picker>
    </page>
    <transition name="slide-child">
      <router-view class="child-route" @infoChange="getPersonInfo"></router-view>
    </transition>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'perfectIdentity',
  data () {
    return {
      visible: false,
      info: {},
      // incomeText: '',
      incomeVal: [
        {value: 0, text: '1000（不含）以下', check: false},
        {value: 1, text: '1000~2999', check: false},
        {value: 2, text: '3000～4999', check: false},
        {value: 3, text: '5000～9999', check: false},
        {value: 4, text: '10000～19999', check: false},
        {value: 5, text: '20000以上', check: false}
      ]
    }
  },
  mounted () {
    this.getPersonInfo()
  },
  filters: {
    idCard (val) {
      return val.substr(0, 1) + '****************' + val.substring(val.length - 1)
    },
    // incomeText (val) {
    //   if (this.info.income && this.info.income !== null) {
    //     return this.incomeVal.filter((i) => i.value === val)[0].text
    //   }
    //   return '请选择月收入'
    // },
    chname (val) {
      let valLength = val.length
      if (valLength === 2) {
        return `*${val.substr(1)}`
      } else {
        let str = ''
        for (let i = 0; i < valLength - 2; i++) {
          str += '*'
        }
        return str + val.substring(valLength - 2)
      }
    }
  },
  methods: {
    getPersonInfo () {
      this.$api.getPersonInfo({uid: this.user_info.s_uid}).then(res => {
        if (res.code === 200) {
          this.info = res.data
        }
      })
    },
    link (url) {
      this.$router.push({path: url})
    },
    incomeChange (val) {
      this.$modal({
        message: '您所选择的月收入保存后暂无法修改，确定保存吗？',
        cancel: true,
        lock: true,
        leftBtn: '取消保存',
        rightBtn: '确定保存'
      }).then(() => {
        this.visible = false
        this.getPersonIncome(val.value)
      })
    },
    getPersonIncome (val) {
      let data = {uid: this.user_info.s_uid, income: val}
      this.$api.getPersonIncome(data).then(res => {
        if (res.code === 200) {
          this.getPersonInfo()
        } else {
          this.$modal({message: res.msg, cancel: true, lock: false, theme: 'sss', rightBtn: '确定'})
        }
      }).catch()
    }
  },
  components: {
    'income-picker': () => import('../../components/module/income-picker/IncomePicker')
  },
  computed: {
    ...mapState(['user_info']),
    incomeText () {
      if (this.info.income && this.info.income !== null) {
        return this.incomeVal.filter((i) => i.value == this.info.income)[0].text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.wrap {
  .info-box {
    margin: 15px 15px;
    height: 160px;
    @include bg-image('../../assets/img/mine/info-box');
    border-radius: 4px;
    .item {
      padding: 0 25px 0 15px;
      @include fja(space-between);
    }
    .info-header {
      padding-top: 30px;
      align-items: flex-start;
      .status-text {
        font-size: 17px;
        color: #FFFFFF;
      }
      .avatar {
        @include wh(40px, 40px);
        @include bg-image('../../assets/img/mine/h');
      }
    }
    .info-text {
      padding-top: 14px;
      @include fja(center, flex-start);
      flex-direction: column;
      .name, .in-card {
        font-size: 14px;
        color: #ccc;
      }
      .in-card {
        padding-top: 8px;
      }
    }
  }
  .title {
    font-size: 14px;
    color: #939393;
    margin: 0 0 8px 15px;
    &.sc {
      margin-top: 10px;
    }
  }
  .data-box {
    padding-left: 15px;
    background: #fff;
    .sub-item {
      font-size: 16px;
      padding: 16px 14px 16px 0;
      @include fja(space-between);
      .sub-title {
        color: #333333;
        min-width: 68px;
      }
      .val-text {
        padding-left: 30px;
        flex: 1;
        @include fja(space-between);
        .text {
          color: #BDBDBD;
          padding-right: 10px;
        }
        .icon {
          @include wh(10px, 14px);
          @include bg-image('../../assets/img/mine/you');
        }
        .success {
          flex-shrink: 0;
          @include wh(18px, 18px);
          @include bg-image('../../assets/img/mine/success');
        }
        .xia {
          @include wh(16px, 10px);
          @include bg-image('../../assets/img/mine/xia');
        }
      }
    }
  }
}


</style>
