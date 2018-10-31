const IDCARD_REG = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
const PHONENUM_REG = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
const PHONE_ORG_TEL_REG = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/
const CHINESE_NAME = /^[\u4e00-\u9fa5]{2,}$/

export const idCard = (val) => IDCARD_REG.test(val)   //  身份证号判断
export const phoneNum = (val) => PHONENUM_REG.test(val)  //手机号判断
export const pnone_Org_tel = (val) => PHONE_ORG_TEL_REG.test(val) //手机号座机号同时判断
export const chinese_name = (val) => CHINESE_NAME.test(val) //中文名字判断
export const required = (val) => {
  if (val instanceof Array) {
    return val.length > 0
  }
  return val !== undefined && val !== null && (val + '').trim() !== ''
} // 是否为空
export const requiredObjProp = (val) => {
  if (typeof val === 'object') {
    for (let key of Object.keys(val)) {
      if (!required(val[key])) {
        return {isValid: false, key: key + '', rule: 'required'}
      }
    }
    return {isValid: true}
  } else throw 'param is not object'
}  //一个对象里面的所有属性是否为空

// js函数防抖
export const debouce = (func, delay, immediate = true) => {
  let timer = null
  return () => {
    const context = this
    const args = arguments
    if (timer) clearInterval(timer)
    // //立即执行
    if (immediate) {
      ////根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      const doNow = !timer
      ////每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (doNow) {
        func.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  }
}
// export const debouce = function (fun, delay) {
//   return function (args) {
//     let that = this
//     let _args = args
//     clearTimeout(fun.id)
//     fun.id = setTimeout(function () {
//       fun.call(that, _args)
//     }, delay)
//   }
// }

