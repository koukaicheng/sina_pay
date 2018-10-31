<template>
  <div>
    <ts-header title="个人信息" back></ts-header>
    <page>
      <div class="wrap">
        <div class="box">
          <div class="info-item border-1px">
            <div class="title">头像</div>
            <div class="info-val">
              <div class="avatar">
                    <img src="../../assets/img/mine/h@3x.png" alt="" v-if="!user_info.avatar">
                <img v-else :src="user_info.avatar" alt="">
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="title">昵称</div>
            <div class="info-val">
              <span class="nikname">{{user_info.nickname || '微博昵称'}}</span>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info-item border-1px" @click="bindingPhone">
            <div class="title">绑定手机号</div>
            <div class="info-val">
              <div class="right">
                <div class="status" v-if="!user_status.is_bind_phone">未绑定手机号</div>
                <div class="ipone" v-else>{{user_info.mobile_no | iphone}}</div>
                <div class="icon" v-if="!user_status.is_bind_phone"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info-item border-1px" @click="realName('realName')">
            <div class="title">实名信息</div>
            <div class="info-val">
              <div class="right">
                <div class="status" v-if="!user_status.is_realname">未实名</div>
                <div class="realname" v-else>{{user_info.realname|is_realname}}</div>
                <div class="icon" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'personalInfo',
  data () {
    return {}
  },
  created () {

  },
  mounted () {

  },
  methods: {
    bindingPhone () {
      if (!this.user_status.is_bind_phone) {
        this.$router.push({path: 'bindingPhone'})
      }
    },
    // 判断用户状态，跳转不同的认证页面
    realName () {
      if (!this.user_status.is_bind_phone) {
        this.$router.push({path: 'bindingPhone'})
        return
      }
      if (!this.user_status.is_realname) {
        this.$router.push({path: 'realName'})
        return
      }
      if (!this.user_status.is_bindcard) {
        this.$router.push({path: 'certificationBank'})
        return
      }
      this.$router.push({path: 'perfectIdentity'})
    }
  },
  filters: {
    iphone (val) {
      return val.substr(0, 3) + '******' + val.substr(9)
    },
    is_realname (val) {
      return `*${val.substr(1)}`
    }
  },
  components: {},
  computed: {
    ...mapState(['user_info', 'user_status'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.wrap {
  .icon {
    @include wh(10px, 14px);
    @include bg-image('../../assets/img/mine/you');
    margin-top: 4px;
  }
  .box {
    background: #ffffff;
    margin-top: 14px;
    padding-left: 14px;
    .info-item {
      @include fja(space-between);
      height: 55px;
      .title {
        font-size: 16px;
        color: #333;
      }
      .info-val {
        @include fja();
        padding-right: 13px;
        .avatar {
          @include wh(40px, 40px);
          border-radius: 50%;
          overflow: hidden;
          img {
            @include wh();
          }
        }
        .right {
          @include fja();
          font-size: 16px;
          .status {
            padding-right: 10px;
            color: #FF4940;

          }
          .ipone, .realname {
            color: #BDBDBD;
          }
          .realname{
            padding-right: 6px;
          }
        }
        .nikname {
          font-size: 16px;
          color: #BDBDBD;
        }
      }
    }
  }
}
</style>
