<template>
    <div>
        <ts-header title="结果详情"></ts-header>
        <page>
            <div class="wrap">
                <div class="content">
                    <div class="head-img">
                        <img src="../../assets/img/balance/icon/mingxi/success@3x.png" alt="">
                    </div>
                    <p class="title">成功充值100元</p>
                    <p>已存入你的余额</p>
                </div>
                <s-button @tap="next">完成</s-button>
            </div>
        </page>
    </div>
</template>

<script>
export default {
  name: 'addBack',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    next() {
      this.$router.go(-1)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 15px;
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    margin-bottom: 80px;
    font-size: 14px;
    color: #939393;
    .head-img {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      padding: 20px 0;
      padding-bottom: 10px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
