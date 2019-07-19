const utils = require('./utils.js')
const feedback = require('./feedback.js')
const checkNetworkType = require('./check_network_type.js')
const getWxCode = require('./get_wx_code.js')
const handleData = require('./handle_data.js')
const routeSkip = require('./route_skip.js')
const caniuse = require('./caniuse.js')
const share = require('./share.js')
const updateMP = require('../utils/update_mp.js')
const auth = require('./auth.js')

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
    '01': 'shu',
    '02': 'niu',
    '03': 'hu',
    '04': 'tu',
    '05': 'long',
    '06': 'she',
    '07': 'ma',
    '08': 'yang',
    '09': 'hou',
    '10': 'ji',
    '11': 'gou',
    '12': 'zhu'
  }
  return ('' + pwd).match(/\d{2}/g).map(v => zodiac[v])
}

wx.limi.utils = {
  ...feedback,
  ...handleData,
  ...caniuse,
  ...utils,
  ...auth,
  share,
  routeSkip,
  checkNetworkType,
  getWxCode,
  updateMP
}