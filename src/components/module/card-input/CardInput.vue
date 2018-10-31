<template>
  <div class='wrap'>
    <label class="box">
      <div :class="value_in?'':'gray'">{{entryval}}</div>
      <input class="hidden" type="number" v-model="value_in" @focus="focus()" @blur="_blur()">
    </label>

  </div>
</template>

<script>
export default {
  name: 'card-input',
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      entryval: '请输入银行卡卡号',
      value_in: '',
      len: {
        newVal: 0,
        oldVal: 0
      }
    }
  },
  methods: {
    focus () {
      this.$emit('focus')
    },
    _blur () {
      this.$emit('blur')
    },
    blur () {
      if (this.isClear) {
        return
      }
      let val = this.Trim(this.cardNumber, 'g')
      if (val.length < 16) {
        return
      }
      console.log(val)
      this.getAuthBankIdentify(val)
    },
    /**
     * 识别银行卡
     */
    getAuthBankIdentify (bank_card_no) {
      this.$api.authBankIdentify({bank_card_no}).then(res => {
        console.log(res)
        if (res.code === 11004) {
          this.msg = res.msg
          this.$modal({message: res.msg, cancel: true, lock: false, theme: 'sss'})
          return
        }
        if (res.code === '0') {
          // this.vals = res.data
          this.$emit('valChange', res.data)
          this.disabled = false
        }
      })
    }
  },
  mounted () {},
  watch: {
    value (newVal, oldVal) {
      if (newVal == '') {
        this.entryval = '请输入银行卡卡号'
        this.value_in = ''

        return
      }
      if ((newVal + '').length > 20) {
        this.value_in = oldVal
        return
      }
      this.entryval = newVal
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
      this.value_in = newVal
    },

    value_in (val) {
      let len = val.length
      this.len.newVal = len
      this.$emit('input', val)
      // 判断是添加还是删除操作
      if (this.len.newVal > this.len.oldVal) {
        if (len === 13) {
          this.getAuthBankIdentify(val)
        }
      } else {

      }
      this.len.oldVal = len
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;

  .box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    .gray {
      color: #CCCCCC;
    }
  }
  .hidden {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
