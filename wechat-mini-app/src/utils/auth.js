// @获取用户是否授权
// @1 授权
// @0 未授权
const checkAuth = (name = 'userInfo') => {
  let scope = 'scope.' + name
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting[scope]) {
          resolve(1)
        } else {
          resolve(0)
        }
      }
    })
  })
}

// @获取用户授权信息
// @code: 1 获取用户授权信息成功
// @code: 0 获取用户授权信息失败或未授权
const getAuthInfo = () => {
  let r = {
    code: 0,
    msg: 'Fail',
    data: {}
  }
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(res) {
        r.code = 1
        r.msg = 'Succ'
        r.data = res
        resolve(r)
      },
      fail() {
        r.data = e
        resolve(r)
      }
    })
  })
}

module.exports = {
  checkAuth,
  getAuthInfo
}