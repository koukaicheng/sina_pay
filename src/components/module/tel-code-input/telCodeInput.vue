<template>
  <div class="box">
    <div class="title">请输入验证码</div>
    <div class="iphone">已发送到：{{phoneNum|iphone}}</div>

    <div class="input-box">
      <input type="number" maxlength="6" class="code" @focus='focus=true' @blur='focus=false'
             :disabled="disabled"
             v-model="code" ref="code" id="code"/>
      <div class="labels">
        <label class="label" :class='{active: focus===true && index===currentIndex}' for="code"
               v-for="(item,index) in maxLength" :key="index" v-text="code[index]"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tel-code-input',
  data () {
    return {
      focus: false,
      maxLength: 6,
      disabled: false,
      code: ''
    }
  },
  filters: {
    iphone (val) {
      return val.substr(0, 3) + '******' + val.substr(9)
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    phoneNum: {
      type: String,
      default: ''
    }
  },
  methods: {},
  computed: {
    currentIndex () {
      return this.code.length
    }
  },
  watch: {
    code (newVal) {
      this.code = newVal.replace(/[^\d]/g, '')
      if (newVal.length >= 6) {
        this.code = newVal.substr(0, 6)
        this.$refs.code.blur()
        this.$emit('codeChange')
      }
    },
    value (val) {
      this.code = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.title {
  margin-top: 62px;
  color: #333333;
  font-size: 24px;
  text-align: center;
}

.iphone {
  font-size: 14px;
  color: #B0B0B0;
  text-align: center;
  margin-top: 14px;
}

.input-box {
  margin: 35px 20px 0 20px;
  height: 60px;
  input {
    width: 100%;
    padding: 0;
    height: 40px;
    font-size: 35px;
    overflow: hidden;
    border: none;
    outline: none;
    opacity: 0;
    margin-left: -100%;
    -webkit-tap-highlight-color: transparent
  }
  .labels {
    width: 100%;
    height: 60px;
    margin-top: -40px;
    @include fja(space-between);
    .label {
      position: relative;
      text-align: center;
      color: #000000;
      width: 45px;
      line-height: 55px;
      height: 100%;
      font-size: 32px;
      border-bottom: 1px solid #CCCCCC;
      &.active::after {
        content: ' ';
        position: absolute;
        top: 50%;
        width: 3px;
        height: 32px;
        transform: translate(0, -50%);
        line-height: 32px;
        background: #4576FF;
        animation: 1s animate infinite
      }
    }
  }
}
</style>
