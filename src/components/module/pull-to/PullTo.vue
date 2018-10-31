<template>
  <div class="wrap">
    <pull-to :top-load-method="toprefresh" :top-config="TOP_DEFAULT_CONFIG" :bottom-load-method="refresh" :bottom-config="BOTTOM_DEFAULT_CONFIG" :is-top-bounce="loadType==='top'" :is-bottom-bounce="loadType==='bottom'">
      <template v-if="loadType ==='top'" slot="top-block" slot-scope="props">
        <div class="top-load-wrapper">
          <div v-if=" props.state !=='loaded-done'" class="icon" :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }">
          </div>
          {{props.stateText}}
        </div>
      </template>
      <slot />
      <template v-if="loadType ==='bottom'" slot="bottom-block" slot-scope="props">
        <div class="bottom-load-wrapper">
          <div v-if=" props.state !=='loaded-done'" class="icon" :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }">
          </div>
          {{props.stateText}}
        </div>
      </template>
    </pull-to>

  </div>

</template>

<script>
import PullTo from 'vue-pull-to'
export default {
  name: 'BalanceList',
  props: {
    loadType: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      // 下拉
      TOP_DEFAULT_CONFIG: {
        pullText: '下拉刷新', // 下拉时显示的文字
        triggerText: '释放更新', // 下拉到触发距离时显示的文字
        loadingText: '', // 加载中的文字
        doneText: '', // 加载完成的文字
        failText: '加载失败', // 加载失败的文字
        loadedStayTime: 50, // 加载完后停留的时间ms
        stayDistance: 50, // 触发刷新后停留的距离
        triggerDistance: 70 // 下拉刷新触发的距离
      },
      // 上拉
      BOTTOM_DEFAULT_CONFIG: {
        pullText: '上拉获取更多内容',
        triggerText: '释放获取更多内容',
        loadingText: ' ',
        doneText: '',
        failText: '加载失败',
        loadedStayTime: 50,
        stayDistance: 50,
        triggerDistance: 70
      },
      iconLink: ''
    }
  },
  methods: {
    toprefresh(loaded) {
      console.log(1111)
      setTimeout(() => {
        loaded('done')
      }, 2000)
    },
    refresh(loaded) {
      setTimeout(() => {
        loaded('done')
      }, 2000)
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    }
  },
  components: {
    PullTo
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  overflow: hidden;
}
.bottom-load-wrapper,
.top-load-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  color: #bdbdbd;
  .icon {
    width: 6px;
    height: 15px;
    margin: 0 10px;
    background: url('../../../assets/img/balance/up.png') no-repeat;
    background-size: 100% 100%;
    img {
      width: 100%;
    }
    &.icon-loading {
      height: 25px;
      width: 25px;
      background: url('../../../assets/img/balance/icon/loading.png') no-repeat;
      background-size: 100% 100%;
      transform: rotate(0deg);
      animation-name: loading;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }
}

.top-load-wrapper {
  .icon {
    transform: rotate(-180deg);
  }
  .icon-arrow {
    transition: 0.2s;
    transform: rotate(0deg);
  }
}
.bottom-load-wrapper {
  .icon-arrow {
    transition: 0.2s;
    transform: rotate(180deg);
  }
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
