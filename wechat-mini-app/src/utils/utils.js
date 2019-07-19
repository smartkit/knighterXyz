const Lodash = require('../lib/lodash.min.js')
const Promise = require('../lib/promise.min.js')
const jsonpatch = require('../lib/jsonpatch.min.js')
const validator = require('../lib/validator.min.js')
// Can not support Object.entries()
const hasKeyObject = o => Object.prototype.toString.call(o) === '[object Object]' && Object.keys(o).length
const formatQuery = o => hasKeyObject(o) ? ('?' + Object.keys(o).map(v => v + '=' + o[v]).join('&')) : ''
const formatTel = tel => tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
const validCode = s => s.match(/^\d{4}$/) ? true : false
const validTel = s => s.match(/^1\d{10}$/) ? true : false
const validName = s => s.match(/^[\u4e00-\u9fa5]{2,4}$/) ? true : false
const trimAll = s => s.replace(/\s+/g, '')
const removeN = s => s.replace(/\\n/g, '')
const getPageStackNum = () => getCurrentPages() // 获取页面栈数
const formatZodiac = (pwd) => {
  const zodiac = {
    '01': '鼠',
    '02': '牛',
    '03': '虎',
    '04': '兔',
    '05': '龙',
    '06': '蛇',
    '07': '马',
    '08': '羊',
    '09': '猴',
    '10': '鸡',
    '11': '狗',
    '12': '猪'
  }
  return ('' + pwd).match(/\d{2}/g).map(v => zodiac[v])
}

module.exports = {
  // 三方
  Promise,
  debounce: Lodash.debounce,
  throttle: Lodash.throttle,
  hasKeyObject,
  formatQuery,
  formatTel,
  validCode,
  validTel,
  validName,
  trimAll,
  formatZodiac,
  removeN,
  getPageStackNum,
  jsonpatch,
  validator
}