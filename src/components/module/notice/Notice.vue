<template>
  <div>
    <swiper v-if="message.length > 1" class="fund-sub" :options="swiperMessageOption" ref="mySwiper2">
      <swiper-slide class="fund-info-item" v-for="(item,index) in message" :key="index">
        <span class="fund-info-li-img">
          <img v-if="item.icon == 4" src="../../../assets/img/shouye/icon/gonggao/xitong.png">
          <img v-else src="../../../assets/img/shouye/icon/gonggao/zichan.png">
        </span>
        <div class="fund-content">
          <span class="fund-info-li-title">{{item.type_name}}</span>
          <span class="fund-info-li-time">{{ item.date}}</span>
        </div>
        <div v-if="right" class="right-btn">
          <span class="right-icon"></span>
        </div>
        <router-link v-else class="fund-info-li-duo" :to="{name:'newsList'}">
          <span>更多</span>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Notice',
  props: {
    right: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: [],
      swiperMessageOption: {
        direction: 'vertical',
        loop: true,
        allowTouchMove: false,
        // autoplayDisableOnInteraction: false,
        disableOnInteraction: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2000
        }
      }
    }
  },
  created() {
    this.getMessageHome()
  },
  methods: {
    /**
     * 主页消息模块
     */
    getMessageHome() {
      this.$api.messageHome({ uid: 1 }).then(res => {
        this.message = res.data
        // this.swiper.update()
      })
    },
    swiper() {
      return this.$refs.mySwiper2.swiper
    }
  },
  computed: {},
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.fund-sub {
  display: flex;
  align-items: center;
  background: #fffcf6;
  width: 100%;
  height: 45px;
  overflow: hidden;
  .fund-info-item {
    height: 45px;
    display: flex;
    align-items: center;
    .fund-info-li-img {
      display: flex;
      align-items: center;
      width: 20px;
      margin: 0 13px;
      margin-top: -2px;
      img {
        width: 100%;
      }
    }
    .fund-content {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 14px;
      color: #333;
      .fund-info-li-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .fund-info-li-time {
        flex-shrink: 0;
        padding: 0 5px;
        color: #939393;
      }
    }
    .fund-info-li-duo {
      position: relative;
      width: 55px;
      flex-shrink: 0;
      text-align: center;
      color: #c9bea6;
      font-size: 14px;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        top: 1px;
        bottom: 1px;
        background: #d9c9a6;
      }
    }
    .right-btn {
      padding: 0 15px;
      height: 100%;
      display: flex;
      align-items: center;
      .right-icon {
        margin-left: 5px;
        flex-shrink: 0;
        width: 10px;
        height: 14px;
        background: url('../../../assets/img/shouye/icon/list/you.png')
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
