<template>
  <mt-popup v-model="visible" position="bottom" style="width:100%;">
    <input type="hidden" :value="value">

    <div class="mint-datetime">
      <van-area :area-list="AreaList" @cancel="handleClose" @confirm="fillAddress"/>
    </div>
  </mt-popup>
</template>

<script>
import area from 'vant/lib/area'
import 'vant/lib/vant-css/base.css'
import 'vant/lib/vant-css/picker.css'

import AreaList from './area'

export default {
  name: 'addr-picker',
  components: {'van-area': area},
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      AreaList: AreaList,
      visible: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('pickerClose', (this.visible = false))
    },
    fillAddress (val) {
      this.visible = false
      let obj = {};
      [obj.province, obj.city, obj.area] = [val[0].name, val[1].name, val[2].name]
      this.$emit('complete', obj)
    },
  },
  mounted () {
    // this.initAddress()
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
.mint-datetime {
  width: 100%;
  /*height: 215px;*/
}
</style>
