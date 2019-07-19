const { Promise } = require('../utils/utils.js')
const routeSkip = require('../utils/route_skip.js')
const { getGlobalData } = require('../utils/handle_data.js')

let ajax = (url, opt = {
  data: {}
}) => {
  let def = {
    url,
    data: {}
  }
  // Login api add version
  if(url.indexOf('api-sso.limixuexi.com') > -1) {
    opt.data.version = 'v2.0'
  }
  opt.header = {
    'content-type': 'application/x-www-form-urlencoded'
  }
  // 处理业务接口Header COOK
  let cookie = getGlobalData('cookie')
  if (cookie) {
    opt.header.COOK = cookie
  }
  let mergedOpt = Object.assign({}, def, opt)
  return new Promise((resolve, reject) => {
    let requestTask = wx.request({
      ...mergedOpt,
      success(res) {
        // 1: 成功
        // 0: 失败
        let r = res.data
        let result = {
          // Keep data is object
          data: r.data || {},
          desc: '',
          msg: ''
        }
        if (r.code === 1000) {
          result.code = 1
          result.msg = r.desc || ''
          result.desc = 'succ'
        } else {
          result.code = 0
          result.msg = r.desc || ''
          result.desc = 'fail',
          result.oldCode = r.code
        }
        resolve(result)
      },
      fail(err) {
        // Timeout
        // Server error
        // JS 语法错误不会被捕获
        // requestTask.abort()
        reject(err)
        routeSkip({
          name: 'load_fail'
        })
      }
    })
  })
    .catch(e => console.log('ajax error ==>', JSON.stringify(e, null, 4)))
}
module.exports = ajax