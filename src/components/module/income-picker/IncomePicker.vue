<template>
  <mt-popup v-model="visible" position="bottom" style="width:100%;">
    <div class="header">
      <span class="handleClose" @click="handleClose">取消</span>
      <span class="title">请选择收入区间</span>
      <span class="fillAddress" @click="fillAddress">完成</span>
    </div>
    <ul class="data-box" @touchmove.stop.prevent="">
      <li class="val-item" @click="incomeChange(index)"
          :class="{'border-1px':index<incomeData.length-1,'active':item.check===true}"
          v-for="(item,index) in incomeData"
          :key="index">
        <span class="text">{{item.text}}</span>
        <span v-show="item.check===true" class="select"></span>
      </li>
    </ul>
  </mt-popup>
</template>

<script>
export default {
  name: 'income-picker',
  data () {
    return {
      visible: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    incomeData: {
      type: Array,
      default: () => []
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleClose () {
      this.$emit('pickerClose', (this.visible = false))
    },
    fillAddress () {
      if (this.activeVal) {
        this.$emit('complete', this.activeVal)
      }
    },
    incomeChange (index) {
      this.incomeData.forEach((i) => {i.check = false})
      this.incomeData[index].check = true
    }
  },
  computed: {
    activeVal () {
      return this.incomeData.filter((i) => i.check === true)[0]
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F9F9F9;
  height: 48px;
  font-size: 17px;
  padding: 0 13px;
  .fillAddress {
    color: #4576FF;
  }
}

.data-box {
  background: #fff;
  z-index: 9999;
  .val-item {
    height: 55px;
    @include fja();
    font-size: 16px;
    padding: 0 26px;
    position: relative;
    &.active {
      .text {
        color: #4576FF;
      }
    }
    .text {
      color: #333;
      text-align: center;
    }
    .select {
      position: absolute;
      right: 26px;
      top: 18px;
      @include wh(18px, 18px);
      @include bg-image('../../../assets/img/mine/xuanzhong');
    }
  }
}
</style>
