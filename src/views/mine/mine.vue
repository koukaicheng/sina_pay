<template>
  <div>
    <ts-header title="我的"></ts-header>
    <page>
      <div class="wrap">
        <div class="msg-box">
          <Notice :right="notice_right"></Notice>
        </div>
        <div class="micro-blog default" @click="link('./personalInfo')">
          <div class="avatar" v-if="!user_info.avatar">
          </div>
          <div class="avater_img" v-else>
            <img :src="user_info.avatar" alt="">
          </div>
          <div class="info-text">
            <div class="left">
              <div class="sina-name" v-if="!user_info.nickname">微博昵称</div>
              <div class="sina-name" v-else>{{user_info.nickname}}</div>
              <div class="edit-user">查看并编辑个人信息</div>
            </div>
            <div class="right">
              <div class="user-status" v-if="!user_status.is_realname">未实名认证</div>
            </div>
          </div>
          <div class="icon"></div>
        </div>

        <div class="assets-box">
          <div class="item border-1px" @click="link('./totalAssets')">
            <div class="title">
              <div class="img"></div>
              <div class="text">总资产</div>
            </div>
            <div class="val">
              <div class="num">{{user_asset.total||'0.00'}}元</div>
              <div class="icon"></div>
            </div>
          </div>
          <div class="item border-1px" @click="link('./balance')">
            <div class="title">
              <div class="img"></div>
              <div class="text">余额</div>
            </div>
            <div class="val">
              <div class="num">{{user_asset.balance||'0.00'}}元</div>
              <div class="icon"></div>
            </div>
          </div>
          <div class="item" @click="link('./userBankCard')">
            <div class="title">
              <div class="img"></div>
              <div class="text">银行卡</div>
            </div>
            <div class="val">
              <div class="num">{{user_bankCard_num||'0'}}张</div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
        <div class="assets-box">
          <div class="item" @click="link('./paymentSetting')">
            <div class="title">
              <div class="img paymentsetting"></div>
              <div class="text">支付设置</div>
            </div>
            <div class="val">
              <div class="icon"></div>
            </div>
          </div>
        </div>
        <div class="footer-tip">
          财 富
          <span></span> 娱 乐
          <span></span> 生 活
        </div>
      </div>
    </page>
    <ds-footer></ds-footer>
  </div>
</template>
<script>
import Notice from '../../components/module/notice/Notice'
import { mapState } from 'vuex'
import { UserMixins } from '../../utils/mixins'

export default {
  name: 'mine',
  data () {
    return {
      user_bankCard_num: '',
      notice_right: true
    }
  },
  created () {
    this.user_info_status()
  },
  mounted () {
    this.getUserBankCard()
  },
  mixins: [UserMixins],
  methods: {
    link (url) {
      this.$router.push({path: url})
    },
    user_info_status () {
      let user_status = Object.keys(this.user_status)
      let user_asset = Object.keys(this.user_asset)
      let user_info = Object.keys(this.user_info)
      if (!user_status.length) {
        this.getUserStatus()
      }
      if (!user_asset.length) {
        this.getUserAsset()
      }
      if (!user_info.length) {
        this.getUserInfo()
      }
    }
  },
  components: {Notice},
  computed: {
    ...mapState(['user_asset', 'user_info', 'user_status'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.wrap {
  position: relative;
  background: #f7f7f7;
  .default {
    background: #ffffff;
    padding: 0 13px;
  }
  /*<!--.icon {-->*/
  /*<!---->*/
  /*<!--@include wh(10px, 14px);-->*/
  /*<!--@include bg-image('../../assets/img/mine/you');-->*/
  /*<!--}-->*/
  .icon {
    margin-top: 1px;
    margin-left: 5px;
    @include wh(9px, 15px);
    background-image: url("../../assets/img/mine/you@2x.png");
    background-size: 100% auto;
  }
  .msg-box {
    height: 40px;
    background: #fff9ed;
  }
  .micro-blog {
    height: 90px;
    @include fja(space-between);
    .avatar {
      flex-shrink: 0;
      @include wh(40px, 40px);
      border-radius: 50%;
      @include bg-image('../../assets/img/mine/h');
    }
    .avater_img {
      @include wh(40px, 40px);
      border-radius: 50%;
      flex-shrink: 0;
      overflow: hidden;
      img {
        @include wh(100%, 100%);
      }
    }
    .info-text {
      flex: 1;
      padding: 0 13px;
      @include fja(space-between);
      .left {
        .sina-name {
          font-size: 18px;
          color: #333;
        }
        .edit-user {
          padding-top: 4px;
          font-size: 14px;
          color: #bdbdbd;
        }
      }
      .right {
        .user-status {
          font-size: 16px;
          color: #ff4940;
        }
      }
    }
  }
  .assets-box {
    background: #ffffff;
    padding: 0 0 0 13px;
    margin-top: 10px;
    .item {
      height: 56px;
      @include fja(space-between);
      .title {
        @include fja();
        padding-left: 2px;
        .img {
          @include wh(22px, 22px);
          @include bg-image('../../assets/img/mine/totalassets');
          &.paymentsetting {
            @include bg-image('../../assets/img/mine/paymentsetting');
          }
        }
        .text {
          padding-left: 16px;
          font-size: 16px;
          color: #333;
        }
      }
      &:nth-child(2) {
        .img {
          @include bg-image('../../assets/img/mine/balance');
        }
      }
      &:nth-child(3) {
        .img {
          @include bg-image('../../assets/img/mine/bankcard');
        }
      }
      .val {
        padding-right: 13px;
        @include fja();
        .num {
          font-size: 16px;
          color: #bdbdbd;
          padding-right: 10px;
        }
      }
    }
  }
  .footer-tip {
    @include fja();
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    bottom: 46px;
    font-size: 12px;
    color: #bdbdbd;
    height: 52px;
    span {
      display: inline-block;
      @include wh(4px, 4px);
      background: #bdbdbd;
      margin: 0 10px;
      transform: rotate(-315deg);
    }
  }
}
</style>
