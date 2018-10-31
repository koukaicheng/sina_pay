import { mapMutations } from 'vuex'
import {
  USER_INFO,
  USER_STATUS,
  USER_ASSRT,
  USER_BANKCARD_INFO,
  STEP_TOKEN
} from '../../store/mutations/mutations-types'
//更新用户的信息状态资产
export const UserMixins = {
  methods: {
    ...mapMutations([USER_INFO, USER_STATUS, USER_ASSRT, USER_BANKCARD_INFO, STEP_TOKEN]),
    // 获取用户资产及收益信息
    getUserAsset () {
      this.$api.userAsset().then(res => {
        this[USER_ASSRT](res.data)
      })
    },
    //用户信息
    async getUserInfo () {
      let json = await this.$api.userBaseInfo()
      this[USER_INFO](json.data)
    },
    //用户状态
    async getUserStatus () {
      let json = await this.$api.userStatus()
      this[USER_STATUS](json.data)
    },
    async getUserBankCard () {
      let json = await this.$api.userBankCardList()
      this[USER_BANKCARD_INFO](json.data)
      this.user_bankCard_num = json.data.number
    }
  }
}

//解决android定位fixed或者absolute随键盘弹起
export const adPosition = {
  data () {
    return {
      screenHeight: 0,
      initBodyHeight: 0
    }
  },
  mounted () {
    const _this = this
    this.initBodyHeight = document.body.clientHeight
    window.addEventListener('resize', () => {
      _this.screenHeight = document.body.clientHeight
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
  },
  watch: {
    screenHeight (newVal) {
      this.screenHeight = newVal
      let $parent = document.getElementsByClassName('router')[0]
      if (this.screenHeight < this.initBodyHeight) {
        $parent.style.transition = 'none'
        this.$refs.save.style.display = 'none'
      } else if (this.screenHeight === this.initBodyHeight) {
        this.$refs.save.style.display = ''
        $parent.style.transition = ''
      }
    }
  }
}
