<template>
  <div>
    <ts-header title="消息" back></ts-header>
    <page>
      <div class="wrap">
        <ul class="wrapper">
          <li class="" v-for="(item , index ) in list">
            <router-link class="item border-1px" :to="{name:'newsDetail',query:{type:item.type,uid:item.uid,type_name:item.type_name}}">
              <div class="header">
                <div class="icon-box">
                  <!-- <div :class="index===0?'icon-spot':'icon'">{{index===0?'':'1'}}</div> -->
                  <div v-if="item.count != '0'" :class="{'icon-spot': item.type == 4,'icon':item.type !=4}">
                    {{item.type==4?'':item.count}}
                  </div>
                </div>
                <img v-if="item.icon == '1'" src="../../assets/img/news/1@3x.png" alt="">
                <img v-if="item.icon == '2'" src="../../assets/img/news/2@3x.png" alt="">
                <img v-if="item.icon == '3'" src="../../assets/img/news/3@3x.png" alt="">
                <img v-if="item.icon == '4'" src="../../assets/img/news/4@3x.png" alt="">
              </div>
              <div class="content">
                <p class="title">{{item.type_name}}</p>
                <p class="sub-title">{{item.content}}</p>
              </div>
              <div class="oper-right">
                <p>{{item.date_format}}</p>
                <span class="right-icon"></span>
              </div>
            </router-link>

          </li>
        </ul>
      </div>
    </page>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'newsList',
  data() {
    return {
      list: [],
      userInfo: []
    }
  },
  created() {
    this.getMessageList()
    console.log(this.user_info)
  },
  mounted() {},
  methods: {
    /**
     * 获取消息列表
     */
    getMessageList() {
      // let userInfo = await this.getUserInfo()
      // this.userInfo = userInfo
      this.$api.messageList({ uid: this.user_info.s_uid }).then(res => {
        console.log(res.data)
        this.list = res.data
      })
    }
  },
  components: {},
  computed: {
    ...mapState(['user_info'])
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  .wrapper {
    background: #fff;
    margin-top: 15px;
    .item {
      display: flex;
      align-items: center;
      padding: 15px;
      padding-left: 0;
      margin-left: 15px;
      .header {
        position: relative;
        width: 40px;
        height: 40px;
        background: #f5f5f5;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
        .icon-box {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 2px;
          top: 2px;
          font-size: 12px;
          width: 1px;
          .icon {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 18px;
            height: 18px;
            border: 2px #fff solid;
            border-top-left-radius: 18px;
            border-bottom-left-radius: 18px;
            border-top-right-radius: 18px;
            border-bottom-right-radius: 18px;
            padding: 0 4px;
            background: #ff4940;
            color: #fff;
          }
          .icon-spot {
            position: absolute;
            width: 14px;
            height: 14px;
            border: 2px #fff solid;
            border-radius: 50%;
            background: #ff4940;
            color: #fff;
          }
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 16px;
        font-size: 16px;
        color: #333;
        width: 100%;
        height: 45px;
        overflow: hidden;
        .sub-title {
          font-size: 14px;
          color: #bdbdbd;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 15px;
        }
      }
      .oper-right {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        font-size: 14px;
        color: #bdbdbd;
        .right-icon {
          margin-left: 5px;
          flex-shrink: 0;
          width: 10px;
          height: 14px;
          background: url('../../assets/img/shouye/icon/list/you.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
