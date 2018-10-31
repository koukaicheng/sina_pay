<template>
  <div>
    <transition name="fadeopacity">
      <div v-show="isShow" class="picker-wrap-up"></div>
    </transition>
    <transition name="fade">
      <div v-show="isShow" class="picker-wrap">
        <div class="picker-box" @click.stop="">
          <div class="picker-head">
            <div class="picker-close" @click="closeMask">
              <img src="../../../assets/img/balance/icon/close@2x.png" alt="">
            </div>
            <div class="picker-content">
              请输入交易密码
            </div>
          </div>

          <div class="content">
            <ul class="content-top">
              <li v-for="(item , index) in 6" :class="(password[index]||password[index]===0)?'active':''">
              </li>
            </ul>
            <p class="forgetpas" @click="forgetPay">忘记密码</p>
            <ul class="input-box">
              <li v-for="(item ,index) in keys" class="input-item" :class="item ==='-'?'last':''" @click="input(item)">
                <template v-if="item ==='-'">
                  <div class="icon">
                    <img src="../../../assets/img/balance/del.png" alt="">
                  </div>
                </template>
                <template v-else>
                  {{item}}
                </template>
              </li>
            </ul>
            <div v-if="isResultShow" class="result-box">
              <!-- v-if="isLoadShow" -->
              <!-- <transition name="load" mode="out-in"> -->
              <div v-if="isLoadShow === 0" class="loding-box" key="load">
                <img src="../../../assets/img/balance/loding.png" alt="">
              </div>
              <div v-if="isLoadShow === 2" class="loding-box2">
                <div class="swal2-icon swal2-success swal2-animate-success-icon" key="ok">
                  <div class="swal2-success-circular-line-left" style="background: rgb(255, 255, 255);">
                  </div>
                  <span class="swal2-success-line-tip swal2-animate-success-line-tip"></span>
                  <span class="swal2-success-line-long swal2-animate-success-line-long"></span>
                </div>
              </div>
              <!-- </transition> -->
              <p v-if="isLoadShow === 0" class="info">支付中...</p>
              <p v-if="isLoadShow === 2" class="info">支付成功</p>

            </div>

          </div>
        </div>
      </div>
    </transition>
    <Modal ref="modal" title="交易失败" :btns="btns" @change="change">
      {{msg}}
    </Modal>
  </div>
</template>

<script>
import Modal from '../modal/Modal'
import md5 from 'js-md5'
import { MessageBox } from 'mint-ui'
export default {
  name: 'payment',
  props: {
    card: {
      type: Object
    },
    money: {
      type: String
    }
  },
  data() {
    return {
      isShow: false,
      keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '-'],
      password: [],
      isLoadShow: 0,
      isResultShow: false,
      formData: {},
      msg: '',
      payCode: 0,
      btns: ['取消', '重试']
    }
  },
  created() {},
  methods: {
    /**
     * 打开输入密码控件
     */
    open() {
      // 打开空控件之前清空所有信息
      this.getClearInit()
      // 填充银行卡信息和价格
      this.formData.card_id = this.card.bank_id
      this.formData.money = this.money
    },
    //忘记密码
    forgetPay () {
      this.$api.getForgetPayPwdSend().then(res => {
        if (res.code === '0') {
          this.$router.push({name: 'forgetPasPhoneNum'})
        }
      })
    },
    // 拟态窗按钮操作
    change(e) {
      // e.types === true 表示点击右按钮
      // e.types === false 表示点击左按钮
      /**
       * 密码输入错误过多
       */
      if (this.payCode === 1) {
        if (e.types) {
          // 重试要清空密码，并且显示输入控件
          this.getClearInit()
        } else {
          // 取消关闭密码空间
          console.log('忘记密码')
        }

        return
      }
      if (this.payCode === 2) {
        this.getClearInit()
        if (e.types) {
          // 重试要清空密码，并且显示输入控件
          // this.getClearInit()
          console.log('忘记密码')
          this.$router.push('home')
          this.isShow = false
        } else {
          // 取消关闭密码空间
          this.isShow = false
        }
        return
      }
      if (e.types) {
        // 重试要清空密码，并且显示输入控件
        this.getClearInit()
      } else {
        // 取消关闭密码空间
        this.isShow = false
      }
    },
    getClearInit() {
      this.password = []
      this.isShow = true
      this.isLoadShow = 0
      this.isResultShow = false
    },
    /**
     * 关闭输入密码控件
     */
    closeMask() {
      // 判断是否输入中，如果不是 禁止关闭
      if (!this.isResultShow) {
        this.isShow = false
      }
    },
    /**
     * 或许密码输入控件的密码，并且记录
     */
    input(num) {
      // 点击密码控件左下角不做操作
      if (num === '') {
        return
      }
      // 点击返回键
      if (num === '-') {
        if (this.password.length !== 0) {
          this.password.splice(this.password.length - 1, 1)
        }
        return
      }
      // 当数组长度是5的时候进行判断并加入最后一个元素，这里如果是5 说明是点击的第六次
      if (this.password.length === 5) {
        this.password.push(num)
        this.formData.pay_password = this.MD5(this.password.join(''))
        console.log(this.formData)
        // 进入结果页面
        this.isResultShow = true
        setTimeout(() => {
          // 获取结果
          console.log(this.formData.pay_password)
          this.getUserVerifyPayPwd(this.formData.pay_password)
        }, 1000)
        return
      }
      // 密码添加
      this.password.push(num)
    },
    /**
     * 进入到支付结果
     */
    enterInfo() {
      // 这里请求接口 判断是否支付成功
      this.isLoadShow = 2
      setTimeout(() => {
        this.isShow = false
        this.$router.replace({ path: 'result' })
      }, 2600)
    },
    /**
     * 余额充值
     */
    getTradeRecharge(formData) {
      this.$api.tradeRecharge(formData).then(res => {
        console.log(res)
        // 密码不正确
        if (res.code === '11016') {
          this.isLoadShow = 1
          this.msg = '交易密码错误，你还可以输入x次'
          this.payCode = 1
          this.btns = ['忘记密码', '重试']
          this.$refs.modal.open()
          return
        }
        if (res.code !== '0') {
          this.isLoadShow = 1
          this.msg = res.msg
          this.$refs.modal.open()
          return
        }
        // 成功
        if (res.code === '0') {
          this.enterInfo()
        }
      })
    },
    /**
     * 交易密码验证
     */
    getUserVerifyPayPwd(pay_pwd) {
      this.$api.userVerifyPayPwd({ pay_pwd }).then(res => {
        console.log(res)
        if (res.code === '11020') {
          this.isLoadShow = 1
          this.msg = res.msg
          this.payCode = 1
          this.btns = ['忘记密码', '重试']
          this.$refs.modal.open()
          return
          // this.getTradeRecharge(this.formData)
        }
        if (res.code === '11021') {
          this.isLoadShow = 1
          this.msg = res.msg
          this.payCode = 2
          this.btns = ['取消', '忘记密码']
          this.$refs.modal.open()
          return
        }
        if(res.code === '0'){
          this.getTradeRecharge(this.formData)
        }
      })
    },
    MD5(pass) {
      return md5(pass).toUpperCase()
    }
  },
  components: { Modal }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  // opacity: 0;
  transform: translateY(100%);
}
.fadeopacity-enter-active,
.fadeopacity-leave-active {
  transition: opacity 0.5s;
}
.fadeopacity-enter, .fadeopacity-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.picker-wrap-up {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  overflow: hidden;
  background: rgba($color: #000000, $alpha: 0.2);
}
.picker-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  overflow: hidden;
  .picker-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    .picker-head {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background: #f9f9f9;
      font-size: 16px;
      color: #333;
      .picker-close {
        display: flex;
        align-items: center;
        padding: 0 15px;
        position: absolute;
        left: 0;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
    .content {
      position: relative;
      .content-top {
        display: flex;
        margin: 0 15px;
        margin-top: 20px;
        border-radius: 5px;
        border: 1px #ccc solid;
        li {
          position: relative;
          width: 16.8%;
          height: 0;
          padding-top: 16.6%;
          border-right: 1px #ccc solid;
          box-sizing: border-box;
          &:last-child {
            border: none;
          }
          &.active:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #333;
          }
        }
      }
      .forgetpas {
        width: 100%;
        text-align: right;
        padding-right: 15px;
        font-size: 14px;
        color: #507daf;
        padding-top: 15px;
        padding-bottom: 20px;
      }
      .input-box {
        display: flex;
        flex-wrap: wrap;

        width: 100%;
        .input-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 33.33%;
          height: 65px;
          border-right: 1px #e6e6e6 solid;
          border-top: 1px #e6e6e6 solid;
          font-size: 28px;
          .icon {
            display: flex;
            align-items: center;
            width: 30px;
            height: 30px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-child(3n) {
            border-right: none;
          }
          &:active {
            background: #f5f5f5;
          }
          &.last {
            background: #f9f9f9;
          }
        }
      }
      .result-box {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: #fff;
        font-size: 16px;
        .loding-box {
          // margin-top: -50px;
          width: 90px;
          height: 90px;
          animation: loading 1s infinite linear;

          img {
            width: 100%;
            height: 100%;
          }
          @keyframes loading {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }
        }
        .loding-box2 {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 92px;
          height: 92px;
          margin-top: -2px;
        }
        .info {
          margin-top: 20px;
        }
      }
    }
  }
}

.swal2-icon {
  width: 80px;
  height: 80px;
  border: 6px solid transparent;
  border-radius: 50%;
  padding: 0;
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
  background: #fff;

  &.swal2-success {
    border-color: #5495ff;
    [class^='swal2-success-line'] {
      height: 6px;
      background-color: #5495ff;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 2;
    }
    [class^='swal2-success-line'][class$='tip'] {
      width: 25px;
      left: 14px;
      top: 46px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    [class^='swal2-success-line'][class$='long'] {
      width: 47px;
      right: 7px;
      top: 38px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    .swal2-animate-success-line-tip {
      animation: animate-success-tip 0.75s;
    }

    .swal2-animate-success-line-long {
      animation: animate-success-long 0.75s;
    }
  }
}

@keyframes animate-success-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 24px;
    top: 50px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes animate-success-long {
  0% {
    width: 0;
    right: 47px;
    top: 56px;
  }
  65% {
    width: 0;
    right: 48px;
    top: 56px;
  }
  84% {
    width: 52px;
    right: 0;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

.load-enter-active,
.load-leave-active {
  transition: opacity 0.5s;
  opacity: 1;
}
.load-enter, .load-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>





