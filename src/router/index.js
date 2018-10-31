import Vue from 'vue'
import Router from 'vue-router'
//测试页面
const test = () => import('../views/test/test.vue')
//路由懒加载  目前官网文档推荐的方法  需要用到 syntax-dynamic-import插件
const home = () => import('../views/home/home.vue')
//余额页面
const balance = () => import('../views/home/balance.vue')
//收支明细
const incomeList = () => import('../views/home/incomeList.vue')
//充值页面
const recharge = () => import('../views/home/recharge.vue')
//提现页面putForward
const putForward = () => import('../views/home/putForward.vue')
//收支详情 Income
const Income = () => import('../views/home/Income.vue')
//总资产
const totalAssets = () => import('../views/totalAssets/totalAssets.vue')
//我的
const mine = () => import('../views/mine/mine.vue')
//个人信息
const personalInfo = () => import('../views/personalInfo/personalInfo.vue')
//实名认证
const realName = () => import('../views/authentication/realName')
//手机号验证
const verifyPhoneNum = () => import('../views/authentication/verifyPhoneNum')
//理财
const financing = () => import('../views/financing/financing.vue')
//添加银行卡
const addBank = () => import('../views/bank/addBank.vue')
//支持银行
const supportBank = () => import('../views/bank/supportBank.vue')
//我的银行卡
const userBankCard = () => import('../views/userBankCard/userBankCard')
//充值 ，提现结果页面
const result = () => import('../views/bank/result.vue')
//充值 ，提现结果页面
const perfectBank = () => import('../views/bank/perfectBank.vue')
// 设置交易密码
const setPassword = () => import('../views/paymentSetting/children/setPassword')
// 设置交易密码 确认密码
const confirmPassword = () => import('../views/paymentSetting/children/confirmPassword')
//支付设置
const paymentSetting = () => import('../views/paymentSetting/paymentSetting')
//输入旧密码
const oldPassword = () => import('../views/paymentSetting/children/oldPassword')
//输入旧密码  我也不知道为什么有两个旧密码页面
const inputOldPassword = () => import('../views/paymentSetting/children/inputOldPassword')
//设置新交易密码页面
const setNewPassword = () => import('../views/paymentSetting/children/setNewPassword')
//忘记密码验证手机号
const forgetPasPhoneNum = () => import('../views/paymentSetting/children/forgetPasPhoneNum')
//忘记密码 验证身份 银行卡
const bandCardVerifcation = () => import('../views/paymentSetting/children/bandCardVerifcation')
//绑定手机号
const bindingPhone = () => import('../views/authentication/bindingPhone')
//完善身份信息
const perfectIdentity = () => import('../views/perfectIdentity/perfectIdentity')
//填写居住地址
const personalAddress = () => import('../views/perfectIdentity/children/personalAddress')
//填写公司名称
const corporateName = () => import('../views/perfectIdentity/children/corporateName')
//填写单位电话
const corporateTel = () => import('../views/perfectIdentity/children/corporateTel')
//开户权益
const openAccount = () => import('../views/agreement/openAccount')
//权益须知
const rights = () => import('../views/agreement/rights')
//银行认证
const certificationBank = () => import('../views/perfectIdentity/certificationBank')
//银行卡手机号认证
const bankVeifyPhone = () => import('../views/perfectIdentity/children/bankVeifyPhone')
//消息列表
const newsList = () => import('../views/news/newsList.vue')
//消息詳情
const newsDetail = () => import('../views/news/newsDetail.vue')

Router.prototype.goBack = function () {
  this.isBack = true
  this.back()
}
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/incomeList',
      name: 'incomeList',
      component: incomeList
    },

    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/putForward',
      name: 'putForward',
      component: putForward
    },
    {
      path: '/Income',
      name: 'Income',
      component: Income
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/financing',
      name: 'financing',
      component: financing
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: personalInfo
    },
    {
      path: '/totalAssets',
      name: 'totalAssets',
      component: totalAssets
    },
    {
      path: '/addBank',
      name: 'addBank',
      component: addBank
    },
    {
      path: '/supportBank',
      name: 'supportBank',
      component: supportBank
    },
    {
      path: '/realName',
      name: 'realName',
      component: realName
    }, {
      path: '/verifyPhoneNum',
      name: 'verifyPhoneNum',
      component: verifyPhoneNum
    },
    {
      path: '/result',
      name: 'result',
      component: result
    },
    {
      path: '/perfectBank',
      name: 'perfectBank',
      component: perfectBank
    }, {
      path: '/setPassword',
      name: 'setPassword',
      component: setPassword
    }, {
      path: '/confirmPassword/',
      name: 'confirmPassword',
      component: confirmPassword
    }, {
      path: '/inputOldPassword',
      name: 'inputOldPassword',
      component: inputOldPassword
    }, {
      path: '/setNewPassword',
      name: 'setNewPassword',
      component: setNewPassword
    }, {
      path: '/oldPassword',
      name: 'oldPassword',
      component: oldPassword
    }, {
      path: '/paymentSetting',
      name: 'paymentSetting',
      component: paymentSetting,
      children: [{
        path: 'bandCardVerifcation',
        name: 'bandCardVerifcation',
        component: bandCardVerifcation
      }, {
        path: 'forgetPasPhoneNum',
        name: 'forgetPasPhoneNum',
        component: forgetPasPhoneNum
      }]
    }, {
      path: '/bindingPhone',
      name: 'bindingPhone',
      component: bindingPhone
    }, {
      path: '/perfectIdentity',
      name: 'perfectIdentity',
      component: perfectIdentity,
      children: [{
        path: 'personalAddress',
        name: 'personalAddress',
        component: personalAddress
      }, {
        path: 'corporateName',
        name: 'corporateName',
        component: corporateName
      }, {
        path: 'corporateTel',
        name: 'corporateTel',
        component: corporateTel
      },]
    }, {
      path: '/bankVeifyPhone',
      name: 'bankVeifyPhone',
      component: bankVeifyPhone
    }, {
      path: '/openAccount',
      name: 'openAccount',
      component: openAccount
    }, {
      path: '/rights',
      name: 'interests',
      component: rights
    }, {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    }, {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    }, {
      path: '/userBankCard',
      name: 'userBankCard',
      component: userBankCard
    },
    {
      path: '/certificationBank',
      name: 'certificationBank',
      component: certificationBank
    },
  ]
})
export default router
