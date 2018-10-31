<template>
  <div class="">
    <ts-header title="实名认证" back=""></ts-header>
    <page>
      <div class="wraps">
        <div class="info-box">
          <div class="item border-1px">
            <div class="title">
              真实姓名
            </div>
            <input type="text" @focus="focus('name')" @blur="blur('name')" v-model="info.realname"
                   placeholder="请输入本人真实姓名"/>
            <del-val v-show="name_focus===true&&info.realname!==''" @click="del('name')"></del-val>
          </div>

          <div class="item border-1px">
            <div class="title">
              身份证号
            </div>
            <input type="text" @focus="focus('idCard')" @blur="blur('idCard')" v-model="info.idcard"
                   placeholder="请输入身份证号码"/>
            <del-val v-show="idCard_focus===true&&info.idcard!==''" @click="del('idCard')"></del-val>
          </div>

          <div class="btn">
            <s-button :disabled="!valid" @tap="next" :isLoading="isLoading">下一步</s-button>
          </div>
        </div>
        <div class="footer-tip" ref="save">
          <div class="img">
          </div>
          <div class="text">信息已加密且仅用于身份验证</div>
        </div>
        <!--<modal ref="modal"></modal>-->
      </div>
    </page>
  </div>
</template>

<script>
import { requiredObjProp, chinese_name, idCard } from '../../utils/verify'
import { UserMixins, adPosition } from '../../utils/mixins'

export default {
  name: 'realName',
  data () {
    return {
      isLoading: false,
      name_focus: false,
      idCard_focus: false,
      info: {
        realname: '',
        idcard: ''
      }
    }
  },
  created () {

  },
  mixins: [UserMixins, adPosition],
  methods: {
    focus (key) {
      let status = key === 'name'
      this.name_focus = true
      if (status) {
        [this.name_focus, this.idCard_focus] = [true, false]
      } else {
        [this.name_focus, this.idCard_focus] = [false, true]
      }
    },
    blur (key) {
      let status = key === 'name'
      if (status) {
        this.name_focus = false
      } else {
        this.idCard_focus = false
      }
    },
    del (key) {
      let status = key === 'name'
      if (status) {
        this.info.realname = ''
      } else {
        this.info.idcard = ''
      }
    },
    checkPwd () {
      if (!chinese_name(this.info.realname)) {
        return {
          isValid: false,
          message: '请正确填写姓名',
          duration: 3000,
        }
      }
      if (!idCard(this.info.idcard)) {
        return {
          isValid: false,
          message: '你输入的证件信息错误，请重新填写',
          duration: 3000,
        }
      }
      return {isValid: true}
    },
    next () {
      if (this.checkPwd().isValid) {
        this.isLoading = true
        this.$router.replace({path: './certificationBank', query: this.info})
        return
        this.$api.getBindIdcard(this.info).then(res => {
          if (res.code === '0') {
            this.getUserStatus()
            this.getUserInfo()
            setTimeout(() => {
              this.$router.replace({path: './certificationBank'})
            }, 500)
          } else if (res.code === 11013) {
            this.$modal({
              message: res.msg,
              cancel: true,
              lock: true,
              leftBtn: '联系我们',
              rightBtn: '更改信息'
            }).catch(() => {
              this.dialing()
            })
          } else {
            this.isLoading = false
            this.$modal({message: res.msg, lock: true,})
          }
        })
      } else {
        let valid = this.checkPwd()
        this.$toast({message: valid.message, duration: valid.duration})
      }
    },
    dialing () {
      this.$modal({
        title: '',
        message: '010-62675369',
        lock: true,
        leftBtn: '取消',
        rightBtn: '呼叫',
        isTel: true
      }).then(() => {
        window.location.href = `tel:${18610925224}`
      })
    },
  },
  mounted () {
  },
  components: {
    // modal
  },
  computed: {
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
  background: #ffffff;
  position: relative;
  .info-box {
    margin: 35px 20px 0 20px;
    .item {
      position: relative;
      @include fja(space-between);
      height: 56px;
      .title {
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
