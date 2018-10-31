<template>
  <mt-popup v-model="visible" position="bottom" style="width:100%;">
    <div class="header">
      <span class="handleClose" @click="visible = false"></span>
      <span class="title">选择银行卡</span>
    </div>
    <ul class="data-box">
      <li class="val-item" @click="incomeChange(index)" v-for="(item,index) in bandCardList"
          :class="{'border-1px':index<bandCardList.length-1,'active':item.check===true}">
        <div class="content">
          <img :src="item.bank_logo" alt=""/>
          <span class="bank_name">{{item.bank_name}}  </span>
          <span class="lastval"> {{item.bank_card_no | lastNum}}</span>
        </div>
        <div class="status" v-show="item.check===true"></div>
      </li>
    </ul>
  </mt-popup>
</template>

<script>
export default {
  name: 'MyblankPicker',
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
    bandCardList: {
      type: Array,
      default: []
    }
  },
  created () {},
  mounted () {},
  methods: {
    incomeChange (index) {
      this.bandCardList.forEach((i) => {i.check = false})
      this.bandCardList[index].check = true
      this.$emit('change', this.bandCardList[index])
      this.visible = false
    },
    fillAddress () {}
  },
  filters: {
    lastNum (val) {
      return `(${val.substr(val.length - 4)})`
    }
  },
  components: {},
  computed: {},
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.header {
  @include fja();
  background: #F9F9F9;
  height: 48px;
  font-size: 17px;
  padding: 0 13px;
  .title {
    flex: 1;
    @include fja();
  }
  .handleClose {
    @include wh(16px, 16px);
    @include bg-image('../../../assets/img/mine/close');
  }
}

.data-box {
  background: #fff;
  max-height: 325px;
  padding: 0 13px;
  overflow-y: scroll;
  .val-item {
    font-size: 16px;
    height: 65px;
    @include fja(space-between);
    .content {
      @include fja();
      img {
        @include wh(20px, 20px)
      }
      .bank_name {
        padding-left: 15px;
      }
      .lastval {
        padding-left: 15px;
      }
    }
    .status {
      @include wh(14px, 14px);
      @include bg-image('../../../assets/img/mine/xuanzhong');
    }
  }
}
</style>
