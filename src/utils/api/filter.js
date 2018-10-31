import Vue from 'vue'

//Moment:引入moment
import Moment from 'moment'
//姓名
Vue.filter('fullName', function(value) {
  return new Array(value.length).join('*') + value.substr(-1)
})

//时间
Vue.filter('convertDate', function(value) {
  return Moment(value).format('YYYY-MM-DD')
})
//手机号
Vue.filter('iphone', function(value) {
  const str2 = value.substr(0, 3) + ' **** ' + value.substr(7)
  return str2
})
//姓名
// Vue.filter('fullName',function(value){

//   return new Array(value.length).join('*') + value.substr(-1);
//  });
//银行卡号后四位
Vue.filter('bankCard', function(value) {
  if (!value) {
    return ''
  }
  const bankCard = value.substr(value.length - 4)
  return bankCard
})
//金额
Vue.filter('money', function(val) {
  val = val.toString().replace(/\$|\,/g, '')
  if (isNaN(val)) {
    val = '0'
  }
  let sign = val == (val = Math.abs(val))
  val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val =
      val.substring(0, val.length - (4 * i + 3)) +
      ',' +
      val.substring(val.length - (4 * i + 3))
  }

  return (sign ? '' : '-') + val + '.' + cents
})
/*
* 格式化金额
* 参数说明：
* number：要格式化的数字
* decimals：保留几位小数
* dec_point：小数点符号
* thousands_sep：千分位符号
* */
Vue.filter('abs', function(
  number,
  decimals = 2,
  dec_point = '.',
  thousands_sep = ','
) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
})
/*
* 价格保留两位小数
* */
Vue.filter('tofixed2', function(
  number,
  decimals = 2,
  dec_point = '.',
  thousands_sep = ','
) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
})