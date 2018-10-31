<template>
  <div>
    <ts-header :title="type_name" back></ts-header>
    <page>
      <div class="wrap">
        <!-- :loadType="loadType" -->
        <pull-to :loadType="loadType">
          <div v-for="(item , index) in list" class="wrapper">
            <p class="title">
              <span>{{item.date_format}}</span>
            </p>
            <ul class="box">
              <li class="item">
                <div class="header">
                  <div class="head-icon">
                    <img v-if="item.icon == '1'" src="../../assets/img/news/1@3x.png" alt="">
                    <img v-if="item.icon == '2'" src="../../assets/img/news/2@3x.png" alt="">
                    <img v-if="item.icon == '3'" src="../../assets/img/news/3@3x.png" alt="">
                    <img v-if="item.icon == '4'" src="../../assets/img/news/4@3x.png" alt="">
                  </div>
                  <div class="head-title">
                    {{item.title}}
                  </div>
                </div>
                <div class="content border-1px">
                  {{item.content}}
                </div>
                <div class="info-content">
                  <p>查看详情</p>
                  <span class="right-icon"></span>
                </div>
              </li>
            </ul>
          </div>
        </pull-to>
      </div>
    </page>
  </div>
</template>
<script>
import PullTo from '../../components/module/pull-to/PullTo'

export default {
  name: 'newsDetail',
  data() {
    return {
      loadType: 'top',
      formData: {},
      type_name: '',
      list: [],
      BOTTOM_DEFAULT_CONFIG: {
        pullText: '上拉获取更多内容',
        triggerText: '释放获取更多内容',
        loadingText: ' ',
        doneText: '加载完成',
        failText: '加载失败',
        loadedStayTime: 1000,
        stayDistance: 50,
        triggerDistance: 70
      }
    }
  },
  created() {
    let types = this.$route.query.type
    let uid = this.$route.query.uid
    let type_name = this.$route.query.type_name
    console.log(types, uid)
    this.type_name = type_name
    this.formData = {
      type: types,
      uid
    }
    this.setRead()
    this.getMessageDetail()
  },
  mounted() {},
  methods: {
    /**
     * 刷新
     */
    refresh(loaded) {
      //   this.dataList = res.data.dataList
      setTimeout(() => {
        loaded('done')
      }, 2000)
    },
    /**
     * 获取详情
     */
    getMessageDetail() {
      this.$api.messageDetail(this.formData).then(res => {
        console.log(res)
        this.list = res.data
        // this.list = res.data
      })
    },
    /**
     * 获取详情
     */
    setRead() {
      this.$api.read(this.formData).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    PullTo
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.wrap {
  .wrapper {
    .title {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      span {
        padding: 4px 10px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
    }
    .box {
      .item {
        font-size: 14px;
        background: #fff;
        margin: 15px;
        margin-top: 20px;
        border-radius: 4px;
        padding: 15px;
        padding-bottom: 0;
        .header {
          display: flex;
          align-items: center;
          .head-icon {
            width: 18px;
            height: 18px;
            background: #f5f5f5;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .head-title {
            padding-left: 10px;
            font-size: 16px;
            color: #333;
          }
        }
        .content {
          padding: 15px 0;
          line-height: 1.8;
          color: #333;
        }
        .info-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // padding-top: 10px;
          height: 45px;
          font-size: 14px;
          color: #bdbdbd;
          .right-icon {
            margin-left: 5px;
            flex-shrink: 0;
            width: 10px;
            height: 14px;
            background: url('../../assets/img/shouye/icon/list/you.png')
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
