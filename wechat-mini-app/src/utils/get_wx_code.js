const {Promise} = require('./utils.js')
const routeSkip = require('./route_skip.js')

const getWxCode = (o = {}) => {
  const def = {
    timeout: 6000
  }
  Object.assign(o, def)
  return new Promise((resolve, reject) => {
    let r = {
      code: 0,
      data: '',
      msg: ''
    }
    wx.login({
      ...o,
      success(res) {
        r.data = res.code
        r.code = 1
        r.msg = res.errMsg || 'SUCC'
        resolve(r)
      },
      faile() {
        r.msg = 'FAIL'
        resolve(r)
      },
      complete(r) {
        let e = r.errMsg
        if (e !== 'login:ok') {
          routeSkip({
            name: 'load_fail'
          })
        }
      }
    })
  })
    .catch(
      e => console.log('getWxCode error', JSON.stringify(e, null, 4))
    )
}

module.exports = getWxCode