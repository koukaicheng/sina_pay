<template>
  <div>
    <ts-header title="新浪金融"></ts-header>
    <page>
      <div class="x-assets">
        <div>

          <!--资产 -->
          <div class="x-top-wrap">

            <div class="x-assets-box">

              <div class="x-assets-box-top" @click="totalAssets">
                <div class="x-assets-box-title">
                  <span>总资产(元) </span>
                  <span class="look" :class="downIcon?'':'yincang'" @click.stop="sort"></span>
                  <!-- <img src="../../assets/img/shouye/icon/yan.png" v-show="downIcon">
              <img src="../../assets/img/shouye/icon/yin.png" v-show="!downIcon"> -->
                </div>
                <div class="x-assets-box-nubmer">
                  <span v-show="downIcon">{{user_asset.total | abs}}</span>
                  <span v-show="!downIcon">****</span>
                </div>

              </div>

              <div class="x-assets-box-info">

                <router-link class="info-button-group" :to="{name:'totalAssets'}">
                  <span class="">最新收益</span>
                  <span class="price" v-show="downIcon">+{{user_asset.income_lastday}}元</span>
                  <span class="price" v-show="!downIcon">****</span>
                </router-link>
                <router-link class="info-button-group" :to="{name:'balance'}">
                  <span class="">余额</span>
                  <span class="price" v-show="downIcon">{{user_asset.balance | abs}}元</span>
                  <span class="price" v-show="!downIcon">****</span>
                </router-link>
              </div>
            </div>

            <!-- 表条信息 v-show="!this.is_support"-->
            <WhiteStripes/>
          </div>

          <!--首页九宫格-->
          <div class="grid-group-wrap">
            <ul class="grid-9">
              <li class="grid-9-item" v-if="index < isMoreNum.num" v-for="(fication ,index) in classiFication">
                <div class="media-img ">
                  <div v-if="fication.is_point == 1" class="tag"></div>
                  <img class="" :src="fication.upload_pic">
                </div>
                <div class="media-body">{{fication.name}}</div>
              </li>
              <li v-if="classiFication.length > 7" class="grid-9-item" @click="moreFication">
                <div class="media-img more">
                  <img src="../../assets/img/shouye/icon/list/you.png"
                       :style="{transform: 'rotate('+isMoreNum.tran+'deg)'}">
                </div>
                <div class="media-body">{{isMoreNum.name}}</div>
              </li>
            </ul>

            <!--基金消息 -->
            <div class="fund-info">
              <Notice :message="message"></Notice>
            </div>
          </div>

          <!--活动推荐 -->
          <div class="x-activity ">
            <h1>活动推荐</h1>

            <!-- 轮播图 -->

            <div class="swiper-wrapper-box" :class="isLeftBanner?'':'lr'">

              <swiper v-if="bannerImg.length > 0" :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide class="swiper-box" :class="isLeftBanner?'leftWidth':''" v-for="(item,index) in bannerImg"
                              :key="index">
                  <div class="swiper-item-header">
                    <img :src="item.upload_pic" alt="">
                  </div>
                  <p class="title ellipsis-1">{{item.name}}</p>
                  <p class="subtitle ellipsis-1">{{item.precondition}}</p>
                </swiper-slide>

              </swiper>
            </div>

          </div>

          <!--生活服务 -->
          <div class="x-activity">
            <h1>生活服务</h1>
            <ul class="x-life">
              <li v-for="(item,index) in recommand" :key="index">
                <div class="x-life-head">
                  <img :src="item.upload_pic">
                </div>
                <div class="x-life-content">
                  <p>{{item.name}}</p>
                  <p class="subtitle">{{item.describle}}</p>
                </div>
              </li>

            </ul>
          </div>

          <!--<div class="x-periphery">-->
          <!--<span>财 富</span>-->
          <!--<span>&nbsp;&nbsp; · &nbsp;&nbsp; </span>-->
          <!--<span>娱 乐</span>-->
          <!--<span> &nbsp;&nbsp;· &nbsp;&nbsp;</span>-->
          <!--<span>生 活</span>-->
          <!--</div>-->
          <div class="footer-tip">
            财 富
            <span></span> 娱 乐
            <span></span> 生 活
          </div>
        </div>
      </div>

    </page>
    <ds-footer></ds-footer>
  </div>
</template>

<script>
import WhiteStripes from '../../components/module/white-stripes/WhiteStripes'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Notice from '../../components/module/notice/Notice'
import { mapState } from 'vuex'
import { UserMixins } from '../../utils/mixins'

export default {
  name: 'home',
  components: {
    WhiteStripes,
    swiper,
    swiperSlide,
    Notice
  },
  data () {
    return {
      // fundTime: 1469281964000,
      downIcon: true,
      //总资产
      total: '',
      //最新总收益
      income_lastday: '',
      //余额
      balance: '',
      btn: '', //按钮
      //banner
      bannerImg: [],
      //业务分类
      classiFication: [],
      // 生活服务
      recommand: [],
      // 信息
      message: [],

      isMoreNum: {
        num: 7,
        tran: 90,
        name: '更多'
      },
      swiperOption: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        autoplayDisableOnInteraction: false,
        autoplay: {
          delay: 3000
        }
      },
      isLeftBanner: true
    }
  },

  created () {
    this.ajaxInit()
  },
  mixins: [UserMixins],
  computed: {
    ...mapState(['user_asset']),
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {},
  methods: {
    moreFication () {
      if (this.isMoreNum.num === 7) {
        this.isMoreNum.num = this.isMoreNum = {
          num: this.classiFication.length,
          tran: 270,
          name: '收起'
        }
      } else {
        this.isMoreNum = {
          num: 7,
          tran: 90,
          name: '更多'
        }
      }
    },
    totalAssets () {
      this.$router.push('totalAssets')
    },
    sort () {
      this.downIcon = !this.downIcon
    },
    // 初始化接口数据
    ajaxInit () {
      this.getUserInfo()
      this.getUserAsset()
      this.getUserStatus()
      this.getWapBanner()
      this.getWapClassiFication()
      this.getRecommand()
    },

    /**
     * 获取活动推荐banner
     */
    getWapBanner () {
      this.$api.wapBanner().then(res => {
        if (res.data.length > 1) {
          this.swiperOption.slidesPerView = 1.5
          this.isLeftBanner = true
        } else {
          this.swiperOption.slidesPerView = 1
          this.isLeftBanner = false
        }
        this.bannerImg = res.data
      })
    },
    /**
     * 获取业务分类
     */
    getWapClassiFication () {
      this.$api.wapClassiFication().then(res => {
        this.classiFication = res.data
      })
    },
    /**
     * 为你推荐接口获取
     */
    getRecommand () {
      this.$api.recommand().then(res => {
        this.recommand = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

.scroll-wrapper {
  // background: #fff;
  font-size: 12px;
}

.x-assets {
  .x-top-wrap {
    background: #fff;
    padding-top: 12px;
    .x-assets-box {
      position: relative;
      margin: 0 13px;
      background: url('../../assets/img/shouye/top-bg@2x.png') no-repeat;
      background-size: 100% 100%;
      height: 150px;
      color: #fff;
      .x-assets-box-top {
        padding-left: 20px;
        padding-top: 20px;
        .x-assets-box-title {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
          .look {
            display: block;
            width: 15px;
            height: 15px;
            background: url('../../assets/img/shouye/icon/yan.png') no-repeat;
            background-size: 100%;
            background-position: 50% 50%;
            margin-left: 10px;
            &.yincang {
              background: url('../../assets/img/shouye/icon/yin.png') no-repeat;
              background-size: 100%;
              background-position: 50% 50%;
            }
          }
        }
        .x-assets-box-nubmer {
          margin-top: 8px;
          background: none;
          font-size: 30px;
          line-height: 1;
        }
      }
      .x-assets-box-info {
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;
        height: 54px;
        background: url('../../assets/img/shouye/bg-buttoin@2x.png') no-repeat;
        background-size: 100% 100%;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        .info-button-group {
          display: flex;
          align-items: center;
          padding-left: 20px;
          width: 100%;
          color: #fff;
          vertical-align: middle;
          line-height: 0;
          span {
            color: rgba(255, 255, 255, 0.6);
          }
          .price {
            font-size: 16px;
            font-weight: bold;
            margin-left: 5px;
            color: #fff;
          }
        }
      }
    }
  }

  .grid-group-wrap {
    margin-top: 10px;
    background: #fff;
    padding-bottom: 20px;
    .grid-9 {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
      transition: all 0.3s;
      .grid-9-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        flex-direction: column;
        width: 25%;
        .media-img {
          position: relative;
          width: 27px;
          height: 27px;
          &.more {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 27px;
            height: 27px;
            border-radius: 4px;
            border: 1px #eee solid;
            img {
              width: 10px;
              transform: rotate(90deg);
            }
          }
          .tag {
            position: absolute;
            right: 0;
            top: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: red;
            z-index: 10;
          }
          img {
            width: 100%;
          }
        }

        .media-body {
          margin-top: 5px;
          font-size: 14px;
          color: #333;
        }
      }
    }
    .fund-info {
      padding: 0 13px;
      margin-top: 25px;
    }
  }

  .x-activity {
    margin-top: 10px;
    background: #fff;
    h1 {
      font-size: 16px;
      color: #333;
      padding: 25px 0;
      padding-left: 13px;
    }
    .swiper-wrapper-box {
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 20px;
      &.lr {
        padding-left: 13px;
        padding-right: 13px;
      }
      .swiper-box {
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
        &.leftWidth {
          padding-left: 10px;
        }
        .swiper-item-header {
          height: 110px;
          width: 100%;
          overflow: hidden;
          border-radius: 4px;
          img {
            width: 100%;
          }
        }
        .title {
          margin-top: 15px;
        }
        .subtitle {
          margin-top: 7px;
          font-size: 14px;
          color: #bdbdbd;
          line-height: 1;
        }
      }
    }

    .x-life {
      display: flex;
      flex-wrap: wrap;
      padding: 0px 13px;
      li {
        display: flex;
        width: 50%;
        margin-bottom: 25px;
        .x-life-head {
          width: 45px;
          height: 45px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .x-life-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 10px;
          font-size: 16px;
          color: #333;
          .subtitle {
            font-size: 12px;
            color: #bdbdbd;
          }
        }
      }
    }
  }

  .footer-tip {
    @include fja();
    width: 100%;
    text-align: center;
    bottom: 20px;
    font-size: 12px;
    color: #bdbdbd;
    height: 52px;
    span {
      display: inline-block;
      @include wh(4px, 4px);
      background: #bdbdbd;
      margin: 0 10px;
      transform: rotate(-315deg);
    }
  }
}
</style>
