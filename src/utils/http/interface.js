import axios from './api'

const types = true

//三才接口
// 主页消息模块
export const messageHome = data => {
  return axios({
    url: '?r=wap/message-home',
    method: 'POST',
    data,
    types
  })
}

export const test = data => {
  return axios({
    url: '?r=main/config-list',
    method: 'POST',
    data,
    types
  })
}

//活动轮播图接口
export const wapBanner = params => {
  return axios({
    url: `?r=wap/banner`,
    method: 'GET',
    params,
    types
  })
}

//业务分类接口
export const wapClassiFication = params => {
  return axios({
    url: `?r=wap/classification`,
    method: 'GET',
    params,
    types
  })
}
//为你推荐模块
export const recommand = params => {
  return axios({
    url: '?r=wap/recommand',
    method: 'GET',
    params,
    types
  })
}
// 消息列表
export const messageList = data => {
  return axios({
    url: '?r=wap/message-list',
    method: 'POST',
    data,
    types
  })
}

// 消息详情
export const messageDetail = data => {
  return axios({
    url: '?r=wap/message-detail',
    method: 'POST',
    data,
    types
  })
}

// 点击消息置为已读
export const read = data => {
  return axios({
    url: '?r=wap/read',
    method: 'POST',
    data,
    types
  })
}
//精选基金
export const getChoiceFund = () => {
  return axios({
    url: '?r=wap/fund',
    method: 'POST',
    types
  })
}
//新浪接口

//获取用户基础信息
export const userBaseInfo = data => {
  return axios({
    url: `/api/user/baseInfo`,
    method: 'POST',
    data
  })
}
//获取用户状态
export const userStatus = data => {
  return axios({
    url: `/api/user/userStatus`,
    method: 'POST',
    data
  })
}
//获取用户资产及收益信息
export const userAsset = data => {
  return axios({
    url: `/api/user/asset`,
    method: 'POST',
    data
  })
}
//获取白条信息
export const useraWhiteBar = data => {
  return axios({
    url: `/api/user/whiteBar`,
    method: 'POST',
    data
  })
}

//获取用户交易银行卡列表
export const tradeBankCardList = data => {
  return axios({
    url: `/api/trade/bankList`,
    method: 'POST',
    data
  })
}

//识别银行卡
export const authBankIdentify = data => {
  return axios({
    url: `/api/auth/bankIdentify`,
    method: 'POST',
    data
  })
}
//获取支持的银行
export const authBankList = data => {
  return axios({
    url: `/api/auth/bankList`,
    method: 'POST',
    data
  })
}
/** 余额  */
//获取用户交易明细
export const tradeTradeList = data => {
  return axios({
    url: `/api/trade/tradeList`,
    method: 'POST',
    data
  })
}

//获取收支明细类别
export const tradeTradeTypes = data => {
  return axios({
    url: `/api/trade/tradeTypes`,
    method: 'POST',
    data
  })
}

//获取用户交易详情
export const tradeTradeDetail = data => {
  return axios({
    url: `/api/trade/tradeDetail`,
    method: 'POST',
    data
  })
}

//余额充值
export const tradeRecharge = data => {
  return axios({
    url: `/api/trade/recharge`,
    method: 'POST',
    data
  })
}

//获取银行卡列表
export const userBankCardList = data => {
  return axios({
    url: `/api/user/bankCardList`,
    method: 'POST',
    data
  })
}
//交易密码验证
export const userVerifyPayPwd = data => {
  return axios({
    url: `/api/user/verifyPayPwd`,
    method: 'POST',
    data
  })
}
//协议
export const getAgreement = () => {
  return axios({
    url: '/api/auth/getAgreement',
    method: 'POST'
  })
}

/*******实名认证*********/
//身份证认证
export const getBindIdcard = data => {
  return axios({
    url: '/api/auth/bindIdcard',
    method: 'POST',
    data
  })
}

//鉴权-绑手机-获取验证码
export const getBhoneSendVerify = (data) => {
  return axios({
    url: '/api/auth/phoneSendVerify',
    method: 'POST',
    data
  })
}
//鉴权-绑手机-绑定
export const getBindPhone = (data) => {
  return axios({
    url: '/api/auth/bindPhone',
    method: 'POST',
    data
  })
}
//鉴权-银行认证-发短信
export const getBankSendVerify = (data) => {
  return axios({
    url: '/api/auth/bankSendVerify',
    method: 'POST',
    data
  })
}
//鉴权-银行认证-验证短信
export const getBindBank = (data) => {
  return axios({
    url: '/api/auth/bindBank',
    method: 'POST',
    data
  })
}
//检查交易密码格式
export const setPayPwdCheck = (data) => {
  return axios({
    url: '/api/auth/payPwdFormatCheck',
    method: 'POST',
    data
  })
}
//鉴权-设置交易密码
export const setPayPwd = (data) => {
  return axios({
    url: '/api/auth/setPayPwd',
    method: 'POST',
    data
  })
}
//忘记密码发送验证码
export const getForgetPayPwdSend = (data) => {
  return axios({
    url: '/api/user/forgetPayPwdSend',
    method: 'POST',
    data
  })
}
//用户忘记支付密码验证码验证
export const getForgetPayPwdVerfiyCode = (data) => {
  return axios({
    url: '/api/user/forgetPayPwdVerfiyCode',
    method: 'POST',
    data
  })
}
//用户忘记支付密码验证用户实名信息
export const getForgetPayPwdVerifyUser = (data) => {
  return axios({
    url: '/api/user/forgetPayPwdVerifyUser',
    method: 'POST',
    data
  })
}
//用户修改交易密码验证旧交易密码
export const getVerifyOldPayPwd = (data) => {
  return axios({
    url: '/api/user/verifyOldPayPwd',
    method: 'POST',
    data
  })
}
/********完善信息**********/
//信息頁面詳情
export const getPersonInfo = params => {
  return axios({
    url: '?r=wap/person-info',
    method: 'GET',
    params,
    types
  })
}
//个人居住地址
export const getPersonInfoAddress = data => {
  return axios({
    url: '?r=wap/person-addr',
    method: 'POST',
    data,
    types
  })
}
//单位名称
export const getPersonCompany = data => {
  return axios({
    url: '?r=wap/company',
    method: 'POST',
    data,
    types
  })
}
//单位电话
export const getPersonCpmpanyTel = data => {
  return axios({
    url: '?r=wap/company-tel',
    method: 'POST',
    data,
    types
  })
}
//单位地址
export const getPersonCpmpanyAddr = data => {
  return axios({
    url: '?r=wap/company-addr',
    method: 'POST',
    data,
    types
  })
}
//月收入
export const getPersonIncome = data => {
  return axios({
    url: '?r=wap/salary-income',
    method: 'POST',
    data,
    types
  })
}
/*******基金*********/
//基金
export const productFundBaseInfo = data => {
  return axios({
    url: '/api/product/fundBaseInfo',
    method: 'POST',
    data
  })
}

export default {
  test,
  messageHome,
  wapBanner,
  wapClassiFication,
  recommand,
  userBaseInfo,
  userStatus,
  userAsset,
  useraWhiteBar,
  tradeBankCardList,
  tradeTradeList,
  tradeTradeTypes,
  userBankCardList,
  authBankList,
  tradeTradeDetail,
  tradeRecharge,
  userVerifyPayPwd,
  getAgreement,
  messageList,
  messageDetail,
  read,
  authBankIdentify,
  productFundBaseInfo,
  getBhoneSendVerify,
  getBindPhone,
  getBindIdcard,
  getBankSendVerify,
  getBindBank,
  setPayPwdCheck,
  setPayPwd,
  getPersonInfo,
  getPersonInfoAddress,
  getPersonCompany,
  getPersonCpmpanyTel,
  getPersonCpmpanyAddr,
  getPersonIncome,
  getForgetPayPwdSend,
  getForgetPayPwdVerfiyCode,
  getForgetPayPwdVerifyUser,
  getVerifyOldPayPwd,
  getChoiceFund
}
